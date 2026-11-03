require("dotenv").config();
const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host: process.envDB_HOST || "localhost",
    port: Number(process.envDB_PORT) || 3306,
    user: process.envDB_USER || "root",
    password: process.envDB_PASSWORD || "senai2026",
    database: process.envDB_NAME || "gamehub_db",
});

module.exports = conexao;