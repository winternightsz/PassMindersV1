// tsc server.ts 
// node server.ts

import * as mysql from 'mysql2';

const connection = mysql.createConnection ({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '12345',
    database: 'passMinders'
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar no banco de dados: ', err);
        return;
    }
    console.log('Conexão com o banco de dados estabelecida!');
});

connection.end();