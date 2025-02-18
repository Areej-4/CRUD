
import cookieParser from 'cookie-parser';
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoute from './routes/userroutes.js';
import jwt from 'jsonwebtoken';
import UserModel from './models/UserSchema.js';
import bcrypt from 'bcrypt';

dotenv.config();
const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(cookieParser());
app.use("/", userRoute);

mongoose.connect('mongodb://127.0.0.1:27017/crud');

const authenticateJWT = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.SECRETKEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.get("/authstatus",authenticateJWT, (req, res) => {
  res.status(200).json({authenticated: true,user:req.user});
});

app.get("/profile",authenticateJWT,(req, res) => {
  res.json({ email: req.user.email });
});


app.get("/",authenticateJWT, (req, res) => {
  UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

app.get("/getUser/:id",authenticateJWT,(req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

app.put("/updateUser/:id",authenticateJWT, async (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;

  let updatedFields = { name, email };

  UserModel.findByIdAndUpdate({ _id: id }, updatedFields, { new: true })
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

app.put("/updatePassword/:id",authenticateJWT,async (req, res) => {
  const id = req.params.id;
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err });
  }
});

app.delete("/deleteUser/:id",authenticateJWT,(req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({ _id: id })
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

app.post("/createUser",authenticateJWT, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({ name, email, password: hashedPassword });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err });
  }
});

app.listen(3001, () => {
  console.log("Server is Listening on port 3001");
});
















































// app.use(session({
//   secret: process.env.SECRETKEY,
//   resave: false,
//   saveUninitialized: false,
//   store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/crud' }),
//   cookie: { 
//     maxAge: 1000 * 60 * 60, // 1 hour
//     httpOnly: true, // Helps prevent XSS attacks
//     // secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
//     // sameSite: 'lax' // Helps with CSRF protection
//   }
// }));



// app.use(session({
//   secret: process.env.SECRETKEY, // Use a secret from environment variables
//   resave: false,
//   saveUninitialized: false,
//   cookie: { secure: false } // Set secure to true if using HTTPS
// }));


// app.get("/sessioncheck", (req, res) => {
//   if (req.session.userId) {
//     UserModel.findById(req.session.userId)
//       .then(user => res.json({ user }))
//       .catch(err => res.status(500).json({ message: "Failed to retrieve user", error: err.message }));
//   } else {
//     res.status(401).json({ message: "No active session" });
//   }
// });



// const isAuthenticated = (req, res, next) => {
//   if (req.session.userId) {
//     next();
//   } else {
//     res.status(401).json({
//       message: "Unauthorized"
//     });
//   }
// };




