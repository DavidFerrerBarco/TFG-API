const express = require('express');
const router = express.Router();
const announcementMiddleware = require('../middleware/announcementeMiddleware');
const announcementController = require('../controllers/announcementController');

router.get('/', announcementController.getAnnouncements);
router.get('/:id', announcementController.getOneAnnouncement);
router.post('/', announcementMiddleware.existingCompany, announcementController.createAnnouncement);
router.put('/:id', announcementMiddleware.existingCompany, announcementController.updateAnnouncement);
router.delete('/:id', announcementController.deleteAnnouncement);

module.exports = router;