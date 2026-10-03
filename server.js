const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let payments = {};
let vouchers = {};

app.get('/', (req,res)=>{
  res.send('Adonis WiFi Backend is Running');
});

app.post('/pay', (req,res)=>{
  const { phone, amount, method, plan } = req.body;
  const ref = 'AD-' + Date.now();
  const voucher = 'AD-' + Math.floor(1000 + Math.random()*9000);

  payments[ref] = { phone, amount, method, plan, status: 'pending', voucher };

  // In real app, call MTN/Airtel API here

  setTimeout(()=>{
    payments[ref].status = 'paid';
    vouchers[voucher] = { phone, plan, amount, active: true };
  }, 8000);

  res.json({ ref, message: 'Payment request sent' });
});

app.get('/check/:ref', (req,res)=>{
  const p = payments[req.params.ref];
  if(!p) return res.json({ status: 'not found' });
  if(p.status === 'paid'){
    return res.json({ status: 'paid', voucher: p.voucher });
  }
  res.json({ status: 'pending' });
});

app.post('/validate', (req,res)=>{
  const { code } = req.body;
  if(vouchers[code] && vouchers[code].active){
    return res.json({ valid: true, plan: vouchers[code].plan });
  }
  res.json({ valid: false });
});

app.get('/admin/stats', (req,res)=>{
  let total = Object.keys(payments).length;
  let paid = Object.values(payments).filter(x=>x.status==='paid').length;
  res.json({ total, paid, vouchers: Object.keys(vouchers).length, payments });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log('Server on '+PORT));
