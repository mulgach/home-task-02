import {Request, Response, Router} from "express";
import {blogsRepository} from "../repositories/blogs-repository";
import {
    bloggerNameValidation,
    blogsInputValidationMiddleware, youtubeUrlValidation
} from "../middlewares/blogs-input-validation-middleware";
import {basicAuthMiddleware} from "../middlewares/authorization-middleware";


export const blogsRouter = Router()

blogsRouter.get('/', (req: Request, res: Response) => {
    const giveAllBlogs = blogsRepository.giveAllBlogs()
    res.status(200).send(giveAllBlogs)
})

blogsRouter.post('/',
    basicAuthMiddleware,
    bloggerNameValidation,
    youtubeUrlValidation,
    blogsInputValidationMiddleware,
    (req: Request, res: Response) => {
    const createBlog = blogsRepository.createNewBlog(req.body.name, req.body.youtubeUrl)
    res.status(201).send(createBlog)
})
blogsRouter.get('/:id', (req: Request, res: Response) => {
    const blogById= blogsRepository.findBlogById(req.params.id)
    if (blogById) {
        res.status(200).send(blogById)
    } else {
        res.send(404)
    }
})

blogsRouter.put('/:id',
    basicAuthMiddleware,
    bloggerNameValidation,
    youtubeUrlValidation,
    blogsInputValidationMiddleware,
    (req: Request, res: Response) => {
        const updatedBlog = blogsRepository.updateBlog(req.params.id, req.body.name, req.body.youtubeUrl )
        if (updatedBlog) {
            res.send(204)
        } else {
            res.send(404)
        }
})

blogsRouter.delete('/:id',
    basicAuthMiddleware,
    (req: Request, res: Response) => {
    const deletedBlog = blogsRepository.deleteBlog(req.params.id)
    if (deletedBlog) {
        res.send(204)
    } else {
        res.send(404)
    }

})
