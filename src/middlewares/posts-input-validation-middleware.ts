import {NextFunction, Request, Response} from "express";
import {body, validationResult, CustomValidator} from "express-validator";

export const postsInputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        let errorsArray = errors.array()
        let errorForClient = errorsArray.map(e => ({message: e.msg, field: e.param}))
        res.status(400).json({ errorsMessages: errorForClient });
    } else {
        next()
    }
}

export const postTitleValidation = body('title').trim().isString().isLength({min: 1, max: 30})

export const shortDescriptionValidation = body('shortDescription').trim().isString()
    .isLength({
        min: 1,
        max: 100
    })

export const contentValidation = body('content').trim().isString().isLength({min: 1, max: 1000})

export const blogIdValidation = body('blogId').trim().isString().isLength({min: 1, max: 14})




