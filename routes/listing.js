const express = require("express");
const Router = express.Router();
//listing schema for use site validation
const { listingSchema } = require("../utils/schema.js");
//schema for room/house listing
const listing = require('../models/listing.js');
//self define Error class
const ExpressError = require("../utils/ExpressError.js");
const asyncWrap = require("../utils/asyncWrap.js");

const { isLoggedIn, isOwner, listingValidation } = require("../middleware.js");
const listingController = require("../controllers/listing.js");


//cloud storage
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({storage});



//home route
Router.get('/', asyncWrap(listingController.index));
// Router.get('/', asyncWrap((req,res)=>{
//     res.send("he")
// }));
//new listing route
Router.route("/new")
    .get(isLoggedIn, listingController.newListingForm)
    .post(isLoggedIn,upload.single('listing[image]'), listingValidation,asyncWrap(listingController.newListingPost));

//new listing route

Router.route("/:id")
    .get(asyncWrap(listingController.listingShow))//show route show the all details about post
    .put(isLoggedIn, isOwner, upload.single('listing[image]'), listingValidation, asyncWrap(listingController.updateRequest))//update route for values updating in database
//update routes render edit form 
Router.get('/:id/edit', isLoggedIn, isOwner, asyncWrap(listingController.editPage));


//delete listing route,
Router.delete('/:id/delete', isLoggedIn, isOwner, asyncWrap(listingController.delete));
module.exports = Router;