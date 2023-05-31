const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const companyMiddleware = require('../middleware/companyMiddleware');

router.get('/', companyController.getCompanies);
router.get('/:id', companyController.getOneCompany);
router.post('/', companyMiddleware.existingCompany, companyController.createCompany);
router.put('/:id', companyMiddleware.notExistingCompany, companyController.updateCompany);
router.delete('/:id', companyController.deleteCompany);

module.exports = router;