const { 
    getUsers,
    createUser,
    deleteAll,
    getOneUser,
    deleteOne,
    updateUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controllers');
const router = require('express').Router();


// GET and POST api/users
router
    .route('/')
    .get(getUsers)
    .post(createUser)
    .delete(deleteAll)

// PUT, DELETE, GET one api/users/:id
router 
    .route('/:id')
    .put(updateUser)
    .delete(deleteOne)
    .get(getOneUser)


// PUT and DELETE friend api/users/:id/friend/:friendid
router
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend)

module.exports = router;


