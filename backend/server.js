const express = require('express');
const mysql = require('mysql2'); // Use mysql2 for modern features and better compatibility
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',              // Replace with your MySQL username
  password: '1234', // Replace with your MySQL password
  database: 'my_database'  // Replace with your MySQL database name
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1); // Exit process if connection fails
  }
  console.log('Connected to MySQL');
});

// Routes
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

// Use port 8081 or another port of your choice
const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



