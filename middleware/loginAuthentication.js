const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const mongoose = require('mongoose')
require('dotenv').config();



exports.isAuthenticated = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'You must have logged in.' })
    }

    try {
        const token = authorization.replace('Bearer ', '')
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();

        
        // const token = authorization.replace('Bearer ', '')

        // jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        //     if (err) {
        //         return res.status(401).json({ error: 'You must have logged in.' })
        //     }
        //     const { _id } = payload
        //     User.findById(_id).then(userData => {
        //         req.user = userData
        //         // console.log(userData)
        //         next();
        //     })
        // })

        
    } catch (error) {
        return res.status(401).json({ error: 'You must have logged in.' })
    }
}