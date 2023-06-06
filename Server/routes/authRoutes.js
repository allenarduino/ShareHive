const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Signup route
router.post('/signup', authController.register);

// Login route
router.post('/login', authController.login);

module.exports = router;
