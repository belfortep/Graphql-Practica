const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect('mongodb://localhost/blogdb')
    console.log('DB conectada')
}

module.exports = { connectDB }