require('dotenv').config();
const jwt = require('jsonwebtoken');
// tạo token

//path không bắt check
const nonSecurePaths = ['/login', '/register', '/findUser', '/sendEmail', '/confirmOTP', '/updatePass'];
const createJWT = (payload) => {
    let key = process.env.JWT_SECRET;
    let token = null;
    try {
        token = jwt.sign(payload, key, { expiresIn: process.env.JWT_EXPIRESIN });
    } catch (error) {
        console.log(error);
    }

    return token;
};

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let decoded = null;
    try {
        decoded = jwt.verify(token, key);
    } catch (error) {
        console.log(error);
    }
    return decoded;
};

const extractToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
};

const checkUserJWT = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) return next();
    let cookies = req.cookies;
    let tokenFromHeader = extractToken(req);

    if ((cookies && cookies.jwt) || tokenFromHeader) {
        let token = cookies && cookies.jwt ? cookies.jwt : tokenFromHeader;
        let decoded = verifyToken(token);
        if (decoded) {
            req.userData = decoded;
            req.token = token;
            next();
        } else {
            return res.status(401).json({
                EC: -1,
                DT: '',
                EM: 'Chưa xác thực người dùng',
            });
        }
    } else {
        return res.status(401).json({
            EC: -1,
            DT: '',
            EM: 'Chưa xác thực người dùng',
        });
    }
};

const checkUserPermission = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) return next();
    if (req.user) {
        let email = req.user.email;
        let roles = req.user.roles.Roles;
        // lấy dường dẫn
        let currentUrl = req.path;
        if (!roles || roles.length === 0) {
            return res.status(403).json({
                EC: -1,
                DT: '',
                EM: 'Người dùng không có quyền truy cập',
            });
        }
        let canAcess = roles.some((item) => item.url === currentUrl);
        if (canAcess === true) {
            next();
        } else {
            return res.status(403).json({
                EC: -1,
                DT: '',
                EM: 'Người dùng không có quyền truy cập',
            });
        }
    } else {
        return res.status(401).json({
            EC: -1,
            DT: '',
            EM: 'Chưa xác thực người dùng',
        });
    }
};

module.exports = { createJWT, verifyToken, checkUserJWT, checkUserPermission };
