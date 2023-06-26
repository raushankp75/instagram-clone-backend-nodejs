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
    likes: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ],
    comments: [
        {
            text: String,
            created: {
                type: Date,
                default: Date.now
            },
            postedBy: {
                type: ObjectId,
                ref: 'User'
            }
        }
    ],
    postedBy: {
        type: ObjectId,
        ref: 'User'
    }

}, { timestamps: true })


module.exports = mongoose.model('Post', postSchema)