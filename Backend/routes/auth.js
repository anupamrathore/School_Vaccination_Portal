const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router(); // ✅ Define router before use

const USERS = [
  { username: 'admin', password: 'admin123' },
  { username: 'coordinator', password: 'coord123' }
];

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  console.log('Received login:', username, password);
  console.log('Valid users:', USERS);

  const user = USERS.find(u => u.username === username && u.password === password);

  if (!user) {
    console.log('User not found or password mismatch');
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username: user.username }, 'your_secret_key', { expiresIn: '1h' });
  console.log('Token generated for:', user.username);
  res.json({ token });
});

module.exports = router;
