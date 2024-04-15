const { Client } = require('pg');

async function getConnection(){

  const cliente = new Client({
    host: 'localhost',
    port: 5432,
    user: 'carapoia',
    password: 'L@Trinid@d2006',
    database: 'my_store'
  });

  await cliente.connect()

  return cliente;
}

module.exports = getConnection;
