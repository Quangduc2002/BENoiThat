const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

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

router.get('/getTrash', productController.getProductTrash);
router.get('/:id/getRating', productController.getRating);
router.put('/:id/rating', productController.rating);
router.put('/trash', productController.trash);
router.put('/deleteAll', productController.deleteAll);
router.put('/:id/delete', productController.delete);
router.put('/:id/edit', upload.single('image'), productController.edit);
router.get('/:id/ProductType', productController.getProducttype);
router.get('/:id', productController.getIdProduct);
router.post('/add', upload.single('image'), productController.addProduct);
router.get('/', productController.getProduct);

module.exports = router;
