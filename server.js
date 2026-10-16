const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const SECRET = 'ganti-password-acak-123';
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.send(`<form method="POST" action="/login" style="max-width:350px;margin:100px auto;font-family:sans-serif"><h2>🔐 Magic Link Login</h2><input type="email" name="email" placeholder="email@gmail.com" required style="width:100%;padding:10px;margin:10px 0"><button style="width:100%;padding:10px;background:black;color:white">Kirim Link</button></form>`);
});
app.post('/login', (req, res) => {
  const token = jwt.sign({ email: req.body.email }, SECRET, { expiresIn: '15m' });
  const link = `https://${req.get('host')}/verify?token=${token}`;
  res.send(`<div style="max-width:400px;margin:50px auto;font-family:sans-serif"><h3>Link untuk ${req.body.email}:</h3><a href="${link}">${link}</a><br><br><a href="/">Kembali</a></div>`);
});
app.get('/verify', (req, res) => {
  try {
    const data = jwt.verify(req.query.token, SECRET);
    res.send(`<h1 style="font-family:sans-serif;text-align:center;margin-top:100px">✅ Login Berhasil: ${data.email}</h1>`);
  } catch (e) {
    res.send(`<h1>❌ Expired: ${e.message}</h1><a href="/">Coba lagi</a>`);
  }
});
app.listen(PORT, () => console.log('WEB JALAN'));
