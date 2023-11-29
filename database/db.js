const mysql = require("mysql");
const conection = mysql.createConnection({
    host: process.envDB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

conection.connect((error) =>{

    if (error) {
        console.error("Error al conectar a la base de datos:" +error);
      }
        console.log("Conexión exitosa a la base de datos");
      
    });

module.exports = conection;