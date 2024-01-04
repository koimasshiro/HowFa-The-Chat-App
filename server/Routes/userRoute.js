const express = require('express');
const { registerUser, loginUser, getAllUsers } = require('../Controllers/userController');
const { protect } = require('../Middlewares/AuthMiddleware');

const router = express.Router();

router.post('/login', loginUser);
router.route('/').post(registerUser).get(protect, getAllUsers);

module.exports = router;