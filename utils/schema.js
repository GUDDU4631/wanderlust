const Joi = require('joi');
//listing schema joi 
module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required().min(1000),
        location: Joi.string().required(),
        country: Joi.string().required(),
        url: Joi.string().allow("", null).optional(),
    }).required()
}).unknown(true);
//rating schema joi
module.exports.reviewSchema = Joi.object({
    comment: Joi.string().required(),
    rating: Joi.number().min(1).max(5).required(),
});