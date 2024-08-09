const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Todo'
    }],
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: String
})

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel