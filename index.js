const { listarActores, registrarActores, modificarActores, eliminarActores } = require("./database/actor.js");
const { createServer } = require("http");
const url = require("url")

createServer((requerimiento, respuesta) => {
    const method = requerimiento.method;
    const urlParsed = url.parse(requerimiento.url, true)

    respuesta.setHeader("Content-Type", "application/json");
    respuesta.end(JSON.stringify({message: "Respuesta Petición"}));

}).listen(3_000, () => console.log("Aplicación en Ejecución por el puerto 3.000"))