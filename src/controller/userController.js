const db = require('../models/index');

class UserController {
    // check email

    // /user
    async getAllUser(req, res, next) {
        try {
            let getUser = await db.user.findAll();
            res.status(200).json(getUser);
        } catch (error) {
            console.log(error);
        }
    }

    // [GET] user/Customer
    async getCustomer(req, res) {
        try {
            const save = await db.user.findAll({ where: { roleId: 1 } });
            res.status(200).json(save);
        } catch (error) {
            console.log(error);
        }
    }

    // [GET] user/staff
    async getStaff(req, res) {
        try {
            const save = await db.user.findAll({ where: { roleId: 2 } });
            res.status(200).json(save);
        } catch (error) {
            console.log(error);
        }
    }

    // [GET] user/:id
    async getUser(req, res) {
        try {
            const User = await db.user.findOne({
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
            req.body.image = req.file ? req.file.filename : req.body.image;
            await db.user.update(req.body, { where: { ID: req.params.id }, raw: true });
            res.status(200).json('edit success');
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // [PUT] /user/changePassword
    async changePassword(req, res) {
        try {
            const findUser = await db.user.findOne({ where: { ID: req.params.id }, raw: true });
            if (findUser && req.body.currentPass === findUser.password) {
                await db.user.update(req.body, { where: { ID: req.params.id }, raw: true });
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
                    let user = await db.user.findOne({
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

            let isEmailExist = await chekUserEmail(req.body.email);

            if (!isEmailExist) {
                await db.user
                    .findOne({
                        order: [['id', 'DESC']],
                        raw: true,
                    })
                    .then((latesCourse) => {
                        // id tự tăng
                        req.body.ID = latesCourse.ID + 1;
                        const newUser = new db.user(req.body);
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
            await db.user.destroy({
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

            res.status(200).json('delete success');
        } catch (error) {
            console.log(error);
        }
    }

    // [POST] user/login
    async handleLogin(req, res) {
        let email = req.body.email;
        let password = req.body.password;
        if (!email || !password) {
            return res.status(500).json({
                errCode: 1,
                message: 'Missing inputs parameter !',
            });
        }

        //check email
        let chekUserEmail = async (userEmail) => {
            try {
                let user = await db.user.findOne({
                    where: { email: userEmail },
                });

                if (user) {
                    return true; // return
                } else {
                    return false;
                }
            } catch (e) {
                return e;
            }
        };

        let handleUserLogin = (Email, Password) => {
            return new Promise(async (resolve, reject) => {
                try {
                    let userData = {};
                    let isExist = await chekUserEmail(Email);

                    if (isExist) {
                        let user = await db.user.findOne({
                            where: { email: Email },
                            raw: true,
                        });
                        // check user có tồn tại hay không
                        if (user) {
                            //compare password
                            let getUser = {
                                id: user.ID,
                                email: user.email,
                                name: user.name,
                                roleId: user.roleId,
                                image: user.image,
                            };

                            if (Password === user.password) {
                                userData.errCode = 0;
                                userData.errMessage = 'OK';
                                userData.user = getUser;
                                return res.status(200).json({
                                    errCode: userData.errCode,
                                    message: userData.errMessage,
                                    user: userData.user ? userData.user : {},
                                });
                            } else {
                                userData.errCode = 3;
                                userData.errMessage = 'Wrong password';
                                return res.status(500).json();
                            }
                        } else {
                            userData.errCode = 2;
                            userData.errMessage = `User's not found`;
                            return res.status(500).json();
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

        res.cookie('jwt', 'test cookie');

        let userData1 = await handleUserLogin(email, password);
    }
}

module.exports = new UserController();
