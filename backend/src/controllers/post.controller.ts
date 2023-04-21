import {NextFunction, Response, Request} from "express";
import {Container} from "typedi";
import {PostService} from "../services/post.service";
import {Post} from "../interfaces/post.interface";
import {verify} from "jsonwebtoken";
import {JWT_SECRET} from "../config";
import {DataStoredInToken} from "../interfaces/auth.interface";
import {UserModel} from "../models/user.model";

export class PostController {
    public post = Container.get(PostService);

    public getPosts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const posts: Post[] = await this.post.findAllPosts();
            res.status(200).json({data: posts, message: 'getPosts'});
        } catch (error) {
            next(error);
        }
    }

    public getPostById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const postId: string = req.params.postId;
            const post: Post = await this.post.findPostById(postId);
            res.status(200).json({data: post, message: 'getPost'});
        } catch (error) {
            next(error);
        }
    }

    public createPost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const postData: Post = req.body;
            if (!postData.author) {
                const token = req.headers.authorization.split(' ')[1];
                const author_id = await (verify(token, JWT_SECRET)) as DataStoredInToken;
                const user = await UserModel.findById(author_id);
                if (!user) res.status(401).json({message: 'Unauthorized'});
                postData.author = user._id;
            }
            const createPost: Post = await this.post.createPost(postData);
            res.status(201).json({data: createPost, message: 'created'});
        } catch (error) {
            next(error);
        }
    }

    public updatePost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const postId: string = req.params.postId;
            const postData: Post = req.body;
            const updatePost: Post = await this.post.updatePost(postId, postData);
            res.status(200).json({data: updatePost, message: 'updated'});
        } catch (error) {
            next(error);
        }
    }

    public deletePost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const postId: string = req.params.postId;
            const deletePost: Post = await this.post.deletePost(postId);
            res.status(200).json({data: deletePost, message: 'deleted'});
        } catch (error) {
            next(error);
        }
    }

    public updatePostLikes = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const postId: string = req.params.postId;
            const postData: Post = req.body;
            const updatePost: Post = await this.post.UpdatePostLikes(postId, postData);
            res.status(200).json({data: updatePost, message: 'updated'});
        } catch (error) {
            next(error);
        }
    }
}