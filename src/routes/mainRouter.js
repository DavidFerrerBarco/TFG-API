const express = require('express');
const router = express.Router();
const companyRouter = require('./companyRouter');
const employeeRouter = require('./employeeRouter');

router.use('/company', companyRouter);
router.use('/employee', employeeRouter);

module.exports = router;