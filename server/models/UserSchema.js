const mongoose = require("mongoose")
const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:[5,'min length of name must be 5 characters'],
        maxlength:[100,'max length of name must be 100 characters']
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:[6,'min length of name must be 6 characters'],
        maxlength:[100,'max length of name must be 100 characters']
    }
})
const UserModel=mongoose.model('users',UserSchema)
module.exports = UserModel