const express = require('express');
require('dotenv').config();
const app = express();
app.use(express.json());

let items = [];
let users = [];

app.use((req, res, next) => {
    console.log(`${req.method} request to '${req.url}'`);
    next();
});

const PORT = process.env.PORT || 3000;

app.get('/items', (req, res) => {
    res.status(200).json({ message: 'Items fetched successfully', items });
});

app.post('/items', (req, res) => {
    const item = req.body;
    items.push(item);
    res.status(201).send({ message: 'Item added successfully', item });
});

app.get('/users', (req, res) => {
    res.status(200).json({ message: 'Users fetched successfully', users });
});

app.post('/users', (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).send({ message: 'User created successfully', user });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});