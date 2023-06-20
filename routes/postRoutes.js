const express = require('express');
const router = express.Router();



// import controller
const { create } = require('../controllers/postController');


// import authentication middleware
const { isAuthenticated } = require('../middleware/loginAuthentication');



// auth routes - // /post/
router.post('/create', isAuthenticated, create);


module.exports = router;