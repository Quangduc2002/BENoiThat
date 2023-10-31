const db = require('../models/index');

class orderItemController {
    //[GET] /orderItem
    async getOrderItem(req, res, next) {
        try {
            const save = await db.orderitem.findAll();
            res.status(200).json(save);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // /:id/orderItem
    async getOrderDetailItem(req, res, next) {
        try {
            const save = await db.orderitem.findAll({ where: { orderID: req.params.id } });
            res.status(200).json(save);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // /:id/orderFinish
    async getOrderFinish(req, res, next) {
        try {
            const save = await db.orderitem.findAll({ where: { orderID: req.params.id } });
            res.status(200).json(save);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = new orderItemController();
