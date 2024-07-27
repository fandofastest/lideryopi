const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const { getAllLevels, getLevelById } = require('../controllers/levelController');

router.get('/getall', authenticate, getAllLevels);
router.get('/getlevelbyid/:id', authenticate, getLevelById);

module.exports = router;
