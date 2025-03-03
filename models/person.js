const mongoose = require('mongoose');

// Un Schema: define los tipos de datos que llevara
// El ejemplo tiene un content, y un important
const personSchema = new mongoose.Schema({
  id: String,
  name: String,
  number: String,
});

/* Definir el toJson
    Eliminamos las propiedades por default como _id y __v
    Y creamos la propiedad id
*/
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// Un modelo: crea una "clase" la cual usa un nombre (en singular), y una serie de reglas: el schema
const Person = mongoose.model('Person', personSchema);

module.exports = Person;