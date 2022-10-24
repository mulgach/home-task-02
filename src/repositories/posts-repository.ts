export const posts: examplePost[] = []
type examplePost = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
}

export const postsRepository = {
    giveAllPosts(){
        return posts;
    },
    createNewPost(title: string, shortDescription: string,
                  content: string, blogId: string, blogName: string) {
        let postId = posts.length + 1
            const newPost: examplePost = {
                id:	postId.toString(),
                title: title,
                shortDescription: shortDescription,
                content: content,
                blogId:	blogId,
                blogName: blogName
            }
            posts.push(newPost)
            return newPost;
    },
    givePostById(id: string) {
        return posts.find(p => p.id === id);
    },
    updatePost(id: string, title: string, shortDescription: string,
               content: string) {
        let findPost = posts.find(p => p.id === id)
        if (findPost) {
            findPost.title = title
            findPost.shortDescription = shortDescription
            findPost.content = content
        }
        return findPost;
    },
    deletePost(id: string) {
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id === id) {
                posts.splice(i, 1);
                return true;
            }
        }
        return false
    },

}
