const express = require('express');
const mysql = require('mysql2'); 
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); 

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',   
  password: '1234', 
  database: 'my_database'  
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL');
});

app.get('/api/transactions', (req, res) => {
  const sql = 'SELECT * FROM transactions';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error retrieving transactions: ' + err.message });
    }
    res.json(results);
  });
});

app.post('/api/transactions', (req, res) => {
  const { date, cause, description, amount, budget } = req.body;

  if (!date || !cause || !description || amount === undefined || budget === undefined) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const sql = 'INSERT INTO transactions (date, cause, description, amount, budget) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [date, cause, description, amount, budget], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error inserting transaction: ' + err.message });
    }
    res.status(201).json({ id: results.insertId, date, cause, description, amount, budget });
  });
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



