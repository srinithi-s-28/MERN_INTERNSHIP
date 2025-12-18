const express = require('express')
const cors = require('cors');
const app = express()
const PORT = 8001 

// In-memory storage for testing
let users = [];

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend server is running successfully')
})

// Signup route
app.post('/signup', (req, res) => {
    try {
        const { email, username, password } = req.body;
        
        // Check if user already exists
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(400).json({ Message: "User already exists" });
        }
        
        // Create new user
        const newUser = { name: username, email, password };
        users.push(newUser);
        
        res.status(201).json({ Message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ Message: "Server error", error: error.message });
    }
});

// Login route
app.post('/login', (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user
        const user = users.find(user => user.email === email);
        if (!user) {
            return res.status(400).json({ Message: "User not found" });
        }
        
        // Check password
        if (user.password !== password) {
            return res.status(400).json({ Message: "Invalid password" });
        }
        
        res.status(200).json({ Message: "Login successful", user: { name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ Message: "Server error", error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})