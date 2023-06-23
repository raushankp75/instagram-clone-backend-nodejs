const Like = require('../models/likesModel');

require('dotenv').config();


const like = async (req, res) => {
    Like.findByIdAndUpdate(req.body.LikeId)
}



const unLike = async (req, res) => {

}


module.exports = { like, unLike }