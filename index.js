const express = require("express");
const app = express();
const {DB} = require("./data base/DB.js");

app.get("/api/persons", (req, res) => {
    console.log("GET personas");
    res.status(200).json(DB);
});

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