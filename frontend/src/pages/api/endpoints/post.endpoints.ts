import Domain from "@/pages/api/domain";

export const PostEndpoint = {
    getPosts: {
        url: `${Domain}/posts`,
        method: 'GET'
    },
    getPostById: {
        url: `${Domain}/posts/`,
        method: 'GET'
    },
    createPost: {
        url: `${Domain}/posts`,
        method: 'POST'
    },
    updatePost: {
        url: `${Domain}/posts/`,
        method: 'PUT'
    },
    deletePost: {
        url: `${Domain}/posts/`,
        method: 'DELETE'
    },
    updatePostLikes: {
        url: `${Domain}/posts/`,
        method: 'PUT'
    }
}