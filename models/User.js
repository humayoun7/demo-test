const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{type: String},
    phone:{type:String},
    email:{type:String},
    facebookId:{type:String}

}, { timestamps: true })

module.exports = mongoose.model('User', userSchema);