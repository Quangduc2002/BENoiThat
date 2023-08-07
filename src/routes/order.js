const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');

router.get('/bill', orderController.getBill);
router.get('/income', orderController.getIncome);
router.get('/annouce', orderController.annouce);
router.post('/Email', orderController.sendEmail);
router.get('/listOrder', orderController.getOrder);
router.post('/', orderController.addOrder);

module.exports = router;
