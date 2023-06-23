const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;


const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    image: {
        type: String,
        // default: "no photo"
        require: true
    },
    // body: {
    //     type: String,
    //     required: true
    // },
    // photo: {
    //     type: String,
    //     require: true
    // },
    postedBy: {
        type: ObjectId,
        ref: 'User'
    },

}, { timestamps: true })


module.exports = mongoose.model('Post', postSchema)