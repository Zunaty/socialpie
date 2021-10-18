const { Thought, User } = require('../models');

const thoughtController = {
    // Getting all thoughts - /api/thought/
    getAllThoughts(req, res) {
        Thought.find({})
        .then(thoughtData => res.json(thoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // Getting one thought - /api/thought/:id
    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.id })
        .then(thoughtData => res.json(thoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // Creating a thought and pushing it to the user thoughts array - /api/thought/
    createThought(req, res) {
        Thought.create(req.body)
        .then(({ _id }) => 
            User.findOneAndUpdate(
                { username: req.body.username },
                { $push: { thoughts: _id } },
                { new: true }
            )
        )
        .then(userData => {
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // Updating a thought - /api/thought/:id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            {
                new: true,
                runValidators: true
            }
        )
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this ID' });
                return;
            }

            res.json(thoughtData)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // Delete a thought - /api/thought/:id
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.id })
        .then(thoughtData => {
            res.json(thoughtData)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // Create a reaction - /api/thought/:thoughtID/reactions
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtID },
            {
                $addToSet: {
                    reactions: req.body
                }
            },
            {
                runValidators: true,
                new: true
            }
        )
        .then(thoughtData => {
            if (!thoughtData) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(thoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // Delete a reaction - /api/thought/:thoughtID/reactions/:reactionID
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtID },
            {
                $pull: {
                    reactions: {
                        reactionID: req.params.reactionID
                    }
                }
            },
            {
                runValidators: true,
                new: true
            }
        )
        .then(thoughtData => {
            if (!thoughtData) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(thoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
};

module.exports = thoughtController;