const express = require('express');
const router = express.Router();
const orderItemController = require('../controller/orderItemController');

router.get('/:id', orderItemController.getOrderDetailItem);
router.get('/', orderItemController.getOrderItem);

module.exports = router;
