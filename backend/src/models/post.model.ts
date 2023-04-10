import mongoose, {model, Schema, Document} from 'mongoose';
import {Post} from "../interfaces/post.interface";


const PostSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        content: {type: String, required: true},
        author: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
        likes: {type: Number, required: true, default: 0},
    },
    {
        timestamps: true,
    },
);
export const PostModel = model<Post & Document>('Post', PostSchema);