import {NextFunction, Request, Response} from "express";
import {body, validationResult, CustomValidator} from "express-validator";
import {blogs} from "../repositories/blogs-repository";

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

export const checkBloggerIdExist = body('blogId').custom((value, {req}) => {
    let bloggerID = blogs.find(el => el.id === req.body.blogId)
    console.log(bloggerID)
    if(!bloggerID) {
       return false
    }
       return true
    });

export const contentValidation = body('content').trim().isString().isLength({min: 1, max: 1000})

export const blogIdValidation = body('blogId').trim().isString().isLength({min: 1, max: 14})




