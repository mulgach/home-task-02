import {Request, Response, Router} from "express";
import {postsRepository} from "../repositories/posts-repository";
import {basicAuthMiddleware} from "../middlewares/authorization-middleware";
import {
    blogIdValidation,
    contentValidation,
    postsInputValidationMiddleware,
    postTitleValidation,
    shortDescriptionValidation
} from "../middlewares/posts-input-validation-middleware";
import {blogs} from "../repositories/blogs-repository";

export const postsRouter = Router()

postsRouter.get('/', (req: Request, res: Response) => {
    const posts = postsRepository.giveAllPosts()
    res.status(200).send(posts)
})

postsRouter.post('/',
    basicAuthMiddleware,
    postTitleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation,
    postsInputValidationMiddleware,
    async (req: Request, res: Response) => {
    const blogger = await blogs.find(el => el.id === req.body.blogId)
        if(!blogger) {
            res.status(400).send({
                errorsMessages: [
                    {
                        message: "Can't find blog name by this blogId",
                        field: "blogId"
                    }
                ]
            })
            return
        }
    const newPost = postsRepository.createNewPost(req.body.title, req.body.shortDescription,
        req.body.content, req.body.blogId, blogger.name)
        res.status(201).send(newPost)
})

postsRouter.get('/:id', (req: Request, res: Response) => {

    const post = postsRepository.givePostById(req.params.id)
    if (post) {
        res.status(200).send(post)
    } else {
        res.sendStatus(404)
    }
})

postsRouter.put('/:id',
    basicAuthMiddleware,
    postTitleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation,
    async (req: Request, res: Response) => {
        const bloggerId = await blogs.find(el => el.id === req.body.blogId)
        if(!bloggerId) {
            res.status(400).send({
                errorsMessages: [
                    {
                        message: "Can't find blog by this blogId",
                        field: "blogId"
                    }
                ]
            })
            return
        }
        const updatedPost = postsRepository.updatePost(req.params.id, req.body.title,
            req.body.shortDescription, req.body.content)
        if (updatedPost) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
})

postsRouter.delete('/:id',
    basicAuthMiddleware,
    (req: Request, res: Response) => {
    const canDeletePost = postsRepository.deletePost(req.params.id)
        if (canDeletePost) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    })


