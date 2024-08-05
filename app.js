const express = require('express');
require('dotenv').config();
const axios = require('axios');
const NodeCache = require('node-cache');

const app = express();
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

app.use(express.json());

app.get('/external-api-data', async (req, res) => {
    const CACHE_KEY = 'externalData';
    const cachedData = myCache.get(CACHE_KEY);

    if (cachedData) {
        console.log('Returning cached data');
        res.json(cachedData);
    } else {
        try {
            const EXTERNAL_API_URL = 'https://api.externalwebsite.com/data';
            const response = await axios.get(EXTERNAL_API_URL);

            myCache.set(CACHE_KEY, response.data);
            console.log('Cache miss - Fetching new data');
            res.json(response.data);
        } catch (error) {
            console.error('Error fetching external API data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});