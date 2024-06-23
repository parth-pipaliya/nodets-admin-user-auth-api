import jwt from 'jsonwebtoken';
import config from '../config/config';
import { IUser } from '../models/user';

interface Tokens {
    accessToken: string;
}

const adminGenerateTokens = (user: IUser): Tokens => {
    const accessToken = jwt.sign({ id: user._id }, config.jwtAdminSecret, { expiresIn: config.jwtAdminExpire });
    return {accessToken};
};

export default adminGenerateTokens;