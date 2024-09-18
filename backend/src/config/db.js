const { Pool } = require('pg');

// Verifique se a variável de ambiente DATABASE_URL está configurada
if (process.env.DATABASE_URL) {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false, // Isso pode ser necessário para conexões seguras
    },
  });

  pool.connect()
    .then(() => console.log('Conectado ao PostgreSQL'))
    .catch((err) => console.error('Erro ao conectar ao PostgreSQL', err));

  module.exports = pool;
} else {
  console.log('DATABASE_URL não configurado. O PostgreSQL não será conectado.');
  module.exports = null; // Exporte nulo ou um objeto vazio para evitar falhas
}
