export const blogs: exampleBlogs[] = []

type exampleBlogs = {
    id: string
    name: string
    youtubeUrl: string
}

export const blogsRepository = {
    giveAllBlogs() {
        return blogs
    },
    createNewBlog(name: string, youtubeUrl: string) {
        let blogId = blogs.length + 1
        const newBlog: exampleBlogs = {
            id: blogId.toString(),
            name: name,
            youtubeUrl: youtubeUrl
        }
        blogs.push(newBlog);
        return newBlog;
    },
    findBlogById(id: string) {
        return blogs.find(b => b.id === id.toString());
    },
    updateBlog(id: string, name: string, youtubeUrl: string) {
        let findBlog = blogs.find(b => b.id === id.toString() )
        if (findBlog) {
            findBlog.name = name
            findBlog.youtubeUrl = youtubeUrl
        }
        return findBlog;
    },
    deleteBlog(id: string) {
        for (let i = 0; i < blogs.length; i++) {
            if (blogs[i].id === id) {
                blogs.splice(i, 1);
                return true;
            }
        }
        return false
    },

}

