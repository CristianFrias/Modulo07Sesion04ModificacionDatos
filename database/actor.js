const { Pool } = require("pg")

const conexionPool = new Pool({
    user: 'postgres',
    password: 'postgres',
    port: 5432,
    database: 'dvdrental',
    host: 'localhost'
})

const listarActores = async () => {
    const resultado = await conexionPool.query("SELECT * FROM actor") // CON QUERY HACEMOS LA CONSULTA
    return resultado.rows
}

const registrarActores = async (data) => {
    const resultado = await conexionPool.query(
        "INSERT INTO actor(first_name, last_name, last_update) VALUES($1, $2, now()) RETURNING *", // CON RETURNING DEVUELVE EL REGISTRO Y EL VALOR EN TABLA
        [data.first_name, data.last_name]
    )
    return resultado.rows
}

const modificarActores = async (data, id) => {
    const argumentos = {
        text: "UPDATE actor SET first_name=$1, last_name=$2, last_update=now() WHERE actor_id=$3 RETURNING *",
        values: [data.first_name, data.last_name, id]
    };
    const resultado = await conexionPool.query(argumentos);
    return resultado.rows
}

const eliminarActores = async (id) => {
    const resultado = await conexionPool.query("DELETE FROM actor WHERE actor_id=$1 RETURNING *", [id]);
    return resultado.rows
}

// EXPORTAMOS LOS OBJETOS 
module.exports = { listarActores, registrarActores, modificarActores, eliminarActores } 