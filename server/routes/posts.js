import express from 'express';
import {getPost,
        createPost, 
         updatePost,
         deletePost, 
         likePost, 
         getPostbySearch,
         getSpecialPost} from '../controllers/controlPanel.js'
import auth from '../middleware/auth.js';

const router = express.Router();

//ROUTER THAT IS USED WITH MIDDLEWARE IN INDEX
router.get('/search', getPostbySearch);
router.get('/', getPost);
router.get("/:id" , getSpecialPost);
router.post("/",auth, createPost);
router.patch("/:id",auth,  updatePost);
router.delete("/:id", auth,deletePost);
router.patch("/:id/likePost",auth,likePost);


export default router