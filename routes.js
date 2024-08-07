const express = require('express');
require('dotenv').config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
app.get('/items', (req, res) => {
    res.status(200).send('Items fetched successfully');
});
app.post('/items', (req, res) => {
    res.status(201).send('Item added successfully');
});
app.get('/users', (req, res) => {
    res.status(200).send('Users fetched successfully');
});
app.post('/users', (req, res) => {
    res.status(201).send('User created successfully');
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});