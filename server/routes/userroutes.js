import express from 'express';
import { loginUser, registerUser } from '../controller/users.js';

const userRoute = express.Router();

userRoute.route('/register').post(registerUser);
userRoute.route('/login').post(loginUser);
// userRoute.route('/logout').post(logoutUser);

export default userRoute;
