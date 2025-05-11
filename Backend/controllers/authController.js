const jwt = require('jsonwebtoken');

// Hardcoded credentials for now
const hardcodedUsername = 'admin';
const hardcodedPassword = 'admin123';

const login = (req, res) => {
  const { username, password } = req.body;

  console.log('Received credentials:', { username, password });

  // Check if the credentials match the hardcoded ones
  if (username === hardcodedUsername && password === hardcodedPassword) {
    // Create JWT Token
    const token = jwt.sign({ id: 'admin' }, 'your_jwt_secret', { expiresIn: '1h' });
    return res.json({ token });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
};

module.exports = { login };
