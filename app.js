const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const users = [{username:"123",password:"123"}];

// Register a new user
app.post('/register', (req, res) => {
    console.log(req.body)
    const { username, password } = req.body;
      
    // Validate input
    if (!username || !password) {
        return res.status(400).json({ error: 'Both username and password are required' });
    }

    // Check if the username is already taken
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ error: 'Username is already taken' });
    }

    // Store the new user
    const newUser = { username, password };
    users.push(newUser);

    return res.status(201).json({ message: 'User registered successfully' });
});

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Find the user in the array
    const user = users.find(user => user.username === username && user.password === password);

    // Check if the user exists
    if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    return res.status(200).json({ message: 'Login successful' });
});


app.get('/loan-options', (req, res) => {
    console.log("CALLEDs")
    const options = getLoanOptions();
    res.json({ success: true, options });
});

app.get('/profile/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = [].find(u => u.id === userId);
    if (user) {
        res.json({ success: true, user });
    } else {
        res.status(404).json({ success: false, message: 'User not found' });
    }
});

app.post('/initiate-loan', (req, res) => {
    const { borrowerId, lenderId, amount, returnDate } = req.body;
    const loan = { id: loans.length + 1, borrowerId, lenderId, amount, returnDate };
    loans.push(loan);
    res.json({ success: true, loan });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Helper function to get random loan options
function getLoanOptions() {
    return [
        { id: 1, name: 'John Doe', amount: 5000, interestRate: 4 },
        { id: 2, name: 'XYZ Finance Company', amount: 10000, interestRate: 6 },
    ];
}
const loanOptions = [
    { amount: 1000, interestRate: 5 },
    { amount: 5000, interestRate: 8 },
    { amount: 10000, interestRate: 10 },
];

app.get('/loan-options', (req, res) => {
    res.json(loanOptions);
});

module.exports = app; // Export the app for testing
