import { Router } from 'express'
import { authMiddleware } from '../middleware/authTokens.js';
import { addPost, getPosts, getSpecificPost, getSpecificShowPosts,updatePost,deletePost } from '../controllers/post.controller.js';
const router = Router();

router.use(authMiddleware);
router.post('/post', addPost);
router.get('/post', getPosts);
router.get('/post/:postId', getSpecificPost);
router.get('/show/:showId', getSpecificShowPosts);
//router.get('/post/:userId', getSpecificUserPosts);
router.patch('/post/:postId', updatePost);
router.delete('/post/:postId', deletePost);


export default router