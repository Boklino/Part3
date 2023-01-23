const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}
const password = process.argv[2];
const url = `mongodb+srv://Boklino:${password}@cluster0.lobimkn.mongodb.net/?retryWrites=true&w=majority`;
mongoose.set("strictQuery", false);
mongoose.connect(url);
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Perosn", personSchema);
const person = new Person({
  name: "Bokl",
  number: "04252456",
});

console.log(process.argv.length);
person.save().then((result) => {
  if (process.argv.length > 4) {
    console.log(`added ${person.name} number ${person.number} to phonebook`);
    mongoose.connection.close();
  } else if (process.argv.length === 3) {
    Person.find({}).then((result) => {
      console.log("phonebook: ");
      result.forEach((person) => {
        console.log(person.name, person.number);
      });
      mongoose.connection.close();
    });
  }
});
