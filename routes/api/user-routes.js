const router = require('express').Router();

const {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// /api/user/
router.route('/')
    .get(getAllUsers)
    .post(createUser);

// /api/user/:id
router.route('/:id')
    .get(getOneUser)
    .put(updateUser)
    .delete(deleteUser);

// /api/user/:userId/friends/:friendId
router.route('/:userID/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;