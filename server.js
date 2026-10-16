const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const SECRET = 'ganti-password-acak-123';
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <h2>Login Vinza</h2>
    <form method="POST" action="/login">
      <input name="email" placeholder="email kamu" required style="padding:10px;width:300px" />
      <button type="submit">Login</button>
    </form>
  `);
});

app.post('/login', (req, res) => {
  const token = jwt.sign({ email: req.body.email }, SECRET, { expiresIn: '1h' });
  const host = req.get('host');
  const link = `https://${host}/verify?token=${token}`;
  console.log(`LOGIN BARU: ${req.body.email} -> ${link}`);
  res.send(`<div style="max-width:400px;margin:50px auto;"><h3>Link kamu:</h3><a href="${link}">${link}</a><p>Berlaku 1 jam</p></div>`);
});

app.get('/verify', (req, res) => {
  try {
    const data = jwt.verify(req.query.token, SECRET);
    res.send(`<h1 style="font-family:sans-serif;text-align:center">✅ Berhasil! Email: ${data.email}</h1>`);
  } catch (e) {
    res.send(`<h1>❌ Expired: ${e.message}</h1><a href="/">Balik</a>`);
  }
});

app.listen(PORT, () => console.log(`WEB JALAN di port ${PORT}`));
