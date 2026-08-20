import { Router } from 'express'
import { authMiddleware } from '../middleware/authTokens.js';
const router = Router();

router.use(authMiddleware);
router.post('/post', addPost);
router.get('/post',getPosts);
router.get('/post/:postId',getSpecificPost);
router.patch('/post/:postId', updatePost);
router.delete('/post/:postId', deletePost);


export default router