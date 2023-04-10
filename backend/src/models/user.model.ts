import mongoose, { model, Schema, Document } from 'mongoose';
import { User} from "../interfaces/user.interface";


const UserSchema: Schema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    posts: [{ type: mongoose.Types.ObjectId, ref: 'Post' }],
    country: { type: String, required: true },
    city: { type: String, required: true },
    picture: { type: String, required: false }
}, {
    timestamps: true
});

export const UserModel = model<User & Document>('User', UserSchema);

