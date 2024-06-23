import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Admin, { IAdmin } from '../models/admin';
import config from '../config/config';

interface JwtPayload {
    id: string;
}

declare global {
    namespace Express {
        interface Request {
            admin?: IAdmin;
        }
    }
}

export const authAdminProtect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let token: string | undefined;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
        return;
    }

    try {
        const decoded = jwt.verify(token, config.jwtAdminSecret) as JwtPayload;
        const adminCheck = await Admin.findById(decoded.id).select('-password');
        if (!adminCheck) {
            res.status(404).json({ message: 'Admin not found' });
        }else{
            next();
        }    
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};
