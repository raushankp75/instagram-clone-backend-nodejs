const express = require('express');
const router = express.Router();



// import controller
const { signup } = require('../controllers/authController')



// auth routes - // /api/
router.post('/signup', signup);

module.exports = router;