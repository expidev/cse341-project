const { body, validationResult} = require("express-validator")


const userRules = () => {
    return [
        body("firstName")
            .trim()
            .isAlpha()
            .isLength({min: 2})
            .withMessage("Your first name should be at least two characters long."),
        
        body("lastName")
            .trim()
            .isAlpha()
            .isLength({min: 2})
            .withMessage("Your last name should be at least two characters long."),
        
        body("email")
            .trim()
            .isEmail()
            .normalizeEmail()
            .withMessage("Add a valid email."),
        
        body("gender")
            .trim()
            .isIn(["female", "male"])
            .withMessage("Your gender should be either male or female."),
        
        body("birthday")
            .isDate()
            .withMessage("Invalid birthday date."),
        
        body("address")
            .trim()
            .escape()
            .isLength({min: 6})
            .withMessage("Your address should be at least six characters long."),
        
        body("city")
            .trim()
            .isAlphanumeric()
            .isLength({min:2})
            .withMessage("The city should at least 2 characters"),

        body("country")
            .trim()
            .isAlpha()
            .isLength({min:2})
            .withMessage("The country should be at least 2 characters")
    ]
}

const validateUser = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next()
}

module.exports = {
    userRules,
    validateUser
}