const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: string,
            unique: true,
            required: true,
            trimmed: true
        },
        email: {
            type: string,
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
);

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;