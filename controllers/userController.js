const User = require('../models/userModel');
const Post = require('../models/postModel');

require('dotenv').config();



// get user profile
const getSingleUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(422).json({ error: 'User not found' })
        }
        const post = await Post.find({ postedBy: req.params.id }).populate('postedBy postedBy.comments', '_id name image')
        res.status(200).json({
            success: true,
            user,
            post
        })

    } catch (error) {
        console.log(error)
    }
}




const follow = async (req, res) => {
    try {
        const followersResult = await User.findByIdAndUpdate(req.body.followId, {
            $push: { followers: req.user._id }
        }, {
            new: true
        })

        if (!followersResult) {
            return res.status(422).json({ error: 'Not found' })
        }
        const followingResult = await User.findByIdAndUpdate(req.user._id, {
            $push: { following: req.body.followId }
        }, {
            new: true
        })

        res.status(200).json({
            success: true,
            message: 'Follow successfully',
            followingResult
        })

    } catch (error) {
        console.log(error)
    }
}



const unfollow = async (req, res) => {
    try {
        const followersResult = await User.findByIdAndUpdate(req.body.followId, {
            $pull: { followers: req.user._id }
        }, {
            new: true
        })

        if (!followersResult) {
            return res.status(422).json({ error: 'Not found' })
        }
        const followingResult = await User.findByIdAndUpdate(req.user._id, {
            $pull: { following: req.body.followId }
        }, {
            new: true
        })

        res.status(200).json({
            success: true,
            message: 'Unfollow successfully',
            followingResult
        })

    } catch (error) {
        console.log(error)
    }
}




// const profilePic = async (req, res) => {
//     try {
//         const postImg = await User.findByIdAndUpdate(req.user._id, {
//             $set: { image: req.body.pic }
//         }, {
//             new: true
//         })
//         res.status(200).json({
//             success: true,
//             message: 'Profile pic updated'
//             postImg
//         })

//     } catch (error) {
//         console.log(error)
//     }
// }

const profilePicture = async (req, res) => {
    try {
        const img = await User.findByIdAndUpdate(req.user._id, {
            $set: { image: req.body.pic }
        }, {
            new: true
        })

        res.status(200).json({
            success: true,
            message: 'Profile pic updated',
            img
        })
    } catch (error) {
        console.log(error)
    }
}


module.exports = { getSingleUser, follow, unfollow, profilePicture }