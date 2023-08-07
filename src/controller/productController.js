const { raw } = require('body-parser');
const db = require('../models/index');

class ProductController {
    // /products
    async getProduct(req, res, next) {
        try {
            let getProduct = await db.product.findAll({
                raw: true,
            });
            res.status(200).json(getProduct);
        } catch (error) {
            console.log(error);
        }
    }

    // /products/add
    async addProduct(req, res, next) {
        try {
            await db.product
                .findOne({
                    order: [['id', 'DESC']],
                    raw: true,
                })
                .then((latesCourse) => {
                    // id tự tăng
                    req.body.ID = latesCourse.ID + 1;
                    req.body.image = req.file ? req.file.filename : '';
                    const newProduct = new db.product(req.body);
                    newProduct
                        .save()
                        .then(() => res.status(200).json('add success'))
                        .catch(() => res.status(500).json());
                });
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // [PUT] /products/:id/edit
    async edit(req, res, next) {
        try {
            console.log(req.body);
            await db.product.update(req.body, { where: { ID: req.params.id }, raw: true });
            res.status(200).json('edit success');
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // [GET]/products/:id/ProductType
    async getProducttype(req, res, next) {
        try {
            const save = await db.product.findAll({ where: { loaiSp: req.params.id } });
            res.status(200).json(save);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // [DELETE] /products/:id/delete
    async delete(req, res, next) {
        try {
            await db.product.destroy({
                where: { ID: req.params.id },
            });
            res.status(200).json('delete success');
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // [GET]/products/:id
    async getIdProduct(req, res, next) {
        try {
            const save = await db.product.findOne({ where: { ID: req.params.id } });
            res.status(200).json(save);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // /:id/getRating
    async getRating(req, res, next) {
        try {
            const save = await db.rating.findAll({ where: { productId: req.params.id }, raw: true });
            res.status(200).json(save);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // [GET] /products/:id/rating
    async rating(req, res) {
        try {
            const product = await db.product.findOne({ where: { ID: req.params.id }, raw: true });
            if (product) {
                await db.rating
                    .findOne({
                        order: [['id', 'DESC']],
                        raw: true,
                    })
                    .then(async (latesCourse) => {
                        // id tự tăng
                        req.body.ID = latesCourse.ID + 1;
                        const newRating = new db.rating(req.body);
                        const save = await newRating.save();
                        res.status(200).json('rating success');
                        if (res.statusCode === 200) {
                            const luotDG = await db.rating.findAll({ where: { productId: product.id }, raw: true });
                            for (let i = 0; i < luotDG.length; i++) {
                                const tongDanhGia =
                                    luotDG.reduce((acc, item) => item.numberRating + acc, 0) / luotDG.length;
                                db.product.update(
                                    { tongDanhGia: tongDanhGia, soLuotDanhGia: luotDG.length },
                                    { where: { ID: req.params.id }, raw: true },
                                );
                            }
                        }
                    });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = new ProductController();
