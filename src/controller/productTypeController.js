const db = require('../models/index');

class productTypeController {
    // /producttypes
    async getProductType(req, res, next) {
        try {
            let getProductType = await db.producttype.findAll();
            res.status(200).json(getProductType);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new productTypeController();
