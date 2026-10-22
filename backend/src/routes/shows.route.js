import { Router } from "express"
import { getShows, getSearchShows } from "../controllers/show.controller.js";
import { authMiddleware } from '../middleware/authTokens.js';

const router = Router();

router.use(authMiddleware)

router.get('/getShows', getShows);
router.get('/getSearchShows', getSearchShows);

export default router