const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const messagesPath = path.join(__dirname, '../db/messages.json');

// Read messages
function readMessages() {
  if (!fs.existsSync(messagesPath)) return [];
  const data = fs.readFileSync(messagesPath);
  return JSON.parse(data);
}

// Write messages
function writeMessages(messages) {
  fs.writeFileSync(messagesPath, JSON.stringify(messages, null, 2));
}

// Get chat history
router.get('/history/global', (req, res) => {
  const messages = readMessages();
  res.json(messages);
});

// Send new message
router.post('/message', (req, res) => {
  const { username, text } = req.body;
  const messages = readMessages();
  const newMsg = { id: Date.now(), username, text };
  messages.push(newMsg);
  writeMessages(messages);
  res.json({ message: 'Pesan dikirim' });
});

module.exports = router;
