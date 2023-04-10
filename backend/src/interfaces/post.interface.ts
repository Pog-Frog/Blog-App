import { User } from "./user.interface";

export interface Post {
    _id: string;
  title: string;
  content: string;
  author: User['_id'];
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

