import { UserRepository } from "../../core/repositories/user/user.repository";
import { UserController } from "../../controllers/user/user.controller";
import { UserService } from "../../core/services/user/user.service";
import { Router } from 'express';

const userRouter = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRouter.get('/user', userController.findMany.bind(userController));
userRouter.get('/user/:user_id', userController.findUnique.bind(userController));
userRouter.post('/user', userController.create.bind(userController));
userRouter.put('/user/:user_id', userController.update.bind(userController));
userRouter.delete('/user/:user_id', userController.delete.bind(userController));

export { userRouter };