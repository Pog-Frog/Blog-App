import {Router} from "express";
import {PostController} from "../controllers/post.controller";
import {CreatePostDto, UpdatePostDto, UpdatePostLikesDto} from "../models/dtos/post.dto";
import {authMiddleware} from "../middlewares/auth.middleware";
import {validationMiddleware} from "../middlewares/validation.middleware";
import {Routes} from '../interfaces/routes.interface';


export class PostRoute implements Routes {
    public path = '/api/posts';
    public router = Router();
    public postController = new PostController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, authMiddleware, this.postController.getPosts);
        this.router.get(`${this.path}/:postId`, authMiddleware, this.postController.getPostById);
        // @ts-ignore
        this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreatePostDto, 'body'), this.postController.createPost);
        // @ts-ignore
        this.router.put(`${this.path}/:postId`, authMiddleware, validationMiddleware(UpdatePostDto), this.postController.updatePost);
        this.router.delete(`${this.path}/:postId`, authMiddleware, this.postController.deletePost);
        this.router.put(`${this.path}/:postId/likes`, authMiddleware,validationMiddleware(UpdatePostLikesDto), this.postController.updatePostLikes);
    }
}
