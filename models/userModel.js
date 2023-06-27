const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'First name is required'],
        maxlength: 32,
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Email id is required'],
        unique: true,
        match: [
            /^\w+([\.-]?\w)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Password is required'],
        minlength: [3, 'Password must have at least 3 character']
    },
    image: {
        type: String
    },
    followers: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ],
    following: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ],
    role: {
        type: String,
        enum: ['ADMIN', 'USER'],
        default: 'USER'
    },
    date: {
        type: Date,
        default: Date.now
    }


}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)