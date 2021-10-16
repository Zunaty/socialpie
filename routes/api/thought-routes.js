const router = require('express').Router();

const {
    getAllThoughts,
    getOneThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

// /api/thought/
router.route('/')
    .get(getAllThoughts)
    .post(createThought);

// /api/thought/:id
router.route('/:id')
    .get(getOneThought)
    .put(updateThought)
    .delete(deleteThought);

// /api/thought/:thoughtID/reactions
router.route('/:thoughtID/reactions')
    .post(createReaction)
    .delete(deleteReaction);

module.exports = router;