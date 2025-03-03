const mongoose = require('mongoose');
const password = require("./clave.js");

const Note = require("./models/note.js");

// if (process.argv.length<3) {
//   console.log('give password as argument')
//   process.exit(1)
// }

const url = `mongodb+srv://geo:${password}@cluster8000.aranb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster8000`;
mongoose.set('strictQuery',false);

// Conectarse a la DB de mongo
mongoose.connect(url)
.then(() => { console.log("Conexion a la DB");
})
.catch((err) => { console.error(`ERROR: ${err}`);
});

// Obtener todo lo de la DB
// Note.find({}).then((res) => {
//   console.log(res);
//   mongoose.connection.close();
// }).catch((err) => { console.error("No se obtuvo nada"); });

// se crea un instancia del modelo, y siguiendo las reglas
// const note = new Note({
//   content: 'Nuevo comienzo',
//   important: true,
// })

// // Guardamos la instancia en la base de datos
// note.save().then(result => {
//   console.log(`Nota guardada: ${result}`)
//   mongoose.connection.close(); // Terminar conexion
// }).catch((err) => { console.error(`ERROR al guardar: ${err}`) });