const express = require('express');
const router = express.Router();



// import controller
const { createPost, getAllPost } = require('../controllers/postController');


// import authentication middleware
const { isAuthenticated } = require('../middleware/loginAuthentication');



// auth routes - // /post/
router.post('/create', isAuthenticated, createPost);
router.get('/all', isAuthenticated, getAllPost);


module.exports = router;