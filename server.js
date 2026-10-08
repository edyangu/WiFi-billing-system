const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// In-memory store for payments
// ref -> { phone, amount, plan, method, status, voucher }
const payments = {};

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

// Create voucher (kept from your original)
app.post('/api/create-voucher', (req, res) => {
  const { phone, package, amount } = req.body;
  const voucher = Math.random().toString(36).substring(2, 8).toUpperCase();
  console.log(`New Payment: ${phone} - ${package} - ${amount} - Voucher: ${voucher}`);
  res.json({ success: true, voucher: voucher, message: 'Payment received' });
});

// Pay endpoint (frontend calls this)
app.post('/pay', (req, res) => {
  const { phone, amount, method, plan } = req.body;

  if (!phone || !amount) {
    return res.status(400).json({ message: 'Phone and amount required' });
  }

  // Generate a unique reference
  const ref = 'REF' + Date.now() + Math.floor(Math.random() * 1000);

  // Generate a voucher code
  const voucher = 'AD-' + Math.random().toString(36).substring(2, 6).toUpperCase();

  // Store it as "pending" first
  payments[ref] = {
    ref,
    phone,
    amount,
    method,
    plan,
    voucher,
    status: 'pending',
    createdAt: Date.now()
  };

  console.log(`PAY: ${ref} | ${phone} | ${plan} | ${amount} | ${method}`);

  // Respond immediately so frontend starts polling /check/:ref
  res.json({ ref, message: 'Payment initiated. Check your phone for PIN prompt.' });

  // SIMULATE payment confirmation after 6 seconds (replace with real MoMo API later)
  setTimeout(() => {
    if (payments[ref]) {
      payments[ref].status = 'paid';
      console.log(`PAID: ${ref} | Voucher: ${voucher}`);
    }
  }, 6000);
});

// Check payment status (frontend polls this)
app.get('/check/:ref', (req, res) => {
  const { ref } = req.params;
  const payment = payments[ref];

  if (!payment) {
    return res.status(404).json({ status: 'not_found', message: 'Unknown reference' });
  }

  console.log(`CHECK: ${ref} -> ${payment.status}`);

  if (payment.status === 'paid') {
    res.json({ status: 'paid', voucher: payment.voucher });
  } else {
    res.json({ status: 'pending' });
  }
});

// Wildcard fallback (MUST be last, and MUST NOT catch /pay or /check)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
