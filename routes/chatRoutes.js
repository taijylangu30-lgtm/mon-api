const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.get('/status', chatController.getStatus);
router.post('/api/chat', chatController.postChat);
router.post('/api/reset', chatController.postReset);
router.get('/api/info', chatController.getInfo);

module.exports = router;
