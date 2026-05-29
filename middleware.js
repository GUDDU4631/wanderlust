//schema for room/house listing
const listing = require('./models/listing.js');
const review = require("./models/review.js");
//review schema for validation
const { reviewSchema, listingSchema } = require("./utils/schema.js");
module.exports.isLoggedIn = (req, res, next) => {
    // console.log(req.originalUrl);
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you are not logged in");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveredirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let list = await listing.findById(id).populate("owner");
    // console.log(list);
    if (!list.owner[0]._id.equals(res.locals.CurrUser._id)) {
        req.flash("error", "something went wrong");
        return res.redirect(`/listing/${id}`);
    }
    next();
}

// review owner validation 
module.exports.reviewValidation = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let reviewOwner = await review.findById(reviewId).populate("owner");
    if (!reviewOwner.owner._id.equals(res.locals.CurrUser._id)) {
        req.flash("error", "something went wrong.");
        return res.redirect(`/listing/${id}`);
    }
    next();
}
// reviewSchemaValidation 
module.exports.reviewSchemaValidation = async (req, res, next) => {
    const reviewData = req.body;
    let result = reviewSchema.validate(reviewData);
    if (result.error) {
        throw new ExpressError(400, result.error.message);
    }
    next();
}


// listing schema validation 
module.exports.listingValidation = async(req,res,next)=>{
    let listingData = req.body;
    let result = listingSchema.validate(listingData);
        if (result.error) {
            throw new ExpressError(401, result.error.message);
        }
    next();
}