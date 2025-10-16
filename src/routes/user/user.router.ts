import { UserRepository } from "../../core/repositories/user/user.repository";
import { validateMiddleware } from "../../middleware/validation.middleware";
import { UserController } from "../../controllers/user/user.controller";
import { UserService } from "../../core/services/user/user.service";
import { UserFormDto } from '../../types/dtos/user/user.dto';
import { Router } from 'express';

const userRouter = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRouter.get('/', userController.findMany.bind(userController));
userRouter.get('/:user_id', userController.findUnique.bind(userController));
userRouter.post('/', validateMiddleware(UserFormDto), userController.create.bind(userController));
userRouter.put('/:user_id', validateMiddleware(UserFormDto), userController.update.bind(userController));
userRouter.delete('/:user_id', userController.delete.bind(userController));

export { userRouter };