import { Service } from 'typedi';
import { HttpException } from '../exceptions/httpsExceptions';
import { Post } from '../interfaces/post.interface';
import { PostModel } from '../models/post.model';

@Service()
export class PostService {
    public async findAllPosts(): Promise<Post[]> {
        return PostModel.find();
    }

    public async findPostById(postId: string): Promise<Post> {
        // @ts-ignore
        const findPost : Post = await PostModel.findById(postId);
        if (!findPost) throw new HttpException(409, `This post ${postId} doesn't exist`);

        return findPost;
    }

    public async createPost(postData: Post): Promise<Post> {
        return await PostModel.create(postData);
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
