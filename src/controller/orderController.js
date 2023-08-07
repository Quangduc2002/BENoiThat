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
                db.order
                    .findOne({
                        order: [['ID', 'DESC']],
                        raw: true,
                    })
                    .then((latesCourse) => {
                        req.body.ID = latesCourse.ID + 1;
                        const order = new db.order(req.body);
                        order.save();
                        for (let item = 0; item < req.body.Product.length; item++) {
                            db.orderitem.create({
                                orderID: order.ID,
                                idSanPham: req.body.Product[item].id,
                                soLuong: req.body.Product[item].qty,
                                donGia: req.body.Product[item].total,
                                image: req.body.Product[item].image,
                                tenSp: req.body.Product[item].tenSp,
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
            const save = await db.order.findAll({ where: { TrangThaiDH: false } });
            res.status(200).json(save);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    //[GET] /listOrder
    async getOrder(req, res, next) {
        try {
            const save = await db.order.findAll();
            res.status(200).json(save);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // /bill
    async getBill(req, res, next) {
        try {
            const order = await db.order.findAll({ where: { trangThaiDH: 1 } });
            res.status(200).json(order);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // /income
    async getIncome(req, res, next) {
        // try {
        //     const order = await db.order.findAll({ where: { trangThaiDH: 1 }, raw: true });
        //     let orderItem = [];
        //     for (let i = 0; i < order.length; i++) {
        //         orderItem.push(await db.orderitem.findAll({ where: { maSp: order[i].ID }, raw: true }));
        //     }
        //     res.status(200).json(orderItem);
        // } catch (err) {
        //     res.status(500).json(err);
        // }
        try {
            const order = await db.order.findAll({
                where: { trangThaiDH: 1 },
                include: { model: db.orderitem },
                raw: true,
                // nhóm thành 1 Obj
                nest: true,
            });
            res.status(200).json(order);
        } catch (error) {
            console.log(error);
        }
    }

    // /order/Email
    async sendEmail(req, res, next) {
        const orderItem = await db.orderitem.findAll({ where: { orderID: req.body.orderProduct.ID }, raw: true });
        console.log(orderItem);
        var TongSp = 0;
        for (let i = 0; i < orderItem.length; i++) {
            TongSp += parseFloat(orderItem[i].donGia);
            // discount số lượng nhập
            const product = await db.product.findAll({ where: { ID: orderItem[i].idSanPham }, raw: true });
            db.product.update(
                { soLuong: product[i].soLuong - orderItem[i].soLuong },
                { where: { ID: product[i].ID }, raw: true },
            );
        }

        // trạng thái mua hàng
        if (req.body.orderProduct.ID) {
            db.order.update(
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
