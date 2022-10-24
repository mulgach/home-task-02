import {NextFunction, Request, Response} from "express";
import {body, validationResult} from "express-validator";

export const blogsInputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        let errorsArray = errors.array()
        let errorForClient = errorsArray.map(e => ({message: e.msg, field: e.param}))
        res.status(400).json({ errorsMessages: errorForClient });
    } else {
        next()
    }
}
export const bloggerNameValidation = body('name').trim().isString()
    .isLength({min: 1, max: 15})

export const youtubeUrlValidation = body('youtubeUrl').trim().isString()
    .isLength({
        min: 1,
        max: 100
    }).isURL()



