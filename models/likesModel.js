const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const likesSchema = new mongoose.Schema({
    likes: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ]
}, { timestamps: true })

module.exports = mongoose.model('Like', postSchema)