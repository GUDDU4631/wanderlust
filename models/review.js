const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = require('./user');

const reviewSchema = new Schema({
    comment: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    createAt: {
        type: Date,
        default: Date.now(),
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: user,
    }
});
module.exports = mongoose.model("review", reviewSchema);