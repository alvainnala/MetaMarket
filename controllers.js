const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // This replaces body-parser for parsing JSON

const users = new Map();
const items = []; 

function generateAccessToken(username) {
  return jwt.sign({ username }, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }
  if (users.has(username)) {
    return res.status(400).send('User already exists');
  }
  users.set(username, password); 
  res.send('User registered successfully');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (users.get(username) === password) {
    const token = generateAccessToken(username);
    res.json({ accessToken: token });
  } else {
    res.send('Username or password incorrect');
  }
});

app.post('/items', authenticateToken, (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).send('Item name and description are required');
  }
  const item = { name, description }; 
  items.push(item);
  res.send('Item added successfully');
});

app.get('/items', (req, res) => {
  res.json(items);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));