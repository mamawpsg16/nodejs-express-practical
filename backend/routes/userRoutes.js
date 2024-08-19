import express from 'express';
const router =  express.Router();
import { register, login, user} from '../controllers/userController.js';
import validateToken from '../middleware/validateToken.js';

/** USER ROUTE GROUP */
router.post("/register", register)

router.post("/login", login)

router.get("/user", validateToken, user)
export default router;