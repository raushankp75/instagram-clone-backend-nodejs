const Post = require('../models/postModel');

require('dotenv').config();


const create = async (req, res) => {
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
    

    if (!title || !content || !pic) {
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
    } catch(error) {
        console.log(error)
    }
}


module.exports = { create }