const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

// Endpoint om API-gegevens op te halen
app.get('/api/wachttijden', async (req, res) => {
    const apiUrl = 'https://queue-times.com/parks/6/queue_times.json';

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Probleem bij het ophalen van de data');
        }
        const data = await response.json();
        res.json(data); // Stuur de gegevens door naar de frontend
    } catch (error) {
        console.error('Fout bij het ophalen van de API:', error);
        res.status(500).json({ error: 'Er is een probleem opgetreden bij het ophalen van de wachttijden.' });
    }
});

// Start de server
app.listen(PORT, () => {
    console.log(`Server draait op http://localhost:${PORT}`);
});