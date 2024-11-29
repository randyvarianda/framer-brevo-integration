const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Endpoint to receive form submissions
app.post('/submit', async (req, res) => {
    const email = req.body.email;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        // Add the email to Brevo
        const response = await axios.post(
            'https://api.brevo.com/v3/contacts',
            { email },
            {
                headers: {
                    'api-key': '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', // Replace with your actual Brevo API key
                    'Content-Type': 'application/json',
                },
            }
        );

        res.status(200).json({ message: 'Email added successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add email to Brevo' });
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
