const express = require("express");
const app = express();
const {DB} = require("./data base/DB.js");

app.get("/", (req, res) => {
    res.send("Hello!!!");
});

app.get("/api/persons", (req, res) => {
    console.log("GET personas");
    res.status(200).json(DB);
});

const PORT = 9000;
app.listen(PORT, () => {
    console.log(`Servidor activo por express en http://localhost:${PORT}`);
});