const { body, validationResult} = require("express-validator")


const drugstoreRules = () => {
    return [
        body("name")
            .trim()
            .isLength({min: 2})
            .withMessage("The drugstore's name should be at least two characters long."),
        
        body("telephone")
            .matches(/^[+]?[\d\s-]+$/)
            .withMessage("The drugstore's phone number is invalid."),
        
        body("email")
            .trim()
            .isEmail()
            .normalizeEmail()
            .withMessage("Invalid drugstore's email."),
        
        body("address")
            .trim()
            .escape()
            .isLength({min: 6})
            .withMessage("The address should be at least six characters long."),
        
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

const validateDrugstore = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next()
}

module.exports = {
    drugstoreRules,
    validateDrugstore
}