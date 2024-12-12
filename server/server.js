const mysql = require('mysql2');
const express = require('express');

const app = express();
const port = 3000;
app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});

// Middleware per gestire il body delle richieste
app.use(express.json());
const connection = mysql.createConnection({
  host: '34.154.24.141',
  user: 'root',
  password: '',
  database: 'APP_CARTE',
  port: 3306,
});


connection.connect(err => {
  if (err) {
    console.error('Errore di connessione al database:', err);
    return;
  }
  console.log('Connesso al database MySQL!');
});


connection.query('select * from APP_CARTE.EXERCISE;', (err, results) => {
    if (err) throw err;
    console.log('lista esercizi:', results);
  });
  connection.query('select * from APP_CARTE.EXERCISE_DIFFICULTY;', (err, results) => {
    if (err) throw err;
    console.log('lista tipologia difficoltà:', results);
  });
  connection.query('select * from APP_CARTE.EXERCISE_CATEGORY;', (err, results) => {
    if (err) throw err;
    console.log('lista categorie esercizi:', results);
  });
  
  //http://localhost:3000/livelloEsercizi

  app.get('/livelloEsercizi', (req, res) => {
    const query = 'select * from APP_CARTE.EXERCISE_DIFFICULTY';
    connection.query(query, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Errore durante il recupero dei dati');
        return;
      }
      console.log(res.json(results));
    });
  });


