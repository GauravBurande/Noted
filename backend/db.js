const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;
// const MONGODB_URI = process.env.MONGODB_URI;

const connectToMongo  = ()=>{
    mongoose.connect(MONGODB_URI, ()=>{
        console.log('connected to mongo.')
    })
}

module.exports = connectToMongo;
