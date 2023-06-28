const express = require('express');
const router = express.Router();



// import controller
const { signup, signin, loginWithGoogle } = require('../controllers/authController')



// auth routes - // /api/
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/loginwithgoogle', loginWithGoogle);

module.exports = router;