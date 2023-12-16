// Imports
const { Schema, model } = require('mongoose');
const Reaction = require("./Reaction")

// thought schema
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => moment(timestamp).format('MMM DD, YYYY [at] hh:mm a')
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [Reaction],
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
    }
);

// retrieves the length of the thought's reactions array field on query
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// create Thought model with thoughtSchema
const Thought = model('thought', thoughtSchema);

// exports
module.exports = Thought;