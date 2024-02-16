const express = require('express');
const router = express.Router();

const controller = require('../controllers/taskController');
const jwtMW = require('../middlewares/jwtMiddleware');

// getting and reading task info
router.get('/', controller.readAllTask);
router.get('/:id', controller.readTaskById);

// creating new tasks :)))
router.post('/', controller.createNewTaskCheck, controller.createNewTask);

// updating tasks
router.put('/:id', controller.updateTaskByIdCheck, controller.updateTaskById);

// deleting tasks :(((
router.delete('/:id', controller.deleteTaskById);

module.exports = router;