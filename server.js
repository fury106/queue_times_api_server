// Importeer de benodigde modules
const express = require('express');
const fetch = require('node-fetch'); // Zorg ervoor dat node-fetch is geïnstalleerd

// Maak een Express-app
const app = express();
const PORT = process.env.PORT || 3000; // Gebruik de poort die Render biedt of standaard 3000

// Endpoint om API-gegevens op te halen
app.get('/api/wachttijden', async (req, res) => {
    const apiUrl = 'https://queue-times.com/parks/6/queue_times.json';

    try {
        // Haal gegevens op van de externe API
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Probleem bij het ophalen van de data');
        }

        // Parse de API-respons naar JSON
        const data = await response.json();
        
        // Stuur de gegevens door naar de frontend
        res.json(data);
    } catch (error) {
        console.error('Fout bij het ophalen van de API:', error.message);

        // Stuur een foutmelding naar de frontend
        res.status(500).json({
            error: 'Er is een probleem opgetreden bij het ophalen van de wachttijden.',
        });
    }
});

// Start de server
app.listen(PORT, () => {
    console.log(`Server draait op http://localhost:${PORT}`);
});