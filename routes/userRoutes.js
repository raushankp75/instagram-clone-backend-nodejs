const express = require('express');
const router = express.Router();



// import controller
const { getSingleUser } = require('../controllers/userController');



// auth routes - // /user/
router.get('/:id', getSingleUser);

module.exports = router;