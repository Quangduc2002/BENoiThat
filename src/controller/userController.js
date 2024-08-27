require('dotenv').config();
const bcrypt = require('bcrypt');
const db = require('../models/index');
const nodemailer = require('nodemailer');
const salt = bcrypt.genSaltSync(10);
const sequelize = require('sequelize');
const { createJWT } = require('../middleware/JWTAction');

class UserController {
    // findUser
    async findUser(req, res, next) {
        try {
            let userData = {};
            const user = await db.User.findOne({ where: { email: req.body.email } });
            if (user) {
                let getUser = {
                    id: user.ID,
                    email: user.email,
                    name: user.name,
                    soDT: user.soDT,
                    image: user.image,
                };
                userData.user = getUser;
                res.status(200).json({ user: userData.user ? userData.user : {} });
            } else {
                res.status(500).json({ errCode: 1, message: 'Tài khoản không tồn tại !' });
            }
        } catch (error) {
            console.log(error);
        }
    }
    // /user
    async getAllUser(req, res, next) {
        try {
            let getUser = await db.User.findAll();
            res.status(200).json(getUser);
        } catch (error) {
            console.log(error);
        }
    }

    // [GET] user/Customer
    async getCustomer(req, res) {
        try {
            const totalAmounts = await db.User.findAll({
                where: { roleId: 1 },
                attributes: [
                    'ID',
                    'email',
                    'name',
                    [db.sequelize.fn('SUM', db.sequelize.col('Orders.OrderItems.donGia')), 'totalPrice'],
                ],
                include: [
                    {
                        model: db.Order,
                        where: { trangThaiDH: 1 },
                        include: [
                            {
                                model: db.OrderItem,
                                attributes: [],
                            },
                        ],
                        attributes: [],
                    },
                ],
                group: ['ID', 'email', 'name'],
            });

            res.status(200).json(totalAmounts);
        } catch (error) {
            console.log(error);
        }
    }

    // [GET] user/staff
    async getStaff(req, res) {
        try {
            const save = await db.User.findAll({ where: { roleId: 2 } });
            res.status(200).json(save);
        } catch (error) {
            console.log(error);
        }
    }

    // [GET] user/:id
    async getUser(req, res) {
        try {
            const User = await db.User.findOne({
                where: { ID: req.params.id },
            });

            res.status(200).json(User);
        } catch (error) {
            console.log(error);
        }
    }

    // [PUT] /user/:id/edit
    async editUser(req, res) {
        try {
            await db.User.update(req.body.data, { where: { ID: req.params.id }, raw: true });
            res.status(200).json('edit success');
        } catch (err) {
            console.log(err);
        }
    }

    // [PUT] /user/changePassword
    async changePassword(req, res) {
        try {
            const findUser = await db.User.findOne({ where: { ID: req.params.id }, raw: true });
            const checkPassword = bcrypt.compareSync(req.body.data.currentPass, findUser.password);

            if (findUser && checkPassword) {
                var hashChangePassword = bcrypt.hashSync(req.body.data.password, salt);
                await db.User.update(
                    { password: hashChangePassword },
                    {
                        where: { ID: req.params.id },
                        raw: true,
                    },
                );
                res.status(200).json({ errCode: 0, message: 'change password success' });
            } else {
                res.status(500).json({ errCode: 1, message: 'Mật khẩu hiện tại không chính xác !' });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    // [POST] /user/register
    async Register(req, res, next) {
        try {
            //check email
            let chekUserEmail = async (userEmail) => {
                try {
                    let user = await db.User.findOne({
                        where: { email: userEmail },
                    });
                    if (user) {
                        return true;
                    } else {
                        return false;
                    }
                } catch (e) {
                    console.log(e);
                }
            };

            let isEmailExist = await chekUserEmail(req.body.data.email);
            var hashPasswordRigister = bcrypt.hashSync(req.body.data.password, salt);

            if (!isEmailExist) {
                await db.User.findOne({
                    order: [['id', 'DESC']],
                    raw: true,
                }).then((latesCourse) => {
                    // id tự tăng
                    req.body.ID = latesCourse.ID + 1;
                    req.body.data.password = hashPasswordRigister;
                    const newUser = new db.User(req.body.data);
                    newUser
                        .save()
                        .then(() => res.status(200).json('register success'))
                        .catch(() => res.status(500).json());
                });
            } else {
                res.status(500).json({ errCode: 1, message: 'Email đã tồn tại !' });
            }
        } catch (error) {
            console.log(error);
        }
    }

    // [DELETE] user/:id/Customer
    async DelCustomer(req, res) {
        try {
            await db.User.destroy({
                where: { ID: req.params.id },
            });
            await db.order.destroy({
                where: { maKH: req.params.id },
            });
            const Order = await db.order.findOne({
                where: { maKH: req.params.id },
                raw: true,
            });
            await db.orderitem.destroy({
                where: { orderID: Order.ID },
            });

            res.status(200).json(deleteCustomer);
        } catch (error) {
            console.log(error);
        }
    }

    async statusClient(req, res) {
        try {
            await db.User.update(
                { status: req.body.status },
                {
                    where: { ID: req.params.id },
                },
            );
            res.status(200).json({
                errCode: 0,
                message: req.body.status === 1 ? 'Mở tài khoản thành công' : 'Khóa tài khoản thành công',
            });
        } catch (error) {
            console.log(error);
        }
    }

    // [POST] user/login
    async handleLogin(req, res, next) {
        let email = req.body.email;
        let password = req.body.password;

        if (!email || !password) {
            return res.status(500).json({
                errCode: 1,
                message: 'Missing inputs parameter !',
            });
        }

        let handleUserLogin = (Email, Password) => {
            return new Promise(async (resolve, reject) => {
                try {
                    let userData = {};
                    let isExist = await chekUserEmail(Email);

                    if (isExist) {
                        let user = await db.User.findOne({
                            where: { email: Email, status: 1 },
                            raw: true,
                        });

                        // check user có tồn tại hay không
                        if (user) {
                            let getUser = {
                                id: user.ID,
                                email: user.email,
                                name: user.name,
                                roleId: user.roleId,
                                image: user.image,
                            };

                            // check hasdPassword in database
                            let checkPassword = bcrypt.compareSync(Password, user.password);
                            if (checkPassword) {
                                userData.errCode = 0;
                                userData.errMessage = 'OK';
                                userData.user = getUser;

                                // JWT token
                                let roles = await db.GroupRole.findOne({
                                    where: { id: user.roleId },
                                    include: [{ model: db.Role }],
                                });

                                let payload = {
                                    email: user.email,
                                    roles,
                                    getUser,
                                };

                                let token = createJWT(payload);
                                // set cookie
                                res.cookie('jwt', token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
                                return res.status(200).json({
                                    errCode: userData.errCode,
                                    message: userData.errMessage,
                                    user: userData.user ? userData.user : {},
                                    DT: { access_token: token, roles, getUser },
                                });
                            } else {
                                userData.errCode = 3;
                                userData.errMessage = 'Tài khoản hoặc mật khẩu không chính xác';
                                return res.status(500).json({
                                    errCode: userData.errCode,
                                    message: userData.errMessage,
                                });
                            }
                        } else {
                            userData.errCode = 2;
                            userData.errMessage = `Tài khoản của bạn đã bị khóa`;
                            return res.status(500).json({
                                errCode: userData.errCode,
                                message: userData.errMessage,
                            });
                        }
                    } else {
                        userData.errCode = 1;
                        userData.errMessage = `your's email isn't exist in your system`;
                        return res.status(500).json();
                    }
                } catch (e) {
                    reject(e);
                }
            });
        };

        //check email
        let chekUserEmail = async (userEmail) => {
            try {
                let user = await db.User.findOne({
                    where: { email: userEmail },
                });

                if (user) {
                    return true; // return
                } else {
                    return res.status(500).json({
                        errCode: 4,
                        message: 'Email is incorrect !',
                    });
                }
            } catch (e) {
                return e;
            }
        };

        let userData1 = await handleUserLogin(email, password);
    }

    // /updatePass
    async updatePass(req, res) {
        try {
            if (!req.body.password) {
                return res.status(500).json({
                    errCode: 1,
                    message: 'Vui lòng nhập mật khẩu mới !',
                });
            } else if (req.body.password && req.body.password.length < 6) {
                return res.status(500).json({
                    errCode: 2,
                    message: 'Vui lòng nhập ít nhất 6 ký tự !',
                });
            } else if (req.body.password && req.body.password.length >= 6) {
                var hashPasswordRigister = bcrypt.hashSync(req.body.password, salt);
                await db.User.update(
                    { password: hashPasswordRigister },
                    {
                        where: { ID: req.body.user.id },
                        raw: true,
                    },
                );
                return res.status(200).json({
                    errCode: 0,
                    message: 'Đặt lại mật khẩu thành công !',
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    // /confirmOTP
    async confirmOTP(req, res) {
        try {
            const user = await db.User.findOne({
                where: { ID: req.body.user.id },
            });

            if (user && user.maOTP === req.body.OTP) {
                await db.User.update(
                    { maOTP: '' },
                    {
                        where: { ID: req.body.user.id },
                        raw: true,
                    },
                );
                res.status(200).json('Success');
            } else {
                return res.status(500).json({
                    errCode: 1,
                    message: 'Mã OTP không chính xác  !',
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    // /resetOTP
    async resetOTP(req, res) {
        try {
            await db.User.update(
                { maOTP: '' },
                {
                    where: { ID: req.body.user.id },
                    raw: true,
                },
            );
        } catch (error) {
            console.log(error);
        }
    }

    // /sendEmail
    async sendEmail(req, res, next) {
        var maOTP = Math.floor(Math.random() * (999999 - 100000)) + 100000;
        if (req.body.options === 'email') {
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
                from: '"Cửa hàng bán đồ nội thất" <phamquangduc110@gmail.com>', // sender address
                to: `${req.body.user.email}`, // list of receivers
                subject: `${maOTP} là mã khôi phục tài khoản Facebook của bạn`, // Subject line
                text: 'Hello world?', // plain text body
                // html body
                html: `
                <div style="width: 400px">
                    <h2>Xin chào bạn ${req.body.user.name}</h2>
                    <p style="font-size: 16px">
                        Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu của bạn.
                        Nhập mã đặt lại mật khẩu sau đây: <b>${maOTP}</b>
                    </p>
                    <div style="font-size: 16px">
                        Ngoài ra, bạn có thể thay đổi trực tiếp mật khẩu của mình.
                        <a href="http://localhost:3000/Login/PassWordNew">Click me</a>
                    </div>
                </div>
                `,
            });
        } else if (req.body.options === 'phoneNumber') {
            console.log('phoneNumber = ', maOTP);
        } else {
            return res.status(500).json({
                errCode: 1,
                message: 'Vui lòng chọn phương thức !',
            });
        }

        if (res.statusCode && res.statusCode === 200) {
            await db.User.update(
                { maOTP: maOTP },
                {
                    where: { ID: req.body.user.id },
                    raw: true,
                },
            );
        }

        res.status(200).json(' success');
    }

    // [POST] addUsers
    async addUsers(req, res, next) {
        const userAlls = await db.User.findAll({
            attributes: ['email'],
            raw: true,
        });

        const convertToNewData = await Promise.all(
            req.body.listUsers.map(async (user) => {
                const hashedPassword = bcrypt.hashSync(user.password, salt);
                return {
                    email: user.email,
                    password: hashedPassword,
                    name: user.surName + ' ' + user.name,
                    roleId: user.groupRole,
                    ngaySinh: user.ngaySinh,
                    thangSinh: user.thangSinh,
                    namSinh: user.namSinh,
                    gioiTinh: user.sex,
                    image: user.image,
                };
            }),
        );

        const checkEmail = convertToNewData.filter(({ email: email1 }) =>
            userAlls.some(({ email: email2 }) => email1 === email2),
        );

        if (checkEmail.length === 0) {
            await db.User.bulkCreate(convertToNewData);
            res.status(200).json({ errCode: 0, message: 'Thêm người dùng thành công' });
        } else {
            res.status(500).json({ errCode: 1, message: `${checkEmail[0].email} email đã tồn tại !` });
        }
    }

    //[GET] /account
    async getAccount(req, res, next) {
        return res.status(200).json({
            errCode: 0,
            DT: { access_token: req.token, roles: req.userData.roles, getUser: req.userData.getUser },
        });
    }

    async handleLogout(req, res) {
        try {
            res.clearCookie('jwt');
            return res.status(200).json({
                EM: 'clear cookie done',
                EC: 0,
                DT: '',
            });
        } catch (error) {
            console.log(error);
        }
    }

    async statisticCustomers(req, res, next) {
        try {
            const totalAmounts = await db.User.findAll({
                where: { roleId: 1 },
                attributes: [
                    'ID',
                    'email',
                    'name',
                    'status',
                    [
                        db.Sequelize.literal(
                            '(SELECT SUM(`OrderItem`.`donGia`) FROM `Order` INNER JOIN `OrderItem` ON `Order`.`ID` = `OrderItem`.`OrderID` WHERE `Order`.`maKH` = `User`.`ID` AND `Order`.`trangThaiDH` = 1 )',
                        ),
                        'totalPrice',
                    ],
                ],
                group: ['ID', 'email', 'name'],
                order: [[db.Sequelize.literal('totalPrice'), 'DESC']],

                limit: req.body.statisticCustomer === '2 khách hàng có tiền hàng lớn nhất' ? 2 : null,
            });

            res.status(200).json(totalAmounts);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new UserController();
