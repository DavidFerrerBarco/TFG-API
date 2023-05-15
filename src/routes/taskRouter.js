const express = require('express');
const router = express.Router();
const taskService = require('../controllers/taskController');
const taskMiddleware = require('../middleware/taskMiddleware');

router.get('/', taskService.getTasks);
router.get('/:id', taskService.getOneTask);
router.get('/employee/:employee', taskService.getTasksFromEmployee);
router.post('/', taskMiddleware.existEmployeeDNI, taskService.createTask);
router.put('/:id', taskService.updateTask);
router.delete('/:id', taskService.deleteTask);

module.exports = router;