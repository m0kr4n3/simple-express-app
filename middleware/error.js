const ErrorResponsive = require('../utils/errorResponsive');

const errorHandler = (err, req, res, next) => {
    let error = {...err };
    error.message = err.message;

    //  Log to console dev
    console.log(err);

    if (err.name === 'CastError') {
        const message = `Item not found with id of ${err.value}`;
        error = new ErrorResponsive(message, 404);
    };

    //  Mongoose duplicate key
    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = new ErrorResponsive(message, 400);
    };

    //  Mongoose Validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponsive(message, 400)
    };

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });
};

module.exports = errorHandler;