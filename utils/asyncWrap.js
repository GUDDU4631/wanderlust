//ERROR handle function that return err;
module.exports = (fn) => {
    return function (req, res, next) {
        fn(req, res, next).catch((err) => { next(err) });
    }
}
