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
            }
        ]
    },
    {
        toJSON: {
            virtuals:true,
            getters: true
        },
        id: false
    }
);


//virtual to get total friends
userSchema.virtual('friendCount').get(function() {
    if(this.friends){
        return this.friends.length
    } 
    return 0;
});

// get total count of thoughts and reactions on retrieval
userSchema.virtual('thoughtCount').get(function(){
    if (this.thoughts) {    
    return this.thoughts.reduce((total, t) => total + t.reactions.length +1, 0);
    }
    return 0;
});

const User = model('User', userSchema);

module.exports = User;