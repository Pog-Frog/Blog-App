import {Post} from "./post.interface";

export interface User{
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    country: string;
    city: string;
    picture?: string;
    posts: Post[];
    createdAt: Date;
    updatedAt: Date;
}