const express = require('express');
const router = express.Router();
const materialController = require('../controller/materialController');

router.put('/:id/update', materialController.updateMeterial);
router.delete('/:id/delete', materialController.deleteMeterial);
router.post('/add', materialController.addMeterial);
router.get('/', materialController.getMeterial);

module.exports = router;
