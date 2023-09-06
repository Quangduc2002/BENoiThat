const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');

router.get('/:user/cancel', orderController.cancel);
router.put('/:id/cancelOrder', orderController.cancelOrder);
router.get('/:user/finish', orderController.finish);
router.get('/:user/waitConfirm', orderController.waitConfirm);
router.get('/:user/getOrder', orderController.getOrder);
router.get('/bill', orderController.getBill);
router.get('/income', orderController.getIncome);
router.get('/annouce', orderController.annouce);
router.post('/Email', orderController.sendEmail);
router.get('/listOrder', orderController.getListOrder);
router.post('/', orderController.addOrder);

module.exports = router;
