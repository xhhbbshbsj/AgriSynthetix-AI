const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ROUTE: Connect to AI Engine
app.post('/api/get-prediction', async (req, res) => {
    try {
        const { lat, lon } = req.body;
        // Sending data to Python FastAPI (running on port 8000)
        const response = await axios.post('http://127.0.0.1:8000/predict', { lat, lon });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "AI Engine Unreachable", details: error.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`MERN Server running on port ${PORT}`));