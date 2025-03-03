const mongoose = require('mongoose');

// Un Schema: define los tipos de datos que llevara
// El ejemplo tiene un content, y un important
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

// Un modelo: crea una "clase" la cual usa un nombre (en singular), y una serie de reglas: el schema
const Note = mongoose.model('Note', noteSchema);

module.exports = Note;