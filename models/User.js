// Imports
const { Schema, model } = require('mongoose');
const Reaction = require("./Reaction")

// User schema
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [
                /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,4})$/,
                "Must match a valid email address!" 
            ], 
        },
        thoughts: [
            {
            type: Schema.Types.ObjectId,
            ref: "Thought",
            },
        ],
        friends: [
            {
            type: Schema.Types.ObjectId,
            ref: "User",
            },
        ],    
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
    }
);

// retrieves the length of the user's friends array field on query
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// create User model with userSchema
const User = model('user', userSchema);

// exports
module.exports = User;