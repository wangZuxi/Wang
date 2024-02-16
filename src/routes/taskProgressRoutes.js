const express = require('express');
const router = express.Router();

const controller = require('../controllers/taskProgressController');
const jwtMW = require('../middlewares/jwtMiddleware');

// getting and reading task progress info
router.get('/:id', controller.readTaskProgressById);

// creating new task progress :)))
router.post('/', jwtMW.verifyToken, controller.createNewTaskProgressCheck, controller.createNewTaskProgress);

// updating task progress
router.put('/:id',jwtMW.verifyToken,  controller.updateTaskProgressById);

// deleting task progress :(((
router.delete('/:id', jwtMW.verifyToken, controller.deleteTaskProgressById);

module.exports = router;