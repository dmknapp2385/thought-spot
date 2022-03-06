const {Schema, model, SchemaTypes } = require('mongoose');
const Thought = require('./Thoughts');


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
    if(!this.thoughts) {
        return 0;
    }
    return this.thoughts.length;
});

// middleware to remove thoughts if user is deleted
userSchema.pre('deleteOne', {document: true }, function(next) {
    Thought.deleteMany({ _id: {$in: this.thoughts} } )
    .then((next()))
});

userSchema.pre('deleteMany', function(next) {
    Thought.deleteMany({}).then(next());
});


const User = model('User', userSchema);

module.exports = User;