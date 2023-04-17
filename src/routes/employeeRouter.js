const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.get('/', employeeController.getEmployees);
router.get('/:id', employeeController.getOneEmployee);
router.get('/company/:id', employeeController.getEmployeesByCompany);

module.exports = router;