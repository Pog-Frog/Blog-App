import {NextFunction, Response, Request} from "express";
import {Container} from "typedi";
import {UserService} from "../services/user.service";
import {User} from "../interfaces/user.interface";
import {Post} from "../interfaces/post.interface";


export class UserController {
    public user = Container.get(UserService);

    public getUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users: User[] = await this.user.findAllUsers();
            res.status(200).json({data: users, message: 'getUsers'});
        } catch (error) {
            next(error);
        }
    }

    public getUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId: string = req.params.userId;
            const user: User = await this.user.findUserById(userId);
            res.status(200).json({data: user, message: 'getUser'});
        } catch (error) {
            next(error);
        }
    }

    public createUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userData: User = req.body;
            const createUser: User = await this.user.createUser(userData);
            res.status(201).json({data: createUser, message: 'created'});
        } catch (error) {
            next(error);
        }
    }

    public updateUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId: string = req.params.userId;
            const userData: User = req.body;
            const updateUser: User = await this.user.updateUser(userId, userData);
            res.status(200).json({data: updateUser, message: 'updated'});
        } catch (error) {
            next(error);
        }
    }

    public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId: string = req.params.userId;
            const deleteUser: User = await this.user.deleteUser(userId);
            res.status(200).json({data: deleteUser, message: 'deleted'});
        } catch (error) {
            next(error);
        }
    }

    public getUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userEmail: string = req.params.userEmail;
            const user: User = await this.user.findUserByEmail(userEmail);
            res.status(200).json({data: user, message: 'getUser'});
        } catch (error) {
            next(error);
        }
    }

    public getUserPostsById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId: string = req.params.userId;
            const posts: Post[] = await this.user.findUserPostsByID(userId);
            res.status(200).json({data: posts, message: 'getUserPosts'});
        } catch (error) {
            next(error);
        }
    }

    public getUserPostsByEmail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userEmail: string = req.params.userEmail;
            const posts: Post[] = await this.user.findUserPostsByEmail(userEmail);
            res.status(200).json({data: posts, message: 'getUserPosts'});
        } catch (error) {
            next(error);
        }
    }


}