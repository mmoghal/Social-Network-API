const mongoose = require('mongoose');
const { User, Thought } = require('../models');
const users = require('./user-seeds');
const thoughts = require('./thought-seeds');

// Connect to MongoDB
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/social_network_db',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Wait for MongoDB connection to be established
mongoose.connection.once('open', async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Thought.deleteMany();

    // Insert new users
    const createdUsers = await User.insertMany(users);

    // Create thoughts for each user
    const createdThoughts = [];
    for (const thought of thoughts) {
      const user = createdUsers.find((user) => user.username === thought.username);
      thought.userId = user._id;
      const createdThought = await Thought.create(thought);
      createdThoughts.push(createdThought);
      user.thoughts.push(createdThought._id);
      await user.save();
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database', error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
});
