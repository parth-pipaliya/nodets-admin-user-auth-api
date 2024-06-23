import { Response } from 'express';
import logger from './logger';

export const responseHandle = {
    success: (res: Response, data: any, message: string = '') => {
        res.status(201).json({ stats: true, data: data, message: message });;
    },
    successWithToken: (res: Response, data: any, message: string = '') => {
        logger.info(JSON.stringify(data));
        res.status(201).json({ stats: true, data: data?.data, token:data?.token, message: message });
    },
    invalidCredentials: (res: Response, message: string = '') => {
        logger.error(`Error invalidCredentials: ${message}`);
        res.status(400).json({ stats: false, message: message });
    },
    serverError: (res: Response, message: string = 'Server error') => {
        logger.error(`Error serverError: ${message}`);
        res.status(500).json({ stats: false, message: message });
    },
    unknownError: (res: Response, message: string = 'Unknown error') => {
        logger.error(`Error unknownError: ${message}`);
        res.status(500).json({ stats: false, message: message });
    }
};
