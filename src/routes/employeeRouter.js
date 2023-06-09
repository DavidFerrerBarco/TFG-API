const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const employeeMiddleware = require('../middleware/employeeMiddleware');

router.get('/', employeeController.getEmployees);
router.get('/:id', employeeController.getOneEmployee);
router.get('/company/:company', employeeController.getEmployeesByCompany);
router.post('/', 
    employeeMiddleware.existDNI, 
    employeeMiddleware.validCompany, 
    employeeMiddleware.validDNI, 
    employeeController.createEmployee
);

router.post('/login', employeeMiddleware.loginValidUser, employeeController.loginEmployee);
router.post('/login/admin', employeeMiddleware.loginValidUser, employeeMiddleware.isAdmin, employeeController.loginEmployee);
router.put('/admin/:id', employeeController.updateEmployee);
router.put('/:id', employeeMiddleware.containsDNI, employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;