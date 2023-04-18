const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');
const scheduleMiddleware = require('../middleware/scheduleMiddleware');

router.get('/', scheduleController.getSchedules);
router.get('/:id', scheduleController.getOneSchedule);
router.get('/employee/:employee', scheduleController.getScheduleFromEmployee);
router.post('/', scheduleMiddleware.existEmployeeDNI, scheduleController.createSchedule);
router.put('/:id', scheduleController.updateSchedule);
router.delete('/:id', scheduleController.deleteSchedule);

module.exports = router;