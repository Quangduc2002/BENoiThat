const { raw } = require('body-parser');
const db = require('../models/index');

class ProductController {
    // /products/
    async getProduct(req, res, next) {
        try {
            let getProduct = await db.product.findAll({
                where: { trangThai: 1 },
                raw: true,
            });
            res.status(200).json(getProduct);
        } catch (error) {
            console.log(error);
        }
    }

    // /products/trash
    async getProductTrash(req, res, next) {
        try {
            let getProduct = await db.product.findAll({
                where: { trangThai: 0 },
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
            await db.product.update(req.body, { where: { ID: req.params.id }, raw: true });
            res.status(200).json('edit success');
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // [GET]/products/:id/ProductType
    async getProducttype(req, res, next) {
        try {
            const order = await db.product.findAll({
                where: { producttypeId: req.params.id },
                // truy vấn đến bảng orderitem
                include: { model: db.producttype },
                raw: true,
                // nhóm thành 1 Obj
                nest: true,
            });
            res.status(200).json(order);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // [PUT] /products/:id/delete
    async delete(req, res, next) {
        try {
            await db.product.update(req.body, {
                where: { ID: req.params.id },
                raw: true,
            });
            res.status(200).json('delete success');
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // [PUT] /products/deleteAll
    async deleteAll(req, res, next) {
        const selectedCheckboxes = req.body.isChecked;
        if (req.body.action === 'delete') {
            await db.product.update(req.body, {
                where: { ID: selectedCheckboxes },
                raw: true,
            });
            res.status(200).json('delete success');
        } else {
            res.json({ message: 'Action is Invalid! ' });
        }
    }

    // [PUT] /products/trash
    async trash(req, res) {
        const selectedCheckboxes = req.body.isChecked;
        if (req.body.action === 'delete') {
            await db.product.destroy({
                where: { ID: selectedCheckboxes },
                raw: true,
            });
            res.status(200).json('delete success');
        } else if (req.body.action === 'restore') {
            await db.product.update(req.body, {
                where: { ID: selectedCheckboxes },
                raw: true,
            });
            res.status(200).json('restore success');
        } else {
            res.json({ message: 'Action is Invalid! ' });
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

    //  [GET] /products/:id/getRating
    async getRating(req, res, next) {
        try {
            const save = await db.rating.findAll({ where: { userId: req.params.id }, raw: true });
            res.status(200).json(save);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // [GET] /products/:id/rating
    async rating(req, res) {
        try {
            const product = await db.product.findOne({ where: { ID: req.params.id }, raw: true });
            const ratings = await db.rating.findOne({
                where: { userId: req.body.userId, productId: req.body.productId },
                raw: true,
            });

            if (product) {
                await db.rating
                    .findOne({
                        order: [['id', 'DESC']],
                        raw: true,
                    })
                    .then(async (latesCourse) => {
                        if (ratings) {
                            await db.rating.update(req.body, {
                                where: { userId: req.body.userId, productId: req.body.productId },
                                raw: true,
                            });
                            res.status(200).json('rating success');
                        } else {
                            // id tự tăng
                            // req.body.ID = 1;
                            req.body.ID = latesCourse.ID + 1;
                            const newRating = await new db.rating(req.body);
                            const save = await newRating.save();
                            res.status(200).json('rating success');
                        }
                        if (res.statusCode === 200) {
                            const luotDG = await db.rating.findAll({ where: { productId: product.ID }, raw: true });
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
