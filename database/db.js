const mongoose = require('mongoose');
require('dotenv').config();

const DB_PORT = 27017

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log(`DATABASE IS CONNECTED ON ${DB_PORT}`))
    .catch((err) => console.log(`SOME ERROR WHILE CONNECTING TO MONGODB DATABASE ${err}`))