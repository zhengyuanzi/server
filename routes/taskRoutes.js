const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/getTaskList', taskController.getTasksList);

router.post('/createTask', taskController.createTask);

router.post('/updateTask', taskController.updateTask);

router.post('/deleteTask', taskController.deleteTask);

router.get('/getTaskDetail', taskController.getTasksDetail);


module.exports = router;
