const express = require('express');
const cors = require('cors')
const bodyParser = require("body-parser")
const app = express();
require('dotenv').config();



// IMPORT ROUTES 
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');



// IMPORT DATABSE
require('./database/db');





// MIDDLEWARE
app.use(cors())
// app.use(express.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false, limit:'50mb' }))

// parse application/json
app.use(bodyParser.json())





// END POINT ROUTES - ROUTES MIDDLEWARE
app.use('/api', authRoutes)
app.use('/post', postRoutes)
app.use('/user', userRoutes)





// TESTING SERVER WORKING
app.get('/test', (req, res) => {
    res.status(200).json({ message: 'Testing success server running' })
})

app.get('/test1', (req, res) => {
    res.send({ code: '200', message: 'Testing success server running test1' })
})


// SERVER RUNNING ON THIS PORT
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`SERVER IS RUNNING ON http://localhost:${PORT}`));
