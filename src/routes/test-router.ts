import {Request, Response, Router} from "express";
import {blogs} from "../repositories/blogs-repository";
import {posts} from "../repositories/posts-repository";

export const testRouter = Router()

testRouter.delete('/', (req: Request, res: Response) => {
  blogs.length = 0
  posts.length = 0
  res.sendStatus(204)
})