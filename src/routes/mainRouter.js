const express = require('express');
const router = express.Router();
const announcementRouter = require('./announcementRouter');
const companyRouter = require('./companyRouter');
const employeeRouter = require('./employeeRouter');
const messageRouter = require('./messageRouter');
const newsRouter = require('./newsRouter');
const requestRouter = require('./requestRouter');
const scheduleRouter = require('./scheduleRouter');
const taskRouter = require('./taskRouter');

router.use('/announcement', announcementRouter);
router.use('/company', companyRouter);
router.use('/employee', employeeRouter);
router.use('/message', messageRouter);
router.use('/news', newsRouter);
router.use('/request', requestRouter);
router.use('/schedule', scheduleRouter);
router.use('/task', taskRouter);

module.exports = router;