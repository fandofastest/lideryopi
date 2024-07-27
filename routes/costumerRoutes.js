const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const upload = require('../middleware/multerConfig');
const { addCostumer, addImageToCostumer, deleteCostumer, getCostumerById, getCostumersByUpline, getCostumerByName, updateCostumer } = require('../controllers/costumerController');

// Route to add customer without image
router.post('/add', authenticate, addCostumer);

// Route to upload image and associate it with an existing customer
router.post('/addimage/:id', authenticate, upload.single('image'), addImageToCostumer);

router.delete('/delete/:id', authenticate, deleteCostumer);
router.get('/getcostumer/:id', authenticate, getCostumerById);
router.get('/getcostumerbyupline/:id_upline', authenticate, getCostumersByUpline);
router.get('/getcostumerbyname/:name', authenticate, getCostumerByName);
router.put('/update/:id', authenticate, updateCostumer);

module.exports = router;
