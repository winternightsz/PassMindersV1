"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql2");
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '12345',
    database: 'passMinders'
});
connection.connect(function (err) {
    if (err) {
        console.error('Erro ao conectar no banco de dados: ', err);
        return;
    }
    console.log('Conexão com o banco de dados estabelecida!');
});
connection.end();
