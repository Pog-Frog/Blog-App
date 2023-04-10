import {NextFunction, Response} from 'express';
import {verify} from 'jsonwebtoken';
import {JWT_SECRET} from "../config";
import {HttpException} from "../exceptions/httpsExceptions";
import {DataStoredInToken, RequestWithUser} from "../interfaces/auth.interface";
import {UserModel} from "../models/user.model";

const getAuthorization = (req: { cookies: { [x: string]: any; }; headers: { [x: string]: any; }; }) => {
    const cookie = req.cookies['Authorization'];
    if (cookie) return cookie;

    const header = req.headers['authorization'];
    if (header) return header.split('Bearer ')[1];
    return null;
}

export const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const AUTHORIZATION = getAuthorization(req);

        if (AUTHORIZATION) {
            const {_id} = await (verify(AUTHORIZATION, JWT_SECRET)) as DataStoredInToken;
            const findUser = await UserModel.findById(_id);
            if (findUser) {
                req.user = findUser;
                next();
            } else {
                next(new HttpException(401, 'Invalid authentication token'));
            }
        } else {
            next(new HttpException(401, 'Authentication token missing'));
        }
    } catch (error) {
        next(new HttpException(401, 'Invalid authentication token'));
    }
}
