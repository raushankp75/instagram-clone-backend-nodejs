const express = require('express');
const router = express.Router();



// import controller
const { signup, signin } = require('../controllers/authController')



// auth routes - // /api/
router.post('/signup', signup);
router.post('/signin', signin);

module.exports = router;