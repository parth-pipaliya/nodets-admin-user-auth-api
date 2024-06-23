import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user';
import config from '../config/config';

interface JwtPayload {
    id: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}

export const authProtect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let token: string | undefined;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
        return;
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;
        const userCheck = await User.findById(decoded.id).select('-password');
        if (!userCheck) {
            res.status(404).json({ message: 'User not found' });
        }else{
            next();
        }  
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};
