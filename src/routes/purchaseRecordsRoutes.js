const express = require('express');
const router = express.Router();

const controller = require('../controllers/purchaseRecordsController');
const jwtMW = require('../middlewares/jwtMiddleware');

// getting and reading Purchase Records info
router.get('/:id', controller.readPurchaseRecordsById);

// creating new Purchase Records :)))
router.post('/', jwtMW.verifyToken, controller.createNewPurchaseRecordsCheck, controller.createNewPurchaseRecords);


module.exports = router;