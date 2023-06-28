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

    // validation
    if (!name || !email || !password) {
        return res.status(422).json({ error: 'Please add all the fields' })
    }

    try {
        // if user has same email
        const savedUser = await User.findOne({ email: email });
        if (savedUser) {
            return res.status(400).json({ error: 'User already exist with this email.' })
        }

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
    // const { email, password } = req.body;

    // //    Validation
    // if (!email) {
    //     return res.status(403).json({ error: 'Please enter email' });
    // }
    // if (!password) {
    //     return res.status(403).json({ error: 'Please enter password' });
    // }

    // // checking for email is available or not in DB
    // User.findOne({ email: email })
    //     .then((savedUser) => {
    //         if (!savedUser) {
    //             return res.status(422).json({ error: 'Invalid email' })
    //         }

    //         // checking for password is available or not in DB
    //         bcrypt.compare(password, savedUser.password)
    //             .then((match) => {
    //                 if (match) {

    //                     // return res.status(200).json({message: 'Signin Successfully!'})

    //                     // sending token to the user
    //                     const token = jwt.sign({ _id: savedUser.id }, process.env.JWT_SECRET, { expiresIn: '2h' })
    //                     // res.json(token);
    //                     return res.status(200).json({
    //                         success: true,
    //                         message: 'Login successfully',
    //                         token, role: savedUser.role,
    //                         email: savedUser.email
    //                     });
    //                     // console.log(token);
    //                 } else {
    //                     return res.status(422).json({ error: 'Invalid password' })
    //                 }
    //             })
    //             .catch((err) => {
    //                 console.log(err)
    //             })
    //     })








    const { email, password } = req.body;


    //    Validation
    if (!email) {
        return res.status(422).json({ error: 'Please enter email' });
    }
    if (!password) {
        return res.status(422).json({ error: 'Please enter password' });
    }

    try {
        // checking for email is available or not in DB
        const savedUser = await User.findOne({ email });
        if (!savedUser) {
            return res.status(400).json({ error: 'User is not registered with this email' })
        }
        // checking for password is available or not in DB
        // console.log(savedUser.password)
        const match = await bcrypt.compare(password, savedUser.password);
        if (!match) {
            return res.status(400).json({ error: 'Invalid credentials' })
        } else {
            // sending token to the user
            const token = jwt.sign({ _id: savedUser.id }, process.env.JWT_SECRET, { expiresIn: '2h' })
            const { _id, name, email } = savedUser
            console.log({ token, user: { _id, name, email } })
            return res.status(200).json({
                success: true,
                message: 'Login successfully',
                token,
                role: savedUser.role,
                user: { _id, name, email }
                // email: savedUser.email
            });
            // console.log(token);
        }

    } catch (error) {
        console.log(error)
    }

}




const loginWithGoogle = async (req, res) => {
    const { email_verified, email, name, clientId, image } = req.body

    if (email_verified) {
        try {
            // checking for email is available or not in DB
            const savedUser = await User.findOne({ email });

            if (savedUser) {
                // sending token to the user
                const token = jwt.sign({ _id: savedUser.id }, process.env.JWT_SECRET, { expiresIn: '2h' })
                const { _id, name, email } = savedUser
                console.log({ token, user: { _id, name, email } })
                // return res.status(200).json({
                //     success: true,
                //     message: 'Login successfully',
                //     token,
                //     // role: savedUser.role,
                //     user: { _id, name, email }
                // });
            } else {
                const password = email + clientId

                const user = await User.create({
                    name,
                    email,
                    password: password,
                    image,
                    // role
                })


                // if success
                let userId = user._id.toString()
                const token = jwt.sign({ _id: userId }, process.env.JWT_SECRET, { expiresIn: '2h' })
                const { _id, name, email } = user
                console.log({ token, user: { _id, name, email } })
                return res.status(200).json({
                    success: true,
                    message: 'Login successfully',
                    token,
                    // role: savedUser.role,
                    user: { _id, name, email }
                });


                // // if success
                // res.status(200).json({
                //     success: true,
                //     message: 'Signup Successfully!',
                //     user

                // })
            }

        } catch (error) {
            console.log(error)
        }
    }
}



module.exports = { signup, signin, loginWithGoogle }