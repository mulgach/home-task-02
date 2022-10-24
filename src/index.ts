import express from "express";
import {blogsRouter} from "./routes/blogs-router";
import bodyParser from "body-parser";
import {postsRouter} from "./routes/posts-router";
import {testRouter} from "./routes/test-router";


const app = express()

const port = process.env.PORT || 5000

app.use(bodyParser())


app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)
app.use('/testing/all-data', testRouter)

app.listen(port,() => {
    console.log(`Example listening on port: ${port}`)
})


//blogs

//posts

//authorization?