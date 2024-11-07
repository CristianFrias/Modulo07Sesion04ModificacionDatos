const { listarActores, registrarActores, modificarActores, eliminarActores } = require("./database/actor.js");
const { createServer } = require("http");
const url = require("url")

createServer(async (requerimiento, respuesta) => {
    const method = requerimiento.method;
    const urlParsed = url.parse(requerimiento.url, true)
    const pathName =  urlParsed.pathname

    // console.log({method, urlParsed});
    respuesta.setHeader("Content-Type", "application/json"); // LO DEJAMOS AQUI PARA QUE TODAS LAS PETICIONES RESPONDAN CON JSON

    if (pathName == "/actor") {

        // LISTADO DE ACTORES
        if (method == "GET") {
            const actores = await listarActores();
            respuesta.end(JSON.stringify({message: "Listado de actores", data: actores}))
        }
        
        // REGISTRO DE ACTORES
        if (method == "POST") {
            let body = ""; // STRING VACIO, TODA LA INFO QUE VIAJA A TRAVES DEL PROTOCOLO HTTP VIAJA COMO CARACTERES 
            requerimiento.on("data", (chunk) => {
                body += chunk.toString();
            });
            requerimiento.on("end", async () => {
                body = JSON.parse(body);             
                const actor = await registrarActores(body);
                respuesta.end(JSON.stringify({message: "Actor Registrado exitosamente", data: actor}))
            });
        }

        // EDICIÓN DE ACTORES
        if (method == "PUT") {
            let body = "";
            const id = Number(urlParsed.query.id) // AQUI OBTENEMOS EL ID QUE ESTÁ ENTRANDO POR LA URL
            requerimiento.on("data", (chunk) => {
                body += chunk.toString();
            });
            requerimiento.on("end", async () => {
                body = JSON.parse(body);
                const actor = await modificarActores(body, id)
                respuesta.end(JSON.stringify({message: "Actor Modificado exitosamente", data: actor}))
            });
        }

        // ELIMINACIÓN DE ACTORES; PARA LA ELIMINACION SE RECOMIENDA BORRAR POR LOS PARAMETROS DE LA URL
        if (method == "DELETE") {
            const id = Number(urlParsed.query.id);
            const actor = await eliminarActores(id);
            respuesta.end(JSON.stringify({message: "Actor Eliminado exitosamente", data: actor}))
        }
    }


    


}).listen(3_000, () => console.log("Aplicación en Ejecución por el puerto 3.000"))