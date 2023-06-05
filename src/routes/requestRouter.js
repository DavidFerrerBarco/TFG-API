const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const requestMiddleware = require('../middleware/requestMiddleware');

router.get('/', requestController.getRequests);
router.get('/:id', requestController.getOneRequest);
router.get('/company/:company', requestController.getRequestsFromCompany);
router.post('/', requestMiddleware.existEmployeeDNI, requestController.createRequest);
router.put('/:id', requestController.updateRequest);
router.delete('/:id', requestController.deleteRequest);

module.exports = router;