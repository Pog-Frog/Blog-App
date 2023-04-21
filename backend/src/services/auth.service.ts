import {compare, hash} from 'bcrypt';
import {sign} from 'jsonwebtoken';
import {Service} from 'typedi';
import {JWT_SECRET} from '../config';
import {HttpException} from '../exceptions/httpsExceptions';
import {UserModel} from '../models/user.model';
import {User} from '../interfaces/user.interface';
import {DataStoredInToken, TokenData} from '../interfaces/auth.interface';

const creatToken = (user: User): TokenData => {
    const expiresIn = 60 * 60 * 24 * 7; // 1 week
    const DataStoredInToken: DataStoredInToken = {
        _id: user._id,
    };
    return {
        expiresIn,
        token: sign(DataStoredInToken, JWT_SECRET, {expiresIn}),
    };
};

const creatHTTPCookie = (tokenData: TokenData): string => {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
}

@Service()
export class AuthService {
    public async signup(userData: User): Promise<User> {
        // @ts-ignore
        const findUser: User = await UserModel.findOne({email: userData.email});
        if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

        const hashedPassword = await hash(userData.password, 10);
        return await UserModel.create({...userData, password: hashedPassword});
    }

    public async login(userData: User): Promise<{ findUser: User; cookie: string; tokenData: TokenData }> {
        // @ts-ignore
        const findUser: User = await UserModel.findOne({email: userData.email});
        if (!findUser) throw new HttpException(409, `You're email ${userData.email} doesn't exist`);

        const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
        if (!isPasswordMatching) throw new HttpException(409, `You're password is not matching`);

        const tokenData: TokenData = creatToken(findUser);
        const cookie: string = creatHTTPCookie(tokenData);

        return {cookie, findUser, tokenData};
    }

    public async logout(userData: User): Promise<User> {
        // @ts-ignore
        const findUser: User = await UserModel.findOne({email: userData.email});
        if (!findUser) throw new HttpException(409, `You're email ${userData.email} doesn't exist`);

        return findUser;
    }
}



