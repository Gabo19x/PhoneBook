const express = require("express");
const app = express();
const {DB} = require("./data base/DB.js");

app.use(express.json());

/* FUNCION GET 
    Se muestra todos los contactos disponibles
*/
app.get("/api/persons", (req, res) => {
    console.log("GET personas");
    res.status(200).json(DB);
});

/* FUNCION POST
    Crea un nuevo contacto con lo enviado en un JSON
*/
app.post("/api/persons", (req, res) => {
    let nuevo = req.body;

    if(nuevo.name != null || nuevo.number != null) {

        let validar = true;

        DB.forEach(obj => {
            console.log(`${obj.name} =? ${nuevo.name}`);
            
            if(obj.name === nuevo.name) {
                validar = false;
                res.status(400).send("Ya existe ese contacto!");
            }
        });

        if(validar) {
            const id = DB.length > 0 ? Math.max(...DB.map(obj => obj.id)) + 1 : 1;

            const obj = {
                id: id,
                name: nuevo.name,
                number: nuevo.number,
            };

            DB.push(obj);
            console.log(`Se creo ${nuevo.name} con ID: ${id}`);
            
            res.status(204);
        }
        
    } else {
        res.status(400).send("No se pudo crear el contacto");
    }
});

/* FUNCION GET 
    Se muestra segun el id enviado, el contacto correspondiente
*/
app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id;

    if(id >= 0) {
        const persona = DB.find(obj => obj.id == id);
        res.status(200).send(persona);
    } else {
        res.status(404).send("No existe esa persona");
    }
    
});

/* FUNCION DELETE
    Borra un contacto segun el id
*/
app.delete("/api/persons/:id", (req, res) => {
    const id = req.params.id;

    if(id >= 0) {
        const indice = DB.findIndex(obj => obj.id == id);
        DB.splice(indice, 1);
        console.log(`Se borro ${DB[indice].name}`);
        res.status(204);
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

const PORT = 9000;
app.listen(PORT, () => {
    console.log(`Servidor activo por express en http://localhost:${PORT}`);
});