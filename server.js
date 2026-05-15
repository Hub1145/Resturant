const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Admin Route
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin/login.html'));
});

// Serve assets and UI from root, but specifically exclude data/ and node_modules/ for security/clarity
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/admin', express.static(path.join(__dirname, 'admin')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Serve index.html at root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Admin Login API
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    const adminData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/admin.json'), 'utf8'));

    if (username === adminData.username && password === adminData.password) {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Update Password API
app.post('/api/admin/update-password', (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const adminFilePath = path.join(__dirname, 'data/admin.json');
    const adminData = JSON.parse(fs.readFileSync(adminFilePath, 'utf8'));

    if (currentPassword === adminData.password) {
        adminData.password = newPassword;
        fs.writeFileSync(adminFilePath, JSON.stringify(adminData, null, 2));
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false, message: 'Unauthorized' });
    }
});

// Get Restaurant Data API
app.get('/api/restaurant-data', (req, res) => {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/restaurant.json'), 'utf8'));
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
