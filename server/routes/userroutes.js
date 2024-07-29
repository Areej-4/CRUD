import express from 'express';
import { loginUser, registerUser, signoutUser } from '../controller/users.js';

const userRoute = express.Router();

userRoute.route('/register').post(registerUser);
userRoute.route('/login').post(loginUser);
userRoute.route('/signout').post(signoutUser);

export default userRoute;

