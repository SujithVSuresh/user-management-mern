import express from 'express';
import * as adminController from '../controllers/adminController'
import { adminRouteProtector } from '../middlewares/jwtAuth';
import { refreshToken } from '../middlewares/jwtAuth';

const adminRouter = express.Router();


adminRouter.post('/login', adminController.login);

adminRouter.get('/fetch-users', adminRouteProtector, adminController.fetchUsers)

adminRouter.post('/add-user', adminRouteProtector, adminController.addUser)

adminRouter.patch('/edit-user/:userId', adminRouteProtector, adminController.editUser)

adminRouter.delete('/delete-user/:userId', adminRouteProtector, adminController.deleteUser)

adminRouter.get('/logout', adminRouteProtector, adminController.logout)

adminRouter.get('/refresh-token', refreshToken)


export default adminRouter