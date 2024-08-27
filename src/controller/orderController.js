const db = require('../models/index');
const nodemailer = require('nodemailer');
require('dotenv').config();

// format tiền
const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

class OrderController {
    // order
    async addOrder(req, res, next) {
        try {
            if (req.body.Product) {
                db.Order.findOne({
                    order: [['ID', 'DESC']],
                    raw: true,
                }).then((latesCourse) => {
                    req.body.ID = latesCourse.ID + 1;
                    const order = new db.Order(req.body);
                    order.save();
                    for (let item = 0; item < req.body.Product.length; item++) {
                        db.OrderItem.create({
                            orderID: order.ID,
                            productID: req.body.Product[item].ID,
                            soLuong: req.body.Product[item].qty,
                            donGia: req.body.Product[item].total,
                            image: req.body.Product[item].image,
                            tenSp: req.body.Product[item].tenSp,
                            giaNhap: req.body.Product[item].giaNhap,
                            giaBan: req.body.Product[item].giaBan,
                            kichThuoc: req.body.Product[item].kichThuoc,
                            chatLieu: req.body.Product[item].chatLieu,
                            giamGia: req.body.Product[item].giamGia,
                        });
                    }
                });
            }
            res.status(200).json('order success');
        } catch (error) {}
    }

    // /order/annouce
    async annouce(req, res, next) {
        try {
            const save = await db.Order.findAll({ where: { TrangThaiDH: false } });
            res.status(200).json(save);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    //[GET] /listOrder
    async getListOrder(req, res, next) {
        try {
            const save = await db.Order.findAll({
                order: [['createdAt', 'DESC']],
            });
            res.status(200).json(save);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // /bill
    async getBill(req, res, next) {
        try {
            const order = await db.OrderItem.sum('soLuong', {
                include: [
                    {
                        model: db.Order,
                        where: { trangThaiDH: 1 },
                        attributes: ['trangThaiDH'],
                    },
                ],
                raw: true,
                nest: true,
            });
            res.status(200).json(order);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // /income
    async getIncome(req, res, next) {
        try {
            const order = await db.Order.findAll({
                where: { trangThaiDH: 1 },
                // truy vấn đến bảng orderitem
                include: { model: db.OrderItem },
                raw: true,
                // nhóm thành 1 Obj
                nest: true,
            });
            res.status(200).json(order);
        } catch (error) {
            console.log(error);
        }
    }

    // /:user/getOrder
    async getOrder(req, res, next) {
        try {
            const order = await db.Order.findAll({ where: { maKH: req.params.user }, raw: true });
            let orderItem = [];
            for (let i = 0; i < order.length; i++) {
                orderItem.push(
                    await db.OrderItem.findAll({
                        where: { orderID: order[i].ID },
                        raw: true,
                        include: { model: db.Order },
                        // nhóm thành 1 Obj
                        nest: true,
                    }),
                );
            }

            res.status(200).json(orderItem);
        } catch (error) {
            console.log(error);
        }
    }

    // /:user/waitConfirm
    async waitConfirm(req, res, next) {
        try {
            const order = await db.Order.findAll({ where: { maKH: req.params.user, trangThaiDH: 0 }, raw: true });
            let orderItem = [];
            for (let i = 0; i < order.length; i++) {
                orderItem.push(
                    await db.OrderItem.findAll({
                        where: { orderID: order[i].ID },
                        raw: true,
                        include: { model: db.Order },
                        // nhóm thành 1 Obj
                        nest: true,
                    }),
                );
            }

            res.status(200).json(orderItem);
        } catch (error) {
            console.log(error);
        }
    }

    // /:user/finish
    async finish(req, res, next) {
        try {
            const order = await db.Order.findAll({ where: { maKH: req.params.user, trangThaiDH: 1 }, raw: true });
            let orderItem = [];
            for (let i = 0; i < order.length; i++) {
                orderItem.push(
                    await db.OrderItem.findAll({
                        where: { orderID: order[i].ID },
                        raw: true,
                        include: { model: db.Order },
                        // nhóm thành 1 Obj
                        nest: true,
                    }),
                );
            }

            res.status(200).json(orderItem);
        } catch (error) {
            console.log(error);
        }
    }

    // /:id/cancelOrder
    async cancelOrder(req, res, next) {
        try {
            await db.Order.update(req.body, { where: { ID: req.params.id }, raw: true });
            res.status(200).json('cancel success');
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // /:user/cancel
    async cancel(req, res, next) {
        try {
            const order = await db.Order.findAll({ where: { maKH: req.params.user, trangThaiDH: 3 }, raw: true });
            let orderItem = [];
            for (let i = 0; i < order.length; i++) {
                orderItem.push(
                    await db.OrderItem.findAll({
                        where: { orderID: order[i].ID },
                        raw: true,
                        include: { model: db.Order },
                        // nhóm thành 1 Obj
                        nest: true,
                    }),
                );
            }

            res.status(200).json(orderItem);
        } catch (error) {
            console.log(error);
        }
    }

    async payMent(req, res) {
        res.status(200).json(process.env.CLIENT_ID);
    }

    // /order/Email
    async sendEmail(req, res, next) {
        const orderItem = await db.OrderItem.findAll({ where: { orderID: req.body.orderProduct.ID }, raw: true });
        var TongSp = 0;
        for (let i = 0; i < orderItem.length; i++) {
            TongSp += parseFloat(orderItem[i].donGia);
            // discount số lượng nhập
            const product = await db.Product.findAll({ where: { ID: orderItem[i].productID }, raw: true });
            for (let j = 0; j < product.length; j++) {
                db.Product.update(
                    { soLuong: product[j].soLuong - orderItem[i].soLuong },
                    { where: { ID: product[j].ID }, raw: true },
                );
            }
        }

        // trạng thái mua hàng
        if (req.body.orderProduct.ID) {
            db.Order.update(
                { trangThaiDH: req.body.trangThaiDH },
                { where: { ID: req.body.orderProduct.ID }, raw: true },
            );
        }

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                user: process.env.EMAIL_APP,
                pass: process.env.EMAIL_APP_PASSWORD,
            },
        });

        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"Quang Đức 👻" <phamquangduc110@gmail.com>', // sender address
            to: `${req.body.orderProduct.email}`, // list of receivers
            subject: 'Thông tin mua sản phẩm', // Subject line
            text: 'Hello world?', // plain text body
            // html body
            html: `
                <h3>Xin chào bạn ${req.body.orderProduct.tenKH}</h3>
                <p>Bạn nhận được Email này vì bạn đã được xác nhận mua sản phẩm của bên chúng tôi.Sản phẩm sẽ được giao đến bạn từ 2-3 ngày</p>
                <p>Thông tin về ${orderItem.length} sản phẩm của bạn:</p>
                ${orderItem.map((product) => {
                    return `
                        <div>
                            <b>Tên sản phẩm: ${product.tenSp}</b>
                            <br/>
                            <b>Số lượng: x${product.soLuong}</b>
                            <br/>
                            <b>Tổng tiền của sản phẩm: ${VND.format(product.donGia)}</b>
                        </div>
                       `;
                })}
                <p>
                    <b>Tổng đơn hàng của bạn: ${VND.format(TongSp)}</b>
                </p>
                <div>Nếu thông tin sản phẩm chưa chính xác.Vui lòng bạn liên hệ tới
                    <b>
                    Hotline: 0965420922
                    </b>
                </div>
                <div>Xin chân thành cảm ơn !</div>
            `,
        });
        res.status(200).json(' success');
    }
}

module.exports = new OrderController();
