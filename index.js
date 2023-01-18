const { json } = require("express");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

morgan.token("content", function (req, res) {
  return JSON.stringify({ name: req.body.name, number: req.body.number });
});
app.use(morgan(":method :url :response-time :content"));

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(persons.map((p) => p.id)) : 0;
  return maxId + 1;
};

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(203).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  const find = () => {
    return persons.find((p) => {
      if (p.name === body.name) {
        return true;
      }
    });
  };
  if (!body.name || !body.number) {
    response.status(400).json({
      error: "name or number is missing",
    });
  } else if (!find()) {
    const person = {
      id: Math.floor(Math.random() * 1000),
      name: body.name,
      number: body.number,
    };
    persons = persons.concat(person);
    response.json(person);
  } else {
    response.status(400).json({
      error: "name must be unique",
    });
  }
});

const length = persons.length;
app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${length} people </p> <p>  ${Date()} </p>`
  );
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
