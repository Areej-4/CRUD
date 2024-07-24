import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoute from './routes/userroutes.js';
import bcrypt from 'bcrypt';
import UserModel from './models/UserSchema.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", userRoute);

mongoose.connect('mongodb://127.0.0.1:27017/crud', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to the database");
}).catch((error) => {
  console.error("Database connection error:", error);
});

app.get("/", (req, res) => {
  UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

app.put("/updateUser/:id", async (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;

  let updatedFields = { name, email };

  UserModel.findByIdAndUpdate({ _id: id }, updatedFields, { new: true })
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

app.put("/updatePassword/:id", async (req, res) => {
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

app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({ _id: id })
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

app.post("/createUser", async (req, res) => {
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
