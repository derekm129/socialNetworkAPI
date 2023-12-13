const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
    reactionId: {

    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => moment(timestamp).format('MMM DD, YYYY [at] hh:mm a')
    },
    }
);

module.exports = reactionSchema;