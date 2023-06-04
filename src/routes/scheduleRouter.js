const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');
const scheduleMiddleware = require('../middleware/scheduleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', scheduleController.getSchedules);
router.get('/:id', scheduleController.getOneSchedule);
router.get('/employee/:employee', authMiddleware.validateToken, scheduleController.getScheduleFromEmployee);
router.get('/company/:company', scheduleController.getScheduleFromCompany);
router.post('/daylist/:employee', scheduleController.getSchedulesFromEmployeeByDayList);
router.post('/', scheduleMiddleware.existEmployeeDNI, scheduleMiddleware.validDate, scheduleController.createSchedule);
router.put('/:id', scheduleController.updateSchedule);
router.delete('/:id', scheduleController.deleteSchedule);

module.exports = router;