import express from 'express';
const router =  express.Router();
import { register, login, user, uploadProfile} from '../controllers/userController.js';
import validateToken from '../middleware/validateToken.js';
import registerValidation from '../validators/authentication/registerValidation.js';
import profileUploadValidation from '../validators/users/profileUploadValidation.js';
import loginValidation from '../validators/authentication/loginValidation.js';

import upload from '../storage/users/profileUpload.js';

/** USER ROUTE GROUP */
router.post("/register", registerValidation,  register)

router.post("/login", loginValidation, login)

router.post("/upload-profile", upload.single('profile'), profileUploadValidation,  uploadProfile)

router.get("/user", validateToken, user)


export default router;