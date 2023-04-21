import { Service } from 'typedi';
import { HttpException } from '../exceptions/httpsExceptions';
import { Post } from '../interfaces/post.interface';
import { PostModel } from '../models/post.model';
import {UserModel} from "../models/user.model";

@Service()
export class PostService {
    public async findAllPosts(): Promise<Post[]> {
        return PostModel.find().populate('author', 'firstname lastname');
    }

    public async findPostById(postId: string): Promise<Post> {
        const findPost : Post = await PostModel.findById(postId).populate('author', 'firstname lastname');
        if (!findPost) throw new HttpException(409, `This post ${postId} doesn't exist`);

        return findPost;
    }

    public async createPost(postData: Post): Promise<Post> {
        const newPost = await PostModel.create(postData);
        if(!newPost) throw new HttpException(409, `Couldn't create a new post`);

        const author = await UserModel.findById(postData.author);
        if(!author) throw new HttpException(409, `This author ${postData.author} doesn't exist`);

        author.posts.push(newPost._id);
        await author.save();

        return newPost;
    }

    public async updatePost(postId: string, postData: Post): Promise<Post> {
        const findPost: Post = await this.findPostById(postId);
        if (!findPost) throw new HttpException(409, `This post ${postId} doesn't exist`);
        
        // @ts-ignore
        const updatePost : Post = PostModel.findByIdAndUpdate(postId, postData, { new: true });
        if (!updatePost) throw new HttpException(409, `This post ${postId} doesn't exist`);

        return updatePost;
    }

    public async deletePost(postId: string): Promise<Post> {
        // @ts-ignore
        const deletePost : Post = await PostModel.findByIdAndDelete(postId);
        if (!deletePost) throw new HttpException(409, `This post ${postId} doesn't exist`);

        return deletePost;
    }

    public async UpdatePostLikes(postId: string, postData: Post): Promise<Post> {
        const findPost: Post = await this.findPostById(postId);
        if (!findPost) throw new HttpException(409, `This post ${postId} doesn't exist`);

        // @ts-ignore
        const updatePost : Post = await PostModel.findByIdAndUpdate(postId, postData, { new: true });
        if (!updatePost) throw new HttpException(409, `This post ${postId} doesn't exist`);

        return updatePost;

    }
}
