const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.get('/', messageController.getMessages);
router.get('/:id', messageController.getOneMessage);
router.get('/:sender/:receiver', messageController.getConversation);
router.post('/', messageController.createMessage);
router.put('/:id', messageController.updateMessage);
router.delete('/:id', messageController.deleteMessage);

module.exports = router;