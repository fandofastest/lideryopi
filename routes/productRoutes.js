const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const upload = require('../middleware/multerConfig');

const { addProduct,deleteProduct,getAllProducts, getProductById } = require('../controllers/productController');

router.get('/getall', authenticate, getAllProducts);
router.get('/getproductbyid/:id', authenticate, getProductById);
router.delete('/:id', authenticate, deleteProduct);
router.post('/add', authenticate, upload.single('image'), addProduct);


module.exports = router;
