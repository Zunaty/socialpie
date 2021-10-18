const { User } = require('../models');

const userController = {
    // Getting all Users - /api/user/
    getAllUsers(req, res) {
        User.find({})
        .populate('thoughts')
        .populate('friends')
        .then(usersData => res.json(usersData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // Get one user - /api/user/:id
    getOneUser(req, res) {
        User.findOne({ _id: req.params.id })
        .populate('thoughts')
        .populate('friends')
        .then(userData => res.json(userData)).catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // Create a user - /api/user/
    createUser(req, res) {
        User.create(req.body)
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // Update a user - /api/user/:id
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            {
                new: true,
                runValidators: true
            }
        )
        .then(userData => {
            if (!userData) {
                res.status(400).json({ message: 'No user found with this ID' });
                return;
            }

            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // Delete a user - /api/user/:id
    deleteUser(req, res) {
        User.findOneAndDelete(
            {
                _id: req.params.id
            })
        .then(userData => {
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // Add a friend - /api/user/:userID/friends/:friendID
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userID },
            {
                $addToSet: {
                    friends: {
                        _id: req.params.friendID
                    }
                }
            },
            { new: true }
        )
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // Delete a friend - /api/user/:userID/friends/:friendID
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userID },
            {
                $pull: {
                    friends: req.params.friendID
                }
            }
        )
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    }
};

module.exports = userController;