import {Router} from "express";
import {AuthController} from "../controllers/auth.controller";
import {CreateUserDto, LoginUserDto} from "../models/dtos/users.dto";
import {authMiddleware} from "../middlewares/auth.middleware";
import {validationMiddleware} from "../middlewares/validation.middleware";
import {Routes} from "../interfaces/routes.interface";


export class AuthRoute implements Routes {
    public path = '/api';
    public router = Router();
    public authController = new AuthController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // @ts-ignore
        this.router.post(`${this.path}/signup`, validationMiddleware(CreateUserDto, 'body'), this.authController.signup);
        // @ts-ignore
        this.router.post(`${this.path}/login`, validationMiddleware(LoginUserDto, 'body'), this.authController.login);
        this.router.post(`${this.path}/logout`, authMiddleware, this.authController.logout);
    }
}