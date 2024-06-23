import { Request, Response } from 'express';
import AuthService from '../services/authService';
import { isError } from '../utils/errorUtils';
import { validate } from '../middleware/checkValidator';
import generateToken from '../utils/generateToken';
import { registerValidation, loginValidation } from '../requests';
import { registerResource, loginResource } from '../resources';
import { responseHandle } from '../utils/responseHandle';
import logger from '../utils/logger';


const registerValidationRules = registerValidation();
const loginValidationRules = loginValidation();

export const register = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const useraData = await AuthService.register({ email, password });
        const token = generateToken(useraData);
        const data = registerResource(useraData);

        responseHandle.successWithToken(res, {data, token}, 'Login successful');
    } catch (error) {
        logger.error(error);
        if (isError(error)) {
            if (error.message === 'User already exists') {
                responseHandle.invalidCredentials(res, error.message);
            } else {
                responseHandle.serverError(res,'Server error');
            }
        } else {
            responseHandle.unknownError(res,'Unknown error');
        }
    }
};
export const registerController = [
    validate(registerValidationRules),
    register
];

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const useraData = await AuthService.login({ email, password });
        const token = generateToken(useraData);
        const data = loginResource(useraData);

        responseHandle.successWithToken(res, {data, token}, 'Login successful');
    } catch (error) {
        logger.error(error);
        if (isError(error)) {
            if (error.message === 'Invalid credentials') {
                responseHandle.invalidCredentials(res, error.message);
            } else {
                responseHandle.serverError(res,error.message);
            }
        } else {
            responseHandle.unknownError(res,'Unknown error');
        }
    }
};
export const loginController = [
    validate(loginValidationRules),
    login
];

