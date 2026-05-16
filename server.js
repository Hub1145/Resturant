const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'foodiecious-jwt-secret-2024-change-in-production';

app.use(bodyParser.json());
app.use(cookieParser());

const ADMIN_FILE = path.join(__dirname, 'data/admin.json');
const RESTAURANT_FILE = path.join(__dirname, 'data/restaurant.json');
const RESERVATIONS_FILE = path.join(__dirname, 'data/reservations.json');

function readJSON(file) {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function writeJSON(file, data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// Hash plaintext password on first start
async function initAdmin() {
    const admin = readJSON(ADMIN_FILE);
    if (!admin.password.startsWith('$2b$') && !admin.password.startsWith('$2a$')) {
        admin.password = await bcrypt.hash(admin.password, 10);
        writeJSON(ADMIN_FILE, admin);
        console.log('Admin password hashed successfully.');
    }
}
initAdmin().catch(console.error);

function requireAdmin(req, res, next) {
    const token = req.cookies.adminToken;
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    try {
        jwt.verify(token, JWT_SECRET);
        next();
    } catch {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
}

// Static assets
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Public pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/menu', (req, res) => res.sendFile(path.join(__dirname, 'menu.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'about.html')));
app.get('/reservations', (req, res) => res.sendFile(path.join(__dirname, 'reservations.html')));

// Admin pages
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'admin/login.html')));
app.get('/admin/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'admin/dashboard.html')));
app.use('/admin', express.static(path.join(__dirname, 'admin')));

// ─── Public APIs ────────────────────────────────────────────────────────────

app.get('/api/restaurant-data', (req, res) => {
    res.json(readJSON(RESTAURANT_FILE));
});

app.get('/api/menu', (req, res) => {
    const data = readJSON(RESTAURANT_FILE);
    res.json(data.menu.map((item, index) => ({ ...item, id: index })));
});

app.post('/api/reservations', (req, res) => {
    const { name, email, date, time, guests, notes } = req.body;
    if (!name || !email || !date || !time || !guests) {
        return res.status(400).json({ error: 'Name, email, date, time and guests are required.' });
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
        return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    const data = readJSON(RESERVATIONS_FILE);
    const reservation = {
        id: Date.now().toString(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        date,
        time,
        guests,
        notes: (notes || '').trim(),
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    data.reservations.push(reservation);
    writeJSON(RESERVATIONS_FILE, data);
    res.json({ success: true, reservation });
});

// ─── Admin Auth APIs ─────────────────────────────────────────────────────────

app.post('/api/admin/login', async (req, res) => {
    const { username, password } = req.body;
    const admin = readJSON(ADMIN_FILE);

    if (username !== admin.username) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '24h' });
    res.cookie('adminToken', token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000
    });
    res.json({ success: true });
});

app.post('/api/admin/logout', (req, res) => {
    res.clearCookie('adminToken');
    res.json({ success: true });
});

app.get('/api/admin/check', requireAdmin, (req, res) => {
    res.json({ ok: true });
});

app.post('/api/admin/update-password', requireAdmin, async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: 'Both passwords are required.' });
    }
    if (newPassword.length < 6) {
        return res.status(400).json({ error: 'New password must be at least 6 characters.' });
    }

    const admin = readJSON(ADMIN_FILE);
    const valid = await bcrypt.compare(currentPassword, admin.password);
    if (!valid) {
        return res.status(401).json({ error: 'Current password is incorrect.' });
    }

    admin.password = await bcrypt.hash(newPassword, 10);
    writeJSON(ADMIN_FILE, admin);
    res.json({ success: true });
});

// ─── Protected Admin APIs ────────────────────────────────────────────────────

app.get('/api/admin/stats', requireAdmin, (req, res) => {
    const restaurant = readJSON(RESTAURANT_FILE);
    const reservationsData = readJSON(RESERVATIONS_FILE);
    const all = reservationsData.reservations;
    res.json({
        menuItems: restaurant.menu.length,
        totalReservations: all.length,
        pendingReservations: all.filter(r => r.status === 'pending').length,
        confirmedReservations: all.filter(r => r.status === 'confirmed').length,
        cancelledReservations: all.filter(r => r.status === 'cancelled').length
    });
});

app.get('/api/admin/reservations', requireAdmin, (req, res) => {
    const data = readJSON(RESERVATIONS_FILE);
    res.json(data.reservations.slice().reverse());
});

app.put('/api/admin/reservations/:id', requireAdmin, (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const allowed = ['pending', 'confirmed', 'cancelled'];
    if (!allowed.includes(status)) {
        return res.status(400).json({ error: 'Invalid status.' });
    }

    const data = readJSON(RESERVATIONS_FILE);
    const reservation = data.reservations.find(r => r.id === id);
    if (!reservation) return res.status(404).json({ error: 'Reservation not found.' });

    reservation.status = status;
    writeJSON(RESERVATIONS_FILE, data);
    res.json({ success: true, reservation });
});

app.delete('/api/admin/reservations/:id', requireAdmin, (req, res) => {
    const { id } = req.params;
    const data = readJSON(RESERVATIONS_FILE);
    const idx = data.reservations.findIndex(r => r.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Reservation not found.' });
    data.reservations.splice(idx, 1);
    writeJSON(RESERVATIONS_FILE, data);
    res.json({ success: true });
});

app.post('/api/menu', requireAdmin, (req, res) => {
    const { name, price, description, category, image, dietary } = req.body;
    if (!name || !price) return res.status(400).json({ error: 'Name and price are required.' });

    const data = readJSON(RESTAURANT_FILE);
    const newItem = {
        name: name.trim(),
        price: price.trim(),
        description: (description || '').trim(),
        category: category || 'Main Course',
        image: image || '',
        dietary: Array.isArray(dietary) ? dietary : []
    };
    data.menu.push(newItem);
    writeJSON(RESTAURANT_FILE, data);
    res.json({ success: true, item: newItem, id: data.menu.length - 1 });
});

app.put('/api/menu/:index', requireAdmin, (req, res) => {
    const index = parseInt(req.params.index);
    const data = readJSON(RESTAURANT_FILE);
    if (isNaN(index) || index < 0 || index >= data.menu.length) {
        return res.status(404).json({ error: 'Menu item not found.' });
    }
    data.menu[index] = { ...data.menu[index], ...req.body };
    writeJSON(RESTAURANT_FILE, data);
    res.json({ success: true, item: data.menu[index] });
});

app.delete('/api/menu/:index', requireAdmin, (req, res) => {
    const index = parseInt(req.params.index);
    const data = readJSON(RESTAURANT_FILE);
    if (isNaN(index) || index < 0 || index >= data.menu.length) {
        return res.status(404).json({ error: 'Menu item not found.' });
    }
    data.menu.splice(index, 1);
    writeJSON(RESTAURANT_FILE, data);
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Foodiecious running at http://localhost:${PORT}`);
});
