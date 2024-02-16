const express = require('express');
const router = express.Router();

const controller = require('../controllers/userController');
const bycryptMW = require('../middlewares/bcryptMiddleware');
const jwtMW = require('../middlewares/jwtMiddleware');

// getting and reading user info
router.get('/', controller.readAllUser);
router.get('/:id', controller.readUserById);

// creating new users :))) (REGISTER ROUTE)
router.post('/', controller.createNewUserCheck, bycryptMW.hashPassword, controller.createNewUser);

// LOGIN ROUTE
router.post("/login", controller.login, bycryptMW.comparePassword, jwtMW.generateToken, jwtMW.sendToken)

// updating users
router.put('/:id', jwtMW.verifyToken, controller.updateUserByIdCheck, controller.updateUserById);

// deleting users :(((
router.delete('/:id', jwtMW.verifyToken, controller.deleteUserById);

module.exports = router;