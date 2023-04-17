const express = require('express');
const router = express.Router();
const announcementRouter = require('./announcementRouter');
const companyRouter = require('./companyRouter');
const employeeRouter = require('./employeeRouter');
const messageRouter = require('./messageRouter');
const requestRouter = require('./requestRouter');
const scheduleRouter = require('./scheduleRouter');
const taskRouter = require('./taskRouter');

router.use('/company', companyRouter);
router.use('/employee', employeeRouter);
router.use('/announcement', announcementRouter);
router.use('/message', messageRouter);
router.use('/request', requestRouter);
router.use('/schedule', scheduleRouter);
router.use('/task', taskRouter);

module.exports = router;