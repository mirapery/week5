const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
app.use(express.json());

// Define a Mongoose schema for the user
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
});

// Create a Mongoose model based on the schema
const User = mongoose.model("User", userSchema);

// Connect to MongoDB database
mongoose
    .connect("mongodb://localhost:27017/express-bcrypt-demo")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Failed to connect to MongoDB", err));

// Endpoint for user registration
app.post("/api/users", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(saltRounds);

        // Hash the password with the salt
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user with the hashed password
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Endpoint to authenticate a user
app.post("/api/users/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare the input password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Endpoint to fetch all users
app.get("/api/users", async (req, res) => {
    const allUsers = await User.find({});
    res.status(200).json(allUsers);
});

// Endpoint to delete a user by ID
app.delete("/api/users/:id", async (req, res) => {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
});


// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
