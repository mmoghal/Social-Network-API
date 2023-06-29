const express = require('express');
const { connectDB } = require('./config/connection');
const { Reaction, Thought, User } = require('./models');

const app = express();
const PORT = 3000;

// Connect to MongoDB
connectDB()
  .then(() => {
    // Start the server after successful database connection
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });

// Example route
app.get('/', (req, res) => {
  res.send('Welcome to the Social Network API');
});

// Define your API routes here

// Example route
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Add more routes as needed

module.exports = app;
