const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS and JSON body parser middleware
app.use(cors());
app.use(express.json());

// Serve static frontend assets from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Secure Proxy Endpoint for Google Gemini API
app.post('/api/gemini', async (req, res) => {
    try {
        const { prompt, systemInstruction } = req.body;
        
        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required in the request body" });
        }
        
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error("GEMINI_API_KEY is not defined in the server environment variables.");
            return res.status(500).json({ error: "Server configuration error: API Key missing" });
        }
        
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`;
        
        const payload = {
            contents: [
                {
                    parts: [
                        {
                            text: prompt
                        }
                    ]
                }
            ]
        };
        
        // Add system instructions if present
        if (systemInstruction) {
            payload.systemInstruction = {
                parts: [
                    {
                        text: systemInstruction
                    }
                ]
            };
        }
        
        // Call Google Gemini API using native fetch (Node 18+)
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            const errorDetails = await response.text();
            console.error(`Gemini API error status: ${response.status}. Details:`, errorDetails);
            return res.status(response.status).json({ 
                error: `Gemini API returned error: ${response.statusText}`,
                details: errorDetails 
            });
        }
        
        const data = await response.json();
        res.json(data);
        
    } catch (error) {
        console.error("Proxy endpoint caught an error:", error);
        res.status(500).json({ error: "Internal Server Error during proxy request", message: error.message });
    }
});

// Start the server
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
