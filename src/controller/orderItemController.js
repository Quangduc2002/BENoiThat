const db = require('../models/index');

class orderItemController {
    //[GET] /orderItem
    async getOrderItem(req, res, next) {
        try {
            const save = await db.OrderItem.findAll({
                include: { model: db.Product },
            });
            res.status(200).json(save);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // /:id
    async getOrderDetailItem(req, res, next) {
        try {
            const save = await db.OrderItem.findAll({
                where: { orderID: req.params.id },
                include: [{ model: db.Product }, { model: db.Order }],
                raw: true,
                nest: true,
            });
            res.status(200).json(save);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // /:id/orderFinish
    async getOrderFinish(req, res, next) {
        try {
            const save = await db.OrderItem.findAll({ where: { orderID: req.params.id } });
            res.status(200).json(save);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = new orderItemController();
