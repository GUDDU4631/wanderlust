const express = require("express");
const Router = express.Router({ mergeParams: true });
const controllerReview = require("../controllers/reviews.js");

//schema for room/house listing
const listing = require('../models/listing.js');

//review model 
const review = require("../models/review.js");


const asyncWrap = require("../utils/asyncWrap.js");
const { reviewValidation, reviewSchemaValidation } = require("../middleware.js");
//review routes 
Router.post("/", reviewSchemaValidation,asyncWrap(controllerReview.newReview));


Router.delete("/:reviewId",reviewValidation, asyncWrap(controllerReview.distroyReview));

module.exports = Router;;