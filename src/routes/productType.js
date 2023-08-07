const express = require('express');
const router = express.Router();
const productTypeController = require('../controller/productTypeController');

router.get('/', productTypeController.getProductType);

module.exports = router;