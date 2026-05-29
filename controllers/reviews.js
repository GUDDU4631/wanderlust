const review = require("../models/review");
const listing = require("../models/listing");

// new review form submit post rout 
module.exports.newReview = async (req, res) => {
    const reviewData = req.body;
    let { id } = req.params;
    const newReview = new review({
        comment: reviewData.comment,
        rating: reviewData.rating,
        owner: req.user._id,
    });

    await newReview.save();

    const foundListing = await listing.findById(id);
    foundListing.review.push(newReview);
    await foundListing.save();
    req.flash("success", "review successfully added");// success msg after review added
    return res.redirect(`/listing/${id}`);
}
// review delete route 
module.exports.distroyReview = async (req, res) => {
    let { id, reviewId } = req.params;
    await listing.findByIdAndUpdate(id, { $pull: { review: reviewId } });
    await review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted successfully");
    return res.redirect(`/listing/${id}`);
}