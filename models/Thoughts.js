const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reactionSchema = new Schema( 
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
       },
        reactionText: {
            type: String,
            required: true,
            trim: true,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
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
            trim: true,
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true
        },
        id:false
    }
);



const Thought = model("Thought", thoughtSchema);

module.exports = Thought