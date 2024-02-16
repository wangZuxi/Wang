const express = require('express');
const router = express.Router();

const controller = require('../controllers/msgController.js');
const jwtMW = require('../middlewares/jwtMiddleware');

// getting and reading Msg info
router.get('/', controller.readAllMsg);

// Reading by user_id
router.get('/:id', controller.readById);

// creating new Msgs :)))
router.post('/', controller.createNewMsg);

// updating Msgs
router.put('/:id', jwtMW.verifyToken, controller.updateMsgById);

// deleting Msgs :(((
router.delete('/:id', jwtMW.verifyToken, controller.deleteMsgById);

module.exports = router;