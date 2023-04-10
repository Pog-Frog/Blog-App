import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { HttpException } from '../exceptions/httpsExceptions';
import { User } from '../interfaces/user.interface';
import { UserModel } from '../models/user.model';
import {Post} from "../interfaces/post.interface";
import {PostModel} from "../models/post.model";

@Service()
export class UserService {
    public async findAllUsers(): Promise<User[]> {
        return await UserModel.find();
    }

    public async findUserById(userId: string): Promise<User> {
        // @ts-ignore
        const findUser : User = await UserModel.findOne({ _id: userId });
        if (!findUser) throw new HttpException(409, `You're user ${userId} doesn't exist`);

        return findUser;
    }

    public async createUser(userData: User): Promise<User> {
        // @ts-ignore
        const findUser : User = await UserModel.findOne({ email: userData.email });
        if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

        const hashedPassword = await hash(userData.password, 10);
        return await UserModel.create({ ...userData, password: hashedPassword });
    }

    public async updateUser(userId: string, userData: User): Promise<User> {
        if(userData.email){
            // @ts-ignore
            const findUser : User = await UserModel.findOne({ email: userData.email });
            if (findUser && findUser._id != userId) throw new HttpException(409, `You're email ${userData.email} already exists`);
        }

        if(userData.password){
            const hashedPassword = await hash(userData.password, 10);
            userData = { ...userData, password: hashedPassword };
        }
        
        // @ts-ignore
        const updateUserById : User = await UserModel.findByIdAndUpdate(userId, userData, { new: true });
        if (!updateUserById) throw new HttpException(409, `You're user ${userId} doesn't exist`);

        return updateUserById;
    }
    
    public async deleteUser(userId: string): Promise<User> {
        // @ts-ignore
        const deleteUserById : User = await UserModel.findByIdAndDelete(userId);
        if (!deleteUserById) throw new HttpException(409, `You're user ${userId} doesn't exist`);

        return deleteUserById;
    }

    public async findUserByEmail(email: string): Promise<User> {
        const user : User = await UserModel.findOne({ email: email });
        if (!user) throw new HttpException(409, `You're email ${email} doesn't exist`);

        return user;
    }

    public async findUserPostsByID(userId: string): Promise<Post[]> {
        const user : User = await UserModel.findById(userId);
        if (!user) throw new HttpException(409, `You're user ${userId} doesn't exist`);
        const posts : Post[] = await PostModel.find({ user: user._id });
        if (!posts) throw new HttpException(409, `You're user ${userId} doesn't have any posts`);
        return posts;
    }

    public async findUserPostsByEmail(email: string): Promise<Post[]> {
        const user : User = await UserModel.findOne({ email: email });
        if (!user) throw new HttpException(409, `You're email ${email} doesn't exist`);
        const posts : Post[] = await PostModel.find({ user: user._id });
        if (!posts) throw new HttpException(409, `You're user ${email} doesn't have any posts`);
        return posts;
    }
}
