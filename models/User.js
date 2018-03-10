const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,

    subscribeToEmails: { type: Boolean, default: true },
    profile: {
        firstName: String,
        lastName:String,
        gender: { type: String, enum: ['male', 'female'] },
        address: {
            street: { type: String, default: "" },
            street2: { type: String, default: "" },
            city: { type: String, default: "" },
            state: { type: String, default: "" },
            zip: { type: Number, default: "" },
            country: { type: String, default: "" }
        }
    },

}, { timestamps: true })

module.exports = mongoose.model('User', userSchema);