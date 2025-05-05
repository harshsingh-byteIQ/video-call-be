const { validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().reduce((acc, error) => {
            if (error.type === "field") {
                acc[error.path] = error.msg;
            }
            return acc;
        }, {});

        return res.status(422).json({ status: false, errors: errorMessages });
    }

    next();
};

module.exports = {
    validateRequest,
};
