const User = require('../models/userModel');
require('dotenv').config();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const signup = async (req, res) => {
    // // res.json('Data posted successfully')
    // // console.log(req.body.name)

    // const { name, email, password, role } = req.body;

    // // if these not available
    // if (!name || !email || !password) {
    //     return res.status(422).json({ error: 'Please add all the fields' })
    // }

    // // if user has same email
    // // User.findOne({ $or: [{email: email}, {userName: userName}] })
    // User.findOne({ email: email })
    //     .then(async (savedUser) => {
    //         console.log(savedUser)
    //         if (savedUser) {
    //             return res.status(422).json({ error: 'User already exist with this email.' })
    //         }

    //         // hashing password before saving in db
    //         bcrypt.hash(password, 12).then(async (hashedPassword) => {
    //             // create these fields in database
    //             const user = await User.create({
    //                 name,
    //                 email,
    //                 password: hashedPassword,
    //                 role
    //             })

    //                 // if success 
    //                 .then(user => {
    //                     res.status(200).json({
    //                         success: true,
    //                         message: 'Signup Successfully!',
    //                         user
    //                     })
    //                 })
    //                 .catch(err => {
    //                     console.log(err);
    //                 })
    //         })
    //     })







    const { name, email, password, role } = req.body;

    // if these not available
    if (!name || !email || !password) {
        return res.status(422).json({ error: 'Please add all the fields' })
    }

    // if user has same email
    const savedUser = await User.findOne({ email: email });
    if (savedUser) {
        return res.status(422).json({ error: 'User already exist with this email.' })
    }

    try {
        // hashing password before saving in db
        // await bcrypt.compare(password, User.hashedPassword);
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // create these fields in database

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        })

        // if success
        res.status(200).json({
            success: true,
            message: 'Signup Successfully!',
            user
        })

    } catch (error) {
        console.log(error);
    }
}




const signin = async (req, res) => {
    const { email, password } = req.body;

    // if these not available
    if (!email || !password) {
        return res.status(422).json({ error: 'Please enter email and password' })
    }

    // checking for email is available or not in DB
    User.findOne({ email: email })
        .then((savedUser) => {
            if (!savedUser) {
                return res.status(422).json({ error: 'Invalid email' })
            }

            // checking for password is available or not in DB
            bcrypt.compare(password, savedUser.password)
                .then((match) => {
                    if (match) {

                        // return res.status(200).json({message: 'Signin Successfully!'})

                        // sending token to the user
                        const token = jwt.sign({ _id: savedUser.id }, process.env.JWT_SECRET, { expiresIn: '2h' })
                        // res.json(token);
                        return res.status(200).json({
                            success: true,
                            message: 'Login successfully',
                            token, role: savedUser.role,
                            email: savedUser.email
                        });
                        // console.log(token);
                    } else {
                        return res.status(422).json({ error: 'Invalid password' })
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        })
}



module.exports = { signup, signin }