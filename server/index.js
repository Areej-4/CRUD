const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require('bcrypt');
const UserModel = require('./models/UserSchema');

const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/crud');

app.get("/", (req, res) => {
    UserModel.find({})
        .then(users => res.json(users))
        .catch(err => res.json(err));
});

app.get("/getUser/:id", (req, res) => {
    const id = req.params.id;
    UserModel.findById({ _id: id })
        .then(users => res.json(users))
        .catch(err => res.json(err));
});

app.put("/updateUser/:id", async (req, res) => {
    const id = req.params.id;
    const { name, email, password } = req.body;
    
    let updatedFields = { name, email };
    
    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updatedFields.password = hashedPassword;
    }

    UserModel.findByIdAndUpdate({ _id: id }, updatedFields, { new: true })
        .then(user => res.json(user))
        .catch(err => res.json(err));
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
        
        // Check for existing user with the same name or email
        const existingUser = await UserModel.findOne({ $or: [{ name }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this name or email already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // If no existing user is found, create a new user
        const newUser = await UserModel.create({ name, email, password: hashedPassword });
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err });
    }
});

app.listen(3001, () => {
    console.log("Server is Listening on port 3001");
});
