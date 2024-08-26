const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const expressJsonMiddleware = express.json();

const app = express();
const SERVER_PORT = process.env.PORT || 5000;

app.use(expressJsonMiddleware); // Using express built-in middleware for parsing JSON

const registeredUsers = new Map();
const marketItems = [];

function createJwtTokenForUser(username) {
  return jwt.sign({ username }, process.env.JWT_SECRET_KEY, { expiresIn: '1800s' });
}

function jwtAuthenticationMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decodedUser) => {
    if (error) return res.sendStatus(403);
    req.user = decodedUser;
    next();
  });
}

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Username and password are required.');
  }
  if (registeredUsers.has(username)) {
    return res.status(400).send('User already exists.');
  }
  registeredUsers.set(username, password);
  res.send('User registered successfully.');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (registeredUsers.get(username) === password) {
    const accessToken = createJwtTokenForUser(username);
    res.json({ accessToken });
  } else {
    res.send('Username or password incorrect.');
  }
});

app.post('/items', jwtAuthenticationMiddleware, (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).send('Item name and description are required.');
  }
  const newItem = { name, description };
  marketItems.push(newItem);
  res.send('Item added successfully.');
});

app.get('/items', (req, res) => {
  res.json(marketItems);
});

app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`));