const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require("./review");
const user = require('./user');
// const initData = require('./models/initData.js');
const listingSchema = Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        url : String,
        filename : String,
    },
    price: {
        type: Number,
        min: 1000
    },
    location: {
        type: String
    },
    country: {
        type: String
    },
    review: [
        {
            type: Schema.Types.ObjectId,
            ref: "review",
        }
    ],
    owner : [
        {
            type : Schema.Types.ObjectId,
            ref: user,
        }
    ],
    geometry : {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing){
        await Review.deleteMany({_id:{$in:listing.review}});
    }
});

const listing = mongoose.model("Listing", listingSchema);
module.exports = listing;