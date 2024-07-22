const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true, // Enforce uniqueness for the name field
        minlength: [5, 'min length of name must be 5 characters'],
        maxlength: [15, 'max length of name must be 15 characters']
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true // Enforce uniqueness for the email field
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [6, 'min length of password must be 6 characters']
        // maxlength: [12, 'max length of password must be 12 characters'] // Remove maxlength constraint
    }
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
