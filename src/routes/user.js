const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const { checkUserJWT, checkUserPermission } = require('../middleware/JWTAction');
// add image
const multer = require('multer');
// add image vào folder
// const storage = multer.diskStorage({
//     destination: (req, file, res) => {
//         // đường link lưu image
//         res(null, 'uploads/');
//     },

//     filename: (req, file, res) => {
//         res(null, file.originalname);
//     },
// });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    },
});

const upload = multer({ storage: storage });

router.all('*', checkUserJWT);
router.put('/:id/client', userController.statusClient);
router.post('/statistic', userController.statisticCustomers);
router.get('/logout', userController.handleLogout);
router.get('/account', userController.getAccount);
router.post('/addUsers', userController.addUsers);
router.post('/resetOTP', userController.resetOTP);
router.post('/updatePass', userController.updatePass);
router.post('/confirmOTP', userController.confirmOTP);
router.post('/sendEmail', userController.sendEmail);
router.post('/findUser', userController.findUser);
router.put('/:id/changePassword', userController.changePassword);
router.get('/Staff', userController.getStaff);
router.get('/Customer', userController.getCustomer);
router.put('/:id/edit', userController.editUser);
router.get('/:id', userController.getUser);
router.delete('/:id/Customer', userController.DelCustomer);
router.post('/register', userController.Register);
router.post('/login', userController.handleLogin);
router.get('/', userController.getAllUser);

module.exports = router;
