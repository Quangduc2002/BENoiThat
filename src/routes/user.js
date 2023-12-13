const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// add image
const multer = require('multer');
// add image vào folder
const storage = multer.diskStorage({
    destination: (req, file, res) => {
        // đường link lưu image
        res(null, '../banhang/public/Image');
    },

    filename: (req, file, res) => {
        res(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

router.post('/resetOTP', userController.resetOTP);
router.post('/updatePass', userController.updatePass);
router.post('/confirmOTP', userController.confirmOTP);
router.post('/sendEmail', userController.sendEmail);
router.post('/findUser', userController.findUser);
router.put('/:id/changePassword', userController.changePassword);
router.get('/Staff', userController.getStaff);
router.get('/Customer', userController.getCustomer);
router.put('/:id/edit', upload.single('image'), userController.editUser);
router.get('/:id', userController.getUser);
router.delete('/:id/Customer', userController.DelCustomer);
router.post('/register', userController.Register);
router.post('/login', userController.handleLogin);
router.get('/', userController.getAllUser);

module.exports = router;
