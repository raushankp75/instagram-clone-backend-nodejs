const express = require('express');
const router = express.Router();



// import controller
const { like, unLike } = require('../controllers/likesController');



// auth routes - // /api/
router.post('/like', like);
router.post('/unLike', unLike);

module.exports = router;