import {NextFunction, Request, Response} from "express";
import {body, validationResult, CustomValidator} from "express-validator";

export const postsInputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    } else {
        next()
    }
}

export const postTitleValidation = body('title').not().isEmpty().trim().isString()
    .isLength({
        min: 1,
        max: 30
    })

export const shortDescriptionValidation = body('shortDescription').not().isEmpty()
    .trim().isString()
    .isLength({
        min: 1,
        max: 100
    })

export const contentValidation = body('content').not().isEmpty().trim().isString()
    .isLength({
        min: 1,
        max: 1000
    })

export const blogIdValidation = body('blogId').not().isEmpty().trim().isString()
    .isLength({
        min: 1
    })



