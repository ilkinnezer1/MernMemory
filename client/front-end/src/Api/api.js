import axios from 'axios';

const MAIN_API = axios.create({baseURL: "http://localhost:5000"})

MAIN_API.interceptors.request.use((req) => {
    if(localStorage.getItem("profile")){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`
    };
    return req;
})

export const fetchPosts = () => MAIN_API.get("/posts")
export const createPost = (post) => MAIN_API.post("/posts", post)
export const likePost   = (id) => MAIN_API.patch(`/posts/${id}/likePost`)
export const updatePost = (id, receivedPostData) => MAIN_API.patch(`/posts/${id}`, receivedPostData)
export const deletePost = (id) => MAIN_API.delete(`/posts/${id}`)
export const signIn = (inputData) => MAIN_API.post("/user/login", inputData)
export const signUp = (inputData) => MAIN_API.post("/user/register", inputData)

