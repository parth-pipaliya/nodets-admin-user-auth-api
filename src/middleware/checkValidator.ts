import { Request, Response, NextFunction } from 'express';
import { validationResult, ParamSchema } from 'express-validator';
import { ValidationRule } from './validationMiddleware';

export const validate = (rules: ValidationRule) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        await Promise.all(rules.map(rule => rule.rules.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(400).json({ errors: errors.array() });
    };
};