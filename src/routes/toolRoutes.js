const express = require('express');
const router = express.Router();

const controller = require('../controllers/toolController');
const jwtMW = require('../middlewares/jwtMiddleware');

// getting and reading tool info
router.get('/', controller.readAllTool);
router.get('/:id', controller.readToolById);

// creating new tools :)))
router.post('/', controller.createNewToolCheck, controller.createNewTool);

// updating tools
router.put('/:id', controller.updateToolById);

// deleting tools :(((
router.delete('/:id', controller.deleteToolById);

module.exports = router;