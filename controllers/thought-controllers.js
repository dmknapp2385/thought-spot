const { response } = require('express');
const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts
    getThoughts(req,res) {
        Thought.find()
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err))

    },

    // create thought
    createThought({ params, body }, res) {
        Thought.create(body)
        .then(({ _id }) => {
            console.log(params)
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id } },
                { new: true, runValidators: true}           
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json ({ message: "No User found with this id!"});
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => res.json(err))
    },
      // get one thought by id
      getOneThought({ params }, res) {
        Thought.findById({ _id: params.id })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err))
    },

    // update thought by id
    updateThought( { params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id},
            body,
            { new: true, runValidators: true}
        )
        .then(response => {
            res.json(response);
        })
        .catch(err => res.json(err))
    },

    //delete one thought by id
    deleteThought( { params }, res) {
        Thought.deleteOne({ _id: params.id })
        .then(response => {
            if(response.deletedCount === 0) {
                res.status(404).json({ message: 'No thought found with this Id '});
                return;
            }
            res.json({ message: 'User Deleted'})
        })
        .catch(err => res.json(err))
    },

    // delete all thoughts
    deleteAll(req, res) {
        Thought.deleteMany()
        .then(response => res.json({message: (`${response.deletedCount} thought(s) deleted`)}))
        .catch(err => res.json(err))
    },

    // create reaction
    addReaction( { params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id }, 
            { $push: { reactions: body } },
            { new: true , runValidators: true}       
        ).then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err))
    },

    // delete reaction
    deleteReaction( { params }, res) {
        Thought.findByIdAndUpdate( 
            { _id: params.id },
            { $pull: {reactions: {reactionId: params.reactionId} } },
            { new: true }
        ).then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err))
    }

}

module.exports = thoughtController;