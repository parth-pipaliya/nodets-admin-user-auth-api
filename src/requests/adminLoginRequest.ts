import { ValidationRule } from '../middleware/validationMiddleware';
import { body, ParamSchema } from 'express-validator';

/**
 * Generate validation rules for user registration.
 */
export const adminLoginValidation = (): ValidationRule => [
    { field: 'email', rules: body('email').notEmpty().withMessage('Email is required') },
    { field: 'password', rules: body('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long') },
];