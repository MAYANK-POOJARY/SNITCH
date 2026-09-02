import { body, validationResult} from "express-validator";

function validateRequest(req, res, next){

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    next()
}

export const registerValidator = [
    body("email")
        .trim()
        .isEmail().withMessage("Invalid email format"),
    body("contact")
        .trim()
        .notEmpty().withMessage("Contact is required")
        .matches(/^\d{10}$/).withMessage("Contact must be of 10 digits"),
    body("password")
        .trim()
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be atleast 6 characters long"),
    body("isSeller")
        .isBoolean().withMessage("isSeller must be a boolean value"),
    validateRequest

]

export const loginValidator = [
    body("email")
        .isEmail().withMessage("Invalid email format"),
    body("password")
        .notEmpty().withMessage("Password is required"),
    validateRequest
]