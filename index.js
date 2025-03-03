const express = require("express");
const app = express();
const {DB} = require("./data base/DB.js");
const cors = require('cors')
const mongoose = require('mongoose');

require("./mongo.js");

const Person = require("./models/person.js");
const notFound = require("./middleware/notFound.js");
const handleErrors = require("./middleware/handleErrors.js");

app.use(cors())
app.use(express.json());
app.use(express.static('dist'));

/* FUNCION GET 
    Se muestra todos los contactos disponibles
*/
app.get("/api/persons", (req, res) => {
    console.log("GET personas");
    Person.find({})
        .then((persons) => { res.status(200).json(persons) })
        .catch((err) => { console.log(err); res.status(404).end("No hay objetos") });
});

/* FUNCION POST
    Verifica que el JSON enviado tenga valores.

    Entonces, se crea el nuevo contacto.
*/
app.post("/api/persons", (req, res, next) => {
    let nuevo = req.body;

    if(nuevo.name != null || nuevo.number != null) {

        let validar = true;

        if(validar) {
            const persona = new Person({
                name: nuevo.name,
                number: nuevo.number,
            })

            persona.save()
                .then((personaGuardar) => { 
                    console.log(`Se creo ${nuevo.name}`);
                    res.status(204).json(personaGuardar);
                })
                .catch((err) => { next(err) })
            
        }
        
    } else {
        res.status(400).send("No se pudo crear el contacto");
    }
});

/* FUNCION PUT 
    Se obtiene la info
    Y se actualiza
*/
app.put("/api/persons/:id", (req, rest, next) => {
    const id = req.params.id
    let datos = req.body

    const nuevaPersona = {
        name: datos.name,
        number: datos.number
    }

    Person.findByIdAndUpdate(id, nuevaPersona)
        .then(() => {
            console.log(`Se actualizo ${nuevaPersona.name}`);
            res.status(202).json(nuevaPersona);
        })
        .catch((err) => { next(err) })
})

/* FUNCION GET 
    Se muestra segun el id enviado, el contacto correspondiente
*/
app.get("/api/persons/:id", (req, res, next) => {
    const id = req.params.id;

    if(id != null) {
        // const persona = DB.find(obj => obj.id == id);
        
        Person.findById(id)
            .then((persona) => { console.log(`Se encontro ${id}`); res.status(200).json(persona); })
            .catch((err) => { next(err) })
    } else {
        res.status(404).send("No existe esa persona");
    }
    
});

/* FUNCION DELETE
    Borra un contacto segun el id
*/
app.delete("/api/persons/:id", (req, res, next) => {
    const id = req.params.id;

    if(id != null) {
        Person.findByIdAndDelete(id)
            .then(() => {
                console.log("Se elimino");
                res.status(204).end(`Se elimino ${id}`);
            })
            .catch((err) => { next(err) })
        
    } else {
        res.status(404).send("No existe esa persona");
    }
});

/* FUNCION GET 
    Se muestra la cantidad de contactos y la fecha del momento
*/
app.get("/info", (req, res) => {
    const tamaño = DB.length;

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>PHONE BOOK</title>
        </head>
        <body>
            <p>This PHONEBOOK has ${tamaño} people</p>
            <p>${new Date().toDateString()} ${new Date().toTimeString()}</p>
        </body>
        </html>
    `);
});

// MIDDLEWARE
app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Servidor activo por express en http://localhost:${PORT}`);
});