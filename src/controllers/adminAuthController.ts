import { Request, Response } from 'express';
import AdminAuthService from '../services/adminAuthService';
import { isError } from '../utils/errorUtils';
import { validate } from '../middleware/checkValidator';
import adminGenerateTokens from '../utils/adminGenerateTokens';
import { adminRegisterValidation, adminLoginValidation } from '../requests';
import { adminRegisterResource, adminLoginResource } from '../resources';
import { responseHandle } from '../utils/responseHandle';
import logger from '../utils/logger';


const registerValidationRules = adminRegisterValidation();
const loginValidationRules = adminLoginValidation();

export const register = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const useraData = await AdminAuthService.register({ email, password });
        const token = adminGenerateTokens(useraData);
        const data = adminRegisterResource(useraData);

        responseHandle.successWithToken(res, {data, token}, 'Login successful');
    } catch (error) {
        logger.error(error);
        if (isError(error)) {
            if (error.message === 'Admin already exists') {
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
        const useraData = await AdminAuthService.login({ email, password });
        const token = adminGenerateTokens(useraData);
        const data = adminLoginResource(useraData);

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

