import jwt from 'jsonwebtoken';
import config from '../config/config';
import { IUser } from '../models/user';

interface Tokens {
    accessToken: string;
    refreshToken: string;
}

const generateTokens = (user: IUser): Tokens => {
    const accessToken = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: config.jwtExpire });
    const refreshToken = jwt.sign({ id: user._id }, config.jwtRefreshSecret, { expiresIn: config.jwtRefreshExpire });

    return { accessToken, refreshToken };
};

export default generateTokens;