const { Reaction, Thought } = require('../models');

const reactionController = {
  // create reaction
  createReaction({ params, body }, res) {
    Reaction.create(body)
      .then((dbReactionData) => {
        return Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $push: { reactions: dbReactionData._id } },
          { new: true }
        );
      })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  // delete reaction
  deleteReaction({ params }, res) {
    Reaction.findOneAndDelete({ _id: params.reactionId })
      .then((dbReactionData) => {
        if (!dbReactionData) {
          res.status(404).json({ message: 'No reaction found with this id' });
          return;
        }
        return Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $pull: { reactions: params.reactionId } },
          { new: true }
        );
      })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = reactionController;
