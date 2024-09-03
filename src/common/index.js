// const BackendUrl= "http://localhost:8000"
// const UserBackendDomain='https://insta-backend-za7q.onrender.com/api/v1/user'
// const PostBackendDomain='https://insta-backend-za7q.onrender.com/api/v1/post'
// const MessageBackendDomain='https://insta-backend-za7q.onrender.com/api/v1/message'

const UserBackendDomain='/api/v1/user'
const PostBackendDomain='/api/v1/post'
const MessageBackendDomain='/api/v1/message'

export const SummaryApi = {
    // usr routes 
    signUp:{
        url:`${UserBackendDomain}/register`,
        method:"post"
    },

    checkUsernameUnique:{
        url:`${UserBackendDomain}/check-usernameUnique`,
        // /check-usernameUnique/:username
        method:"get"
    },

    login:{
        url:`${UserBackendDomain}/login`,
        method:"post"
    },

    logout:{
        url:`${UserBackendDomain}/logout`,
        method:"get"
    },

    forgotPassword:{
        url:`${UserBackendDomain}/forget-password`,
        method:"post"
    },

    resetPassword:{
        url:`${UserBackendDomain}/reset-password`,
        // /:id/token
        method:"post"
    },

    getProfile:{
        url:`${UserBackendDomain}`,
        
        // /:id/profile`
        method:"get"
    },

    editProfile:{
        url:`${UserBackendDomain}/profile/edit`,
        method:"post"
    },

    getSuggestedUsers:{
        url:`${UserBackendDomain}/suggested`,
        method:"get"
    },

    followOrUnfollow:{
        url:`${UserBackendDomain}/followorunfollow`,
        // /:id`,
        method:"post"
    },

    getFollowers:{
        url:`${UserBackendDomain}`,
        // /:id/follwers`,
        method:"get"
    },

    getFollowings:{
        url:`${UserBackendDomain}`,
        // /:id/followings`,
        method:"get"
    },

    getAllUsers:{
        url:`${UserBackendDomain}/all`,
        method:"get"
    },
    
    searchUsers:{
        url:`${UserBackendDomain}/search`,
        method:"get"
    },
    
    // post routes 

    addPost:{
        url:`${PostBackendDomain}/addpost`,
        method:"post"
    },

    getAllPosts:{
        url:`${PostBackendDomain}/allposts`,
        method:"get"
    },

    getUserAllPosts:{
        url:`${PostBackendDomain}/userposts/all`,
        method:"get"
    },

    likeOrDislikePost:{
        url:`${PostBackendDomain}`,
        // /:id/like,
        method:"get"
    },

    // dislikePost:{
    //     url:`${PostBackendDomain}/:id/dislike`,
    //     method:"get"
    // },

    commentPost:{
        url:`${PostBackendDomain}`,
        // /:id/comment,
        method:"post"
    },
    
    allComment:{
        url:`${PostBackendDomain}/:id/comment/all`,
        method:"post"
    },

    deletePost:{
        url:`${PostBackendDomain}/delete`,// /:id
        method:"delete"
    },

    bookmarkPost:{
        url:`${PostBackendDomain}`,
        // /:id/bookmark`,
        method:"get"
    },

    // message routes 

    sendMessage:{
        url:`${MessageBackendDomain}/send`,

        // /:id`,
        method:"post"
    },

    getMessage:{
        url:`${MessageBackendDomain}/all`,
        // /:id`,
        method:"get"
    }
}