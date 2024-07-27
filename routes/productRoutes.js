const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const { getAllProducts, getProductById } = require('../controllers/productController');

router.get('/getall', authenticate, getAllProducts);
router.get('/getproductbyid/:id', authenticate, getProductById);

module.exports = router;
