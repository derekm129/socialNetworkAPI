const { User, Thought } = require('../models');

module.exports = {
// GET all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
// GET a single thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({_id: req.params.thoughtId})
                .select('-__v');
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID'});
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
// POST to create a new thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
// PUT to update a thought by its id
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId},
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
        
            res.json(thought);
            } catch (err) {
            console.log(err);
            res.status(500).json(err);
            }
    },
// DELETE to remove a thought by its id
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId});
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID'});
            }
            res.json({ message: 'Thoughts deleted' });
          } catch (err) {
            res.status(500).json(err);
        }
    },
// POST to create a reaction
async addReaction(req, res) {
    try {
        const reaction = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $addToSet: {reactions: req.body.reactionId} },
            { runValidators: true, new: true }
        );
        if (!reaction) {
            return res.status(404).json({ message: 'No thought with this id' });
        }

      res.json(reaction);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
},

// DELETE reaction by reactionId value
    async deleteReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId},
                { $pull: {friends: req.params.reactionId} },
                { runValidators: true, new: true }
                );
            if (!reaction) {
                return res.status(404).json({ message: 'No thought with that id'});
            }
            res.json(reaction);
        } catch (err) {
            res.status(500).json(err);
        }
    },

};