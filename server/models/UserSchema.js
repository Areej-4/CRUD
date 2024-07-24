import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: [5, 'min length of name must be 5 characters'],
    maxlength: [15, 'max length of name must be 15 characters']
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: [6, 'min length of password must be 6 characters']
  }
});

const UserModel = mongoose.model('users', UserSchema);
export default UserModel;
