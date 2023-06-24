const express = require('express');
const router = express.Router();



// import controller
const { createPost, getAllPost, getMyPost, like, unLike, addComment } = require('../controllers/postController');


// import authentication middleware
const { isAuthenticated } = require('../middleware/loginAuthentication');



// auth routes - // /post/
router.post('/create', isAuthenticated, createPost);
router.get('/all', isAuthenticated, getAllPost);
router.get('/my', isAuthenticated, getMyPost);
router.put('/like', isAuthenticated, like);
router.put('/unlike', isAuthenticated, unLike);
router.put('/comment/:id', isAuthenticated, addComment);


module.exports = router;