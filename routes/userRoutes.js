const express = require('express');
const router = express.Router();



// import controller
const { getSingleUser, follow, unfollow } = require('../controllers/userController');



// import authentication middleware
const { isAuthenticated } = require('../middleware/loginAuthentication');



// auth routes - // /user/
router.get('/:id', getSingleUser);
router.put('/follow', isAuthenticated, follow);
router.put('/unfollow', isAuthenticated, unfollow);

module.exports = router;