const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const { addCostumer, deleteCostumer, getCostumerById, getCostumersByUpline, getCostumerByName, updateCostumer } = require('../controllers/costumerController');

router.post('/add', authenticate, addCostumer);
router.delete('/delete/:id', authenticate, deleteCostumer);
router.get('/getcostumer/:id', authenticate, getCostumerById);
router.get('/getcostumerbyupline/:id_upline', authenticate, getCostumersByUpline);
router.get('/getcostumerbyname/:name', authenticate, getCostumerByName);
router.put('/update/:id', authenticate, updateCostumer); // New route for updating customer

module.exports = router;
