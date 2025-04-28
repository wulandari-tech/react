const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const usersPath = path.join(__dirname, '../db/users.json');

// Read users
function readUsers() {
  if (!fs.existsSync(usersPath)) return [];
  const data = fs.readFileSync(usersPath);
  return JSON.parse(data);
}

// Write users
function writeUsers(users) {
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
}

// Register
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'Username sudah digunakan' });
  }
  users.push({ username, password });
  writeUsers(users);
  res.json({ message: 'Registrasi berhasil' });
});

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(400).json({ message: 'Username atau Password salah' });
  }
  res.json({ message: 'Login berhasil' });
});

module.exports = router;
