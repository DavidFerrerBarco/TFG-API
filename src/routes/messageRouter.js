const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const messageMiddleware = require('../middleware/messageMiddleware');

router.get('/', messageController.getMessages);
router.get('/:id', messageController.getOneMessage);
router.get('/sender/:sender/receiver/:receiver', messageMiddleware.existEmployeesId, messageController.getConversation);
router.post('/', messageMiddleware.createMessageExistEmployees, messageController.createMessage);
router.put('/:id', messageController.updateMessage);
router.delete('/:id', messageController.deleteMessage);

module.exports = router;