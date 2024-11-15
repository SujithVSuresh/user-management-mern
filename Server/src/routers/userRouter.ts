import express from 'express';
import * as userController from "../controllers/userController"
import { userRouteProtector } from '../middlewares/jwtAuth';
import { refreshToken } from '../middlewares/jwtAuth';

const userRouter = express.Router();


userRouter.post('/signup', userController.signupUser)
userRouter.post('/signin', userController.signinUser)
userRouter.get('/profile', userRouteProtector, userController.userProfile)
userRouter.post('/edit-profile', userRouteProtector, userController.updateProfile)
userRouter.get('/logout', userController.logout)
userRouter.get("/refresh-token", refreshToken);


export default userRouter
