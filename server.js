// Importeer de benodigde modules
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors'); // Voor CORS-ondersteuning

const app = express();
const PORT = process.env.PORT || 3000;

// Gebruik CORS
app.use(cors({
    origin: 'https://fury106.github.io', // Sta verzoeken toe van jouw frontend
}));

// Dynamisch endpoint voor wachttijden van meerdere parken
app.get('/api/wachttijden/:parkId', async (req, res) => {
    const { parkId } = req.params; // Haal het park-id op uit de URL
    const apiUrl = `https://queue-times.com/parks/${parkId}/queue_times.json`; // Dynamisch API-pad

    try {
        // Haal gegevens op van de externe API
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Probleem bij het ophalen van de data');
        }

        // Parse de gegevens naar JSON
        const data = await response.json();
        res.json(data); // Stuur de gegevens door naar de frontend
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