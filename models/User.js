const {Schema, model, SchemaTypes } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

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
    }
);

userSchema.plugin(uniqueValidator)
;
const User = model('User', userSchema);

module.exports = User;