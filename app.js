const express = require('express');
require('dotenv').config();
const axios = require('axios');
const NodeCache = require('node-cache');
const app = express();

const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

app.use(express.json());

app.get('/external-api-data', async (req, res) => {
    const cacheKey = 'externalData';
    const cachedData = myCache.get(cacheKey);

    if (cachedData) {
        console.log('Returning cached data');
        return res.json(cachedData);
    } else {
        try {
            const response = await axios.get('https://api.externalwebsite.com/data');
            myCache.set(cacheKey, response.data);
            console.log('Cache miss - Fetching new data');
            return res.json(response.data);
        } catch (error) {
            console.error('Error fetching external API data:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});