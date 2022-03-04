const { text } = require('express');
const { Schema, model, Types, SchemaTypes } = require('mongoose');

const reactionSchema = new Schema( 
    {
        reactionId: {
            type: SchemaTypes.ObjectId,
            default: () => new Types.ObjectId()
       },
        reactionText: {
            type: String,
            required: true,
            trim: true,
            maxlength: 280
        }
    }
)

const thoughtSchema = new Schema(
    {
        thought:{
            type: String, 
            trim: true,
            required: 'Please enter a thought'
        },
        cratedAt:{
            type: Date,
            default: Date.now,
            trim: true
        },
        reactions: [reactionSchema]
    }
);

const Thought = model("Thought", thoughtSchema);

module.exports = Thought