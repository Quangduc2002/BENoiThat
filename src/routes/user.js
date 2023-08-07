const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.get('/Staff', userController.getStaff);
router.get('/Customer', userController.getCustomer);
router.delete('/:id/Customer', userController.DelCustomer);
router.post('/register', userController.Register);
router.post('/login', userController.handleLogin);
router.get('/', userController.getUser);

module.exports = router;
