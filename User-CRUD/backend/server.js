// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

// Temporary storage for user data
let users = [];

// POST endpoint for adding user details
app.post('/api/addUser', (req, res) => {
  // Extract user data from request body
  const userData = req.body;

  // Add user data to temporary storage
  users.push(userData);

  // Respond with success message
  res.json({ success: true, message: 'User details added successfully' });
});

// GET endpoint to retrieve all users (for testing purposes)
app.get('/api/users', (req, res) => {
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
