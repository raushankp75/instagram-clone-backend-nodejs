const Post = require('../models/postModel');

require('dotenv').config();


const createPost = async (req, res) => {
    // //  console.log("Hello post create")

    // const { title, content } = req.body;

    // if (!title) {
    //     return res.status(422).json({ error: 'Please add title of your post' })
    // }
    // if (!content) {
    //     return res.status(422).json({ error: 'Please add content of your post' })
    // }
    // // req.user
    // // res.json('ok')

    // const post = await Post.create({
    //     title,
    //     content,
    //     postedBy: req.user
    // })
    //     .then((post) => {
    //         return res.status(200).json({
    //             success: true,
    //             message: 'Post created successfully',
    //             post
    //         })
    //     }).catch(err => {
    //         console.log(err)
    //     })





    // const { title, content, pic } = req.body;
    const { createPost, pic } = req.body;

    console.log(createPost)
    console.log(pic)
    const { title, content } = createPost;


    if (!title || !content) {
        return res.status(422).json({ error: 'Please add all the fields' })
    }

    try {
        const post = await Post.create({
            title,
            content,
            image: pic,
            postedBy: req.user
        })

        // if success
        res.status(200).json({
            success: true,
            message: 'Post created successfully',
            post
        })
    } catch (error) {
        console.log(error)
    }
}



const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).populate('postedBy', '_id name');
        res.status(200).json({
            success: true,
            message: 'Post fetched successfully',
            posts
        })
    } catch (error) {
        console.log(error)
    }
}


// like get single post
const getMyPost = async (req, res) => {
    try {
        const post = await Post.find({ postedBy: req.user._id }).populate('postedBy', '_id name')
        res.status(200).json({
            success: true,
            message: 'My post fetched successfully',
            post
        })
    } catch (error) {
        console.log(error)
    }
}



// user id come from middleware authentication
const like = async (req, res) => {
    try {
        const result = await Post.findByIdAndUpdate(req.body.postId, {
            $push: { likes: req.user._id }
        }, {
            new: true
        })
        res.status(200).json({
            // success: true,
            // message: 'Like successfully',
            // like
            // result: req.user._id
        })
    } catch (error) {
        console.log(error)
    }
}



const unLike = async (req, res) => {
    try {
        const result = await Post.findByIdAndUpdate(req.body.postId, {
            $pull: { likes: req.user._id }
        }, {
            new: true
        })
        res.status(200).json({
            // success: true,
            // message: 'Like successfully',
            // like
            // result: req.user._id


        })
    } catch (error) {
        console.log(error)
    }
}





// const like = async (req, res) => {
//     Post.findByIdAndUpdate(req.body.postId, {
//         $push: { likes: req.user._id }
//     }, {
//         new: true
//     }).populate("postedBy", "_id name image")
//         .exec((err, result) => {
//             if (err) {
//                 return res.status(422).json({ error: err })
//             } else {
//                 res.json(result)
//             }
//         })
// }



// const unLike = async (req, res) => {
//     Post.findByIdAndUpdate(req.body.postId, {
//         $pull: { likes: req.user._id }
//     }, {
//         new: true
//     }).populate("postedBy", "_id name image")
//         .exec((err, result) => {
//             if (err) {
//                 return res.status(422).json({ error: err })
//             } else {
//                 res.json(result)
//             }
//         })

// }




const addComment = async (req, res) => {
    const { text } = req.body;

    if(!text){
        return res.status(422).json({ error: 'Please write your comment' })
    }

    console.log(req.body, 192)
    try {
        const postComment = await Post.findByIdAndUpdate(req.params.id, {
            $push: { comments: { text, postedBy: req.user._id } }
        },
            { new: true }
        ).populate('comments.postedBy', '_id name')
        res.status(200).json({
            success: true,
            message: 'Comment added successfully',
            postComment
        })

    } catch (error) {
        console.log(error)
    }

}





// const addComment = async (req, res) => {
//     const comment = {
//         // comment: req.body.text,
//         text,
//         postedBy: req.user._id
//     }

//     console.log(req.body, 192)
//     try {
//         const postComment = await Post.findByIdAndUpdate(req.body.postId, {
//             $push: { comments: { comment } }
//         },
//             { new: true }
//         )
//         res.status(200).json({
//             success: true,
//             message: 'Comment added successfully',
//             postComment
//         })

//     } catch (error) {
//         console.log(error)
//     }
// }




module.exports = { createPost, getAllPost, getMyPost, like, unLike, addComment }