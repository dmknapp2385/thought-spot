const {Schema, model, SchemaTypes } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type:String,
            trim: true,
            unique: true,
            required: 'Please enter a username'
        },
        thoughts:[
            {
                type: Schema.Types.ObjectId, 
                ref: "Thought"
            }
        ],
        email: {
            type: String,
            trim: true, 
            lowercase: true,
            required: 'Please enter an email!',
            unique: true,
            match:[/.+\@.+\..+/, 'Please enter a valid email address']
        },
        friends: [
            {
                type:Schema.Types.ObjectId, 
                ref: 'User',
                unique: true,
            }
        ]
    },
    {
        toJSON: {
            virtuals:true,
            getters: true
        }
    }
);


// //virtual to get total friends
// userSchema.virtual('friendCount').get(function() {
//     return this.friends.length;
// });

// get total count of thoughts and reactions on retrieval
userSchema.virtual('thoughtCount').get(function(){
    return this.thoughts.reduce((total, t) => total + t.reactions.length +1, 0);
});

const User = model('User', userSchema);

module.exports = User;