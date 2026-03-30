const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// POST /api/chat
// Expected body: { prompt: "Your question", models: ["groq", "mistral", "openai"] }
router.post('/', chatController.handleChatRequest);

module.exports = router;
