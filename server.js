const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors'); // Importeer het cors-pakket

const app = express();
const PORT = process.env.PORT || 3000;

// Gebruik CORS en sta verzoeken toe van je frontend
app.use(cors({
    origin: 'https://fury106.github.io', // Specificeer de toegestane origin
}));

// Endpoint om API-gegevens op te halen
app.get('/api/wachttijden', async (req, res) => {
    const apiUrl = 'https://queue-times.com/parks/6/queue_times.json';

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Probleem bij het ophalen van de data');
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Fout bij het ophalen van de API:', error.message);
        res.status(500).json({
            error: 'Er is een probleem opgetreden bij het ophalen van de wachttijden.',
        });
    }
});

// Start de server
app.listen(PORT, () => {
    console.log(`Server draait op http://localhost:${PORT}`);
});