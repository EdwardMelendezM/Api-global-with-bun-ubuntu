import sqlite3 from 'sqlite3'

const db = new sqlite3.Database('unsaac_sqlite.db', (err: any) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.message);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});