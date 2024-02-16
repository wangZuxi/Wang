const express = require('express');
const router = express.Router();

const controller = require('../controllers/questController');
const jwtMW = require('../middlewares/jwtMiddleware');

// getting and reading Quest info
router.get('/', controller.readAllQuest);
router.get('/:id', controller.readQuestById);

// creating new Quests :)))
router.post('/', controller.createNewQuestCheck, controller.createNewQuest);

// updating Quests
router.put('/:id', controller.updateQuestByIdCheck, controller.updateQuestById);

// deleting Quests :(((
router.delete('/:id', controller.deleteQuestById);

module.exports = router;