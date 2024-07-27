const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const { update, updateStatus, getUserById, getUserByUsername } = require('../controllers/userController');

router.post('/update', authenticate, update);
router.post('/updatestatus', authenticate, updateStatus);
router.get('/getuserbyid/:id', authenticate, getUserById);
router.get('/getuserbyusername/:username', authenticate, getUserByUsername);

module.exports = router;
