const router = require('express').Router();
const {
    getThoughts,
    createThought,
    getOneThought,
    deleteThought,
    deleteAll,
    updateThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controllers');

//GET all thoughts api/thoughts
router 
    .route('/')
    .get(getThoughts)
    .delete(deleteAll)

// POST thought to user api/thoughts/:userId
router
    .route('/:userId')
    .post(createThought)

// GET one thought POST one to update and DELETE api/thoughts/:id
router 
    .route('/:id')
    .get(getOneThought)
    .delete(deleteThought)
    .put(updateThought)

// post reply api/thoughts/reactions/:thoughtid
router 
    .route('/reactions/:id')
    .post(addReaction)

// delete reply api/thoughts/reactions/:thoughtid/:reactionId

router  
    .route('/reactions/:id/:reactionId')
    .delete(deleteReaction)


module.exports = router;