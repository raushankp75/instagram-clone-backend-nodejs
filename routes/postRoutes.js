const express = require('express');
const router = express.Router();



// import controller
const { createPost, getAllPost, getMyPost } = require('../controllers/postController');


// import authentication middleware
const { isAuthenticated } = require('../middleware/loginAuthentication');



// auth routes - // /post/
router.post('/create', isAuthenticated, createPost);
router.get('/all', isAuthenticated, getAllPost);
router.get('/my', isAuthenticated, getMyPost);


module.exports = router;