const express = require('express');
const router = express.Router();

const controller = require('../controllers/survivorController');
const jwtMW = require('../middlewares/jwtMiddleware');

// getting and reading Survivor info
router.get('/', controller.readAllSurvivor);
router.get('/:id', controller.readSurvivorById);

// creating new Survivors :)))
router.post('/', jwtMW.verifyToken, controller.createNewSurvivorCheck, controller.createNewSurvivor);
// LOGIN ROUTE
router.post("/login", jwtMW.verifyToken, controller.login)

// updating Survivors
router.put('/:id', jwtMW.verifyToken, controller.updateSurvivorByIdCheck, controller.updateSurvivorById);

// deleting Survivors :(((
router.delete('/:id', jwtMW.verifyToken, controller.deleteSurvivorById);

module.exports = router;