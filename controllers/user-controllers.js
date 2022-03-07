const { response } = require('express');
const { param } = require('express/lib/request');
const { User, Thoughts } = require('../models');
const { deleteAll } = require('./thought-controllers');

const userController = {
    // get all users
    getUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-reactions._id -reactions.id -__v'
        })
        .populate({
            path: 'friends',
            select: 'username'
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err)
            res.status(400).json(err);
        });
    },

    // create user
    createUser({body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err))
    },

    //get one user by id
    getOneUser( { params }, res) {
        User.findById( { _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-reactions._id -reactions.id -__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this Id '});
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => res.json(err))
    },

    // delete one user
    async deleteOne({ params }, res) {
        const user = await User.findOne({ _id: params.id})
        
         user.deleteOne()
        .then(response => {
            if (!response) {
                res.status(404).json({ message: 'No user found with this id '});
                return
            }
            res.json({message: `${response.username} has been deleted`})
        })
        .catch(err => res.json(err))
    },

    //update user
    updateUser ({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        )
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({ message: 'No user found with thid Id '});
                return;
            }
            res.json(dbUserData)})
        .catch(err => res.json(err))
    },

    // delete all users
    async deleteAll(req, res ) {
        const users = await User.find({});
        User.deleteMany({users})
        .then(response => res.json({message: `${response.deletedCount} user(s) deleted`}))
        .catch(err => res.json(err))
    },

    // add friend
    addFriend( { params }, res ) {
        User.findByIdAndUpdate (
            { _id: params.id},
            { $addToSet: {friends: params.friendId} },
            { new: true , runValidators: true }
        )
        .then(response => res.json(response))
        .catch(err => res.json(err))
    },

    // delete friend
    deleteFriend( { params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendId } },
            { new: true, runValidators: true }
        ).then(response => res.json(response))
        .catch(err => res.json(err))
    }
}

module.exports = userController;