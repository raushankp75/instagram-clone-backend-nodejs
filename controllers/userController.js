const User = require('../models/userModel');
const Post = require('../models/postModel');

require('dotenv').config();


const getSingleUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if(!user){
            return res.status(422).json({ error: 'User not found' })
        }
        const post = await Post.find({ postedBy: req.params.id }).populate('postedBy', '_id')
        res.status(200).json({
            success: true,
            user,
            post
        })

    } catch (error) {
        console.log(error)
    }



    // try {
    //     const posts = await Post.find({postedBy: req.params._id});
    //     res.status(200).send(posts);
    //   }
    //   catch (error) {
    //     res.status(500).send({error: error.message});
    //   }
}


module.exports = { getSingleUser }