
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Main WiFi page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Admin page
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/admin.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// API test
app.get('/api', (req, res) => {
  res.json({ status: 'Adonis WiFi Backend is Live!' });
});

// Create voucher
app.post('/api/create-voucher', (req, res) => {
  const { phone, package, amount } = req.body;
  const voucher = Math.random().toString(36).substring(2, 8).toUpperCase();
  console.log(`New Payment: ${phone} - ${package} - ${amount} - Voucher: ${voucher}`);
  res.json({ success: true, voucher: voucher, message: 'Payment received' });
});

// For any other route, show index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
