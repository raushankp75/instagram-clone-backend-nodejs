const User = require('../models/userModel');
require('dotenv').config();
const bcrypt = require('bcrypt')


const signup = async (req, res) => {
    // res.json('Data posted successfully')
    // console.log(req.body.name)

    const { name, email, password, role } = req.body;

    // if these not available
    if (!name || !email || !password) {
        return res.status(422).json({ error: 'Please add all the fields' })
    }

    // if user has same email
    // User.findOne({ $or: [{email: email}, {userName: userName}] })
    User.findOne({ email: email })
        .then(async (savedUser) => {
            console.log(savedUser)
            if (savedUser) {
                return res.status(422).json({ error: 'User already exist with this email.' })
            }

            // hashing password before saving in db
            bcrypt.hash(password, 12).then(async (hashedPassword) => {
                // create these fields in database
                const user = await User.create({
                    name,
                    email,
                    password: hashedPassword,
                    role
                })

                    // if success 
                    .then(user => {
                        res.status(200).json({
                            success: true,
                            message: 'Signup Successfully!',
                            user
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
        })
}



module.exports = { signup }