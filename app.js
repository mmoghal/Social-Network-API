const express = require('express');
const { connectDB } = require('./config/connection');
const { Reaction, Thought, User } = require('./models');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

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

// API routes
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.get('/api/thoughts', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.post('/api/thoughts', async (req, res) => {
  try {
    const thought = await Thought.create(req.body);
    // Update the associated user's thoughts array
    await User.findByIdAndUpdate(
      thought.username,
      { $push: { thoughts: thought._id } },
      { new: true }
    );
    res.status(201).json(thought);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.put('/api/users/:userId', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.put('/api/thoughts/:thoughtId', async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      req.body,
      { new: true }
    );
    res.json(updatedThought);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.delete('/api/users/:userId', async (req, res) => {
  try {
    // Remove the user and their associated thoughts
    await Promise.all([
      User.findByIdAndDelete(req.params.userId),
      Thought.deleteMany({ username: req.params.userId }),
    ]);
    res.json({ message: 'User and associated thoughts deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.delete('/api/thoughts/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    // Update the associated user's thoughts array
    await User.findByIdAndUpdate(
      thought.username,
      { $pull: { thoughts: thought._id } }
    );
    await thought.remove();
    res.json({ message: 'Thought deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.post('/api/thoughts/:thoughtId/reactions', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    thought.reactions.push(req.body);
    await thought.save();
    res.status(201).json(thought);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.delete('/api/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    thought.reactions.id(req.params.reactionId).remove();
    await thought.save();
    res.json({ message: 'Reaction deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = app;
