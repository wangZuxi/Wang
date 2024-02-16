const express = require('express');
const router = express.Router();

const jwtMW = require('../middlewares/jwtMiddleware');
const controller = require('../controllers/questRecordsController');

// getting and reading Quest Records info
router.get('/:id', controller.readQuestRecordsById);

// creating new Quest Records :)))
router.post('/', jwtMW.verifyToken, controller.createNewQuestRecordsCheck, controller.createNewQuestRecords);

// updating Quest Recordss
router.put('/:id', jwtMW.verifyToken, controller.updateQuestRecordsById);

module.exports = router;