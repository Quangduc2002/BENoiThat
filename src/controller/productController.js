const db = require('../models/index');

class ProductController {
    // /products/
    async getProduct(req, res, next) {
        try {
            let getProduct = await db.Product.findAll({
                where: { trangThai: 1 },
                include: [{ model: db.Meterial }, { model: db.ProductType }],
                raw: true,
                nest: true,
            });
            res.status(200).json(getProduct);
        } catch (error) {
            console.log(error);
        }
    }

    // /meterial
    async getMeterial(req, res, next) {
        try {
            let getMeterial = await db.Meterial.findAll();
            res.status(200).json(getMeterial);
        } catch (error) {
            console.log(error);
        }
    }

    // /products/trash
    async getProductTrash(req, res, next) {
        try {
            let getProduct = await db.Product.findAll({
                where: { trangThai: 0 },
                include: [{ model: db.Meterial }, { model: db.ProductType }],
                raw: true,
                nest: true,
            });
            res.status(200).json(getProduct);
        } catch (error) {
            console.log(error);
        }
    }

    //[post] /products/add
    async addProduct(req, res, next) {
        try {
            await db.Product.findOne({
                order: [['ID', 'DESC']],
                raw: true,
            }).then((latesCourse) => {
                // id tự tăng
                req.body.ID = latesCourse.ID + 1;
                req.body.image = req.file ? req.file.filename : '';
                const newProduct = new db.Product(req.body);
                newProduct.save();

                // const importReceipt = new db.ImportReceipt(req.body).save().then((receipt) => {
                //     db.ImportReceiptDetail.create({
                //         receiptId: receipt.ID,
                //         productId: newProduct.ID,
                //         soLuong: req.body.soLuong,
                //         giaNhap: req.body.giaNhap,
                //     });
                // });

                res.status(200).json(newProduct);
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // [PUT] /products/:id/edit
    async edit(req, res, next) {
        try {
            await db.Product.update(req.body, { where: { ID: req.params.id }, raw: true });
            res.status(200).json('edit success');
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // [GET]/products/:id/ProductType
    async getProducttype(req, res, next) {
        try {
            const order = await db.Product.findAll({
                where: { producttypeId: req.params.id, trangThai: 1 },
                // truy vấn đến bảng orderitem
                include: { model: db.ProductType },
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
            await db.Product.update(req.body, {
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
            await db.Product.update(req.body, {
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
            await db.Product.destroy({
                where: { ID: selectedCheckboxes },
                raw: true,
            });
            res.status(200).json('delete success');
        } else if (req.body.action === 'restore') {
            await db.Product.update(req.body, {
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
            const save = await db.Product.findOne({ where: { ID: req.params.id }, include: [{ model: db.Meterial }] });
            res.status(200).json(save);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    //  [GET] /products/:id/getRating
    async getRating(req, res, next) {
        try {
            const rating = await db.Rating.findAll({
                where: { userId: req.params.id },
                raw: true,
            });
            res.status(200).json(rating);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // [GET] /products/:id/evaluation
    async evaluation(req, res, next) {
        try {
            const save = [];
            for (let i = 1; i <= 5; i++) {
                save.push(
                    await db.Rating.findAndCountAll({
                        where: { productId: req.params.id, numberRating: i },
                        raw: true,
                    }),
                );
            }
            res.status(200).json(save);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    async evaluaAll(req, res, next) {
        try {
            const page = parseInt(req.body.currentPage) || 1;
            const limit = 10;
            const offset = (page - 1) * limit;

            const { count, rows: ratings } = await db.Rating.findAndCountAll({
                where: { productId: req.params.id },
                include: [
                    {
                        model: db.User,
                        attributes: ['ID', 'name', 'image'],
                    },
                ],
                offset,
                limit,
                raw: true,
                nest: true,
            });

            res.status(200).json({
                ratings,
                totalRatings: count,
                limit,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    // [put] /products/:id/rating
    async rating(req, res) {
        try {
            const product = await db.Product.findOne({ where: { ID: req.params.id }, raw: true });
            const ratings = await db.Rating.findOne({
                where: { userId: req.body.userId, productId: req.body.productId },
                raw: true,
            });

            if (product) {
                await db.Rating.findOne({
                    order: [['id', 'DESC']],
                    raw: true,
                }).then(async (latesCourse) => {
                    if (ratings) {
                        await db.Rating.update(req.body, {
                            where: { userId: req.body.userId, productId: req.body.productId },
                            raw: true,
                        });
                        res.status(200).json('rating success');
                    } else {
                        // id tự tăng
                        // req.body.ID = 1;
                        req.body.ID = latesCourse.ID + 1;
                        const newRating = await new db.Rating(req.body);
                        const save = await newRating.save();
                        res.status(200).json('rating success');
                    }
                    if (res.statusCode === 200) {
                        const luotDG = await db.Rating.findAll({ where: { productId: product.ID }, raw: true });
                        for (let i = 0; i < luotDG.length; i++) {
                            const tongDanhGia =
                                luotDG.reduce((acc, item) => item.numberRating + acc, 0) / luotDG.length;
                            db.Product.update(
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

    // [put] /products/rating
    async ratingProduct(req, res) {
        try {
            const stars = req.body.checkStar;
            const luotDG = [];

            for (let i = 0; i < stars.length; i++) {
                const ratings = await db.Rating.findOne({
                    where: { userId: req.body.userId, productId: stars[i].productID },
                    raw: true,
                });

                if (ratings) {
                    await db.Rating.update(
                        { numberRating: stars[i].numberRating },
                        {
                            where: { userId: req.body.userId, productId: stars[i].productID },
                            raw: true,
                        },
                    );
                } else {
                    await db.Rating.findOne({
                        order: [['id', 'DESC']],
                        raw: true,
                    }).then(async (latesCourse) => {
                        // id tự tăng
                        // req.body.ID = 1;
                        req.body.ID = latesCourse.ID + 1;
                        req.body.numberRating = stars[i].numberRating;
                        req.body.productId = stars[i].productID;
                        req.body.comment = stars[i].comment;
                        const newRating = await new db.Rating(req.body);
                        const save = await newRating.save();
                    });
                }

                luotDG.push(
                    await db.Rating.findAll({
                        where: { productId: stars[i].productID },
                        raw: true,
                    }),
                );
            }

            for (let j = 0; j < luotDG.length; j++) {
                const tongDanhGia = luotDG[j].reduce((acc, item) => item.numberRating + acc, 0) / luotDG[j].length;
                db.Product.update(
                    { tongDanhGia: tongDanhGia, soLuotDanhGia: luotDG[j].length },
                    { where: { ID: stars[j].productID }, raw: true },
                );
            }

            res.status(200).json('rating success');
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // [post] /products/statistic
    async statistic(req, res, next) {
        try {
            const startMonth = (req.body.precious - 1) * 3 + 1;
            const endMonth = req.body.precious * 3;
            const monthlyStatistics = await db.OrderItem.findAll({
                include: [
                    {
                        model: db.Order,
                        where: { trangThaiDH: 1 },
                        attributes: ['trangThaiDH'],
                    },
                ],
                attributes: [
                    // [db.sequelize.fn('DATE_FORMAT', db.sequelize.col('OrderItem.createdAt'), '%Y'), 'year'],
                    'productID',
                    'tenSp',
                    'image',
                    'kichThuoc',
                    'donGia',
                    [db.sequelize.fn('SUM', db.sequelize.col('soLuong')), 'totalQuantity'],
                ],
                group: ['productID', 'tenSp', 'image', 'kichThuoc', 'donGia'],
                where:
                    req.body.methodStatistic === 'Sản phẩm đã bán trong tháng'
                        ? db.Sequelize.and(
                              db.sequelize.literal(`DATE_FORMAT(OrderItem.createdAt, '%Y') = ${req.body.year}`),
                              db.sequelize.literal(`DATE_FORMAT(OrderItem.createdAt, '%m') = ${req.body.month}`),
                          )
                        : req.body.methodStatistic === 'Sản phẩm đã bán theo quý'
                        ? {
                              [db.Sequelize.Op.and]: [
                                  db.sequelize.literal(
                                      `DATE_FORMAT(OrderItem.createdAt, '%Y-%m-%d') BETWEEN '${
                                          req.body.year
                                      }-${startMonth.toString().padStart(2, '0')}-1}' AND '${req.body.year}-${endMonth
                                          .toString()
                                          .padStart(2, '0')}-31}'`,
                                  ),
                                  db.sequelize.literal(`DATE_FORMAT(OrderItem.createdAt, '%Y') = ${req.body.year}`),
                              ],
                          }
                        : '',
                raw: true,
                nest: true,
            });
            res.status(200).json(monthlyStatistics);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async chartStatistic(req, res) {
        try {
            const monthsInYear = [];
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            for (let i = 0; i < 12; i++) {
                // .padStart(2, '0'): Đảm bảo rằng chuỗi có ít nhất 2 ký tự bằng cách thêm ký tự '0' vào đầu
                req.body.year !== ''
                    ? monthsInYear.push(` ${req.body.year}-${(i + 1).toString().padStart(2, '0')}`.trim())
                    : monthsInYear.push(` ${currentYear}-${(i + 1).toString().padStart(2, '0')}`.trim());
            }

            const monthlyRevenue = await db.OrderItem.findAll({
                include: [
                    {
                        model: db.Order,
                        where: { trangThaiDH: 1 },
                        attributes: ['trangThaiDH'],
                    },
                ],
                attributes: [
                    [db.sequelize.fn('DATE_FORMAT', db.sequelize.col('OrderItem.createdAt'), '%Y-%m'), 'month'],
                    [db.sequelize.fn('SUM', db.sequelize.col('donGia')), 'total'],
                ],
                where: {
                    createdAt: {
                        [db.Sequelize.Op.between]:
                            req.body.year !== ''
                                ? [`${req.body.year}-01-01`.trim(), `${req.body.year}-12-31`.trim()]
                                : [`${currentYear}-01-01`.trim(), `${currentYear}-12-31`.trim()],
                    },
                },
                group: ['month'],
                raw: true,
                nest: true,
            });

            // // Merge kết quả thống kê với mảng các tháng trong năm
            const resultMonthsInYear = monthsInYear.map((month) => {
                const matchingResult = monthlyRevenue.find((result) => result.month === month);
                return matchingResult ? matchingResult : { month, total: 0 };
            });

            res.status(200).json(resultMonthsInYear);
        } catch (error) {
            console.log(error);
        }
    }

    // [get] /statistic/status
    async statisticStatus(req, res, next) {
        try {
            const statusWait = await db.Order.count({
                where: { trangThaiDH: 0 },
            });

            res.status(200).json(statusWait);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new ProductController();
