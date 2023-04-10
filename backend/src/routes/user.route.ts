import {Router} from "express";
import {UserController} from "../controllers/user.controller";
import {CreateUserDto} from "../models/dtos/users.dto";
import {authMiddleware} from "../middlewares/auth.middleware";
import {validationMiddleware} from "../middlewares/validation.middleware";
import {Routes} from '../interfaces/routes.interface';

export class UserRoute implements Routes{
    public path = '/api/user';
    public router = Router();
    public userController = new UserController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, authMiddleware, this.userController.getUsers);
        this.router.get(`${this.path}/:userId`, authMiddleware, this.userController.getUserById);
        this.router.get(`${this.path}/:userEmail`, authMiddleware, this.userController.getUserByEmail);
        // @ts-ignore
        this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateUserDto, 'body'), this.userController.createUser);
        this.router.put(`${this.path}/:userId`, authMiddleware, this.userController.updateUser);
        this.router.delete(`${this.path}/:userId`, authMiddleware, this.userController.deleteUser);
        this.router.get(`${this.path}/ID/:userId/posts`, authMiddleware, this.userController.getUserPostsById);
        this.router.get(`${this.path}/Email/:userEmail/posts`, authMiddleware, this.userController.getUserPostsByEmail);
    }
}