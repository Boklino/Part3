const express = require("express");
const cors = require("cors");
const app = express();
const Person = require("./models/person");
require("dotenv").config();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());
app.use(express.static("build"));

app.get("/api/persons", (request, response) => {
  Person.find({}).then((person) => {
    response.json(person);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(203).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    response.status(400).json({
      error: "name or number is missing",
    });
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${length} people </p> <p>  ${Date()} </p>`
  );
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
