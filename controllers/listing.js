const listing = require("../models/listing");

// geoCoding mapbox api {https://github.com/mapbox/mapbox-sdk-js}
const mbxGeoCoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeoCoding({ accessToken: process.env.MAP_API_TOKEN });


// index page 
module.exports.index = async (req, res) => {
    const listingData = await listing.find();
    res.render('listings/index.ejs', { listingData });
}

// new listing form 
module.exports.newListingForm = (req, res) => {
    res.render('listings/new.ejs')
}

// post request for new listing 
module.exports.newListingPost = async (req, res) => {
    //convert location to point code
    const response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
    }).send()
    let listingData = req.body;
    let newData = new listing({
        ...listingData.listing,
        image: {
            url: req.file.path,
            filename: req.file.filename,
        },
        owner: [
            {
                _id: req.user._id, //req.user send the valuse of logged in person so we push the id of this into an owner for this listing
            }
        ],
        geometry: response.body.features[0].geometry,//point code of the location
    });
    await newData.save();
    req.flash("success", "you are successfully add your listing..."); // success msg after listing added
    return res.redirect("/listing");
}

// listingshow 
module.exports.listingShow = async (req, res, next) => {
    const { id } = req.params;
    // res.send("complete");
    let list = await listing.findById(id).populate({ path: "review", populate: { path: "owner" } }).populate("owner");

    if (!list) {
        req.flash("error", "listing you requested for does not exist!");
        return  res.redirect("/listing");
    }
    res.render('listings/show.ejs', { list });
}

// edit page 
module.exports.editPage = async (req, res, next) => {
    let { id } = req.params;
    let list = await listing.findById(id).populate("owner");
    //list is avilable or not
    if (!list) {
        req.flash("error", "listing which you requested for edit does not exist!");
    } else {
        let originalImageUrl = list.image.url;
        originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_150/e_blur:50");
        return res.render('listings/editPanel.ejs', { list, originalImageUrl });
    }
}

module.exports.updateRequest = async (req, res, next) => {
    let listingData = req.body;
    // res.send("hello")
    // res.send(req.file);
    if (!listingData) {
        next(new ExpressError(400, "Invalid Listing"));
    }
    const { id } = req.params;
    const updatedListing = await listing.findByIdAndUpdate(id, { ...listingData.listing });
    if (typeof (req.file) != undefined) {
        let url = req.file.path;
        let filename = req.file.filename;
        updatedListing.image = { url, filename };
        await updatedListing.save();
    }
    return res.redirect('/listing');

}

module.exports.delete = async (req, res, next) => {
    let { id } = req.params;
    await listing.findByIdAndDelete(id);
    req.flash("success", "You listing is deleted!");
    return res.redirect('/listing');
}