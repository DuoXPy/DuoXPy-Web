const express = require('express');
const crypto = require('crypto');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || 'https://xgpqblsrnbaopcmqlsud.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhncHFibHNybmJhb3BjbXFsc3VkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxNzc1NDMsImV4cCI6MjA2MDc1MzU0M30.K5X5-bxZ6-cSkQB7rxmkSgBzIwfjI7dwoaOTN0U9niE';
const supabase = createClient(supabaseUrl, supabaseKey);

// Generate a unique license key
function generateLicenseKey() {
  return 'DXP-' + crypto.randomBytes(16).toString('hex').toUpperCase();
}



const getHtml = (key) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DuoXPyMax Key</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #1a73e8;
            --primary-dark: #1557b0;
            --surface: #ffffff;
            --background: #f8f9fa;
            --on-surface: #1f1f1f;
            --elevation-1: 0 2px 4px rgba(0,0,0,0.08);
            --elevation-2: 0 4px 8px rgba(0,0,0,0.12);
            --elevation-3: 0 8px 16px rgba(0,0,0,0.16);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Roboto', sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(45deg, #0d47a1, #1565c0, #1976d2, #2196f3, #42a5f5);
            background-size: 400% 400%;
            animation: gradient 15s ease infinite;
            color: var(--on-surface);
        }

        @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        .container {
            text-align: center;
            padding: 2.5rem;
            border-radius: 28px;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            box-shadow: var(--elevation-1);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            max-width: 90%;
            width: 400px;
        }

        .container:hover {
            box-shadow: var(--elevation-3);
            transform: translateY(-5px);
        }

        .key {
            font-size: 2rem;
            font-weight: 500;
            background: linear-gradient(135deg, var(--primary) 0%, #6200ee 100%);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            margin-bottom: 2rem;
            letter-spacing: 0.5px;
        }

        .button {
            background: linear-gradient(135deg, var(--primary) 0%, #6200ee 100%);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 16px;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            margin: 8px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            text-decoration: none;
            display: inline-block;
            position: relative;
            overflow: hidden;
        }

        .button::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%);
            opacity: 0;
            transition: opacity 0.3s;
        }

        .button:hover {
            transform: scale(1.05);
            box-shadow: var(--elevation-2);
        }

        .button:hover::after {
            opacity: 1;
        }

        .button:active {
            transform: scale(0.95);
        }

        .social-links {
            margin-top: 2rem;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 1rem;
        }

        .footer {
            margin-top: 2.5rem;
            font-size: 0.9rem;
            font-weight: 400;
            opacity: 0.8;
            background: linear-gradient(135deg, #1f1f1f 0%, #666 100%);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }

        @keyframes ripple {
            0% { transform: scale(0); opacity: 0.5; }
            100% { transform: scale(2); opacity: 0; }
        }

        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }

        @media (max-width: 480px) {
            .container {
                padding: 1.5rem;
                width: 95%;
            }
            .key {
                font-size: 1.5rem;
            }
            .button {
                padding: 10px 20px;
                font-size: 0.9rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="key">${key}</h1>
        <button class="button" id="copyButton">Copy Key</button>
        <div class="social-links">
            <a href="https://discord.gg/KBzNXRZRdz" class="button">Join Discord</a>
            <a href="https://github.com/gorouflex/DuoXPyMax" class="button">GitHub</a>
        </div>
        <div class="footer">
            Made with ❤️ by GorouFlex, smh and NotchApple1703
        </div>
    </div>
    <script>
        const copyButton = document.getElementById('copyButton');

        copyButton.addEventListener('click', function() {
            const textArea = document.createElement('textarea');
            textArea.value = "${key}";
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);

            copyButton.textContent = 'Copied!';
            setTimeout(() => copyButton.textContent = 'Copy Key', 2000);
        });

        document.querySelectorAll('.button').forEach(button => {
            button.addEventListener('click', (e) => {
                if (!button.id || button.id !== 'copyButton') {
                    const ripple = document.createElement('span');
                    ripple.classList.add('ripple');
                    button.appendChild(ripple);

                    const rect = button.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    ripple.style.left = x + 'px';
                    ripple.style.top = y + 'px';

                    setTimeout(() => ripple.remove(), 600);
                }
            });
        });
    </script>
</body>
</html>
`;

const getLinkHtml = (link) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DuoXPyMax Link</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
    <style>
        ${getHtml("").split("<style>")[1].split("</style>")[0]}
    </style>
</head>
<body>
    <div class="container">
        <h1 class="key">${link}</h1>
        <a href="${link}" class="button">Go to Link</a>
        <div class="social-links">
            <a href="https://discord.gg/KBzNXRZRdz" class="button">Join Discord</a>
            <a href="https://github.com/gorouflex/DuoXPyMax" class="button">GitHub</a>
        </div>
        <div class="footer">
            Made with ❤️ by GorouFlex,smh and NotchApple1703
        </div>
    </div>
    <script>
        document.querySelectorAll('.button').forEach(button => {
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                button.appendChild(ripple);

                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';

                setTimeout(() => ripple.remove(), 600);
            });
        });
    </script>
</body>
</html>
`;

app.get('/get-link', (req, res) => {
    const link = req.query.link;
    res.send(getLinkHtml(link));
});

app.get('/get-key', (req, res) => {
    const demoKey = req.query.key;
    res.send(getHtml(demoKey));
});

// API endpoint to generate a license key and send email
app.post('/generate-key', async (req, res) => {
    try {
        const { email, orderId } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        // Generate a unique license key
        const key = generateLicenseKey();

        // Store the key in Supabase
        const { error } = await supabase
            .from('license_keys')
            .insert([
                {
                    email,
                    key,
                    order_id: orderId || null,
                    used: false
                }
            ]);

        if (error) {
            console.error('Supabase error:', error);
            return res.status(500).json({ error: 'Failed to store license key' });
        }

        // No email sending needed

        // Return the key to the client
        res.json({ key });
    } catch (error) {
        console.error('Error generating key:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API endpoint to create a pending key for manual payment
app.post('/create-pending-key', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        // Generate a pending ID
        const pendingId = crypto.randomBytes(8).toString('hex');

        // Store the pending request in Supabase
        const { error } = await supabase
            .from('pending_payments')
            .insert([
                {
                    email,
                    pending_id: pendingId,
                    created_at: new Date().toISOString()
                }
            ]);

        if (error) {
            console.error('Supabase error:', error);
            return res.status(500).json({ error: 'Failed to create pending payment' });
        }

        // Return the pending ID to the client
        res.json({ pendingId });
    } catch (error) {
        console.error('Error creating pending payment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API endpoint to confirm a manual payment
app.post('/confirm-payment', async (req, res) => {
    try {
        const { pendingId, email } = req.body;

        if (!pendingId || !email) {
            return res.status(400).json({ error: 'Pending ID and email are required' });
        }

        // Check if the pending payment exists
        const { data: pendingData, error: pendingError } = await supabase
            .from('pending_payments')
            .select('*')
            .eq('pending_id', pendingId)
            .eq('email', email)
            .single();

        if (pendingError || !pendingData) {
            return res.status(404).json({ error: 'Pending payment not found' });
        }

        // Generate a license key
        const key = generateLicenseKey();

        // Store the key in Supabase
        const { error } = await supabase
            .from('license_keys')
            .insert([
                {
                    email,
                    key,
                    order_id: `manual-${pendingId}`,
                    used: false
                }
            ]);

        if (error) {
            console.error('Supabase error:', error);
            return res.status(500).json({ error: 'Failed to store license key' });
        }

        // Delete the pending payment
        await supabase
            .from('pending_payments')
            .delete()
            .eq('pending_id', pendingId);

        // No email sending needed

        // Return the key to the client
        res.json({ key });
    } catch (error) {
        console.error('Error confirming payment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = app;
