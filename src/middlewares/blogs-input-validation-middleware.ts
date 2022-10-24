import {NextFunction, Request, Response} from "express";
import {body, validationResult} from "express-validator";

export const blogsInputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    } else {
        next()
    }
}
export const bloggerNameValidation = body('name').not().isEmpty().trim().isString()
    .isLength({
    min: 1,
    max: 15
    })

export const youtubeUrlValidation = body('youtubeUrl').not().isEmpty().trim().isString()
    .isLength({
        min: 1,
        max: 100
    }).isURL()



