import { Request, Response, NextFunction } from 'express';
import { validationResult, body, ParamSchema } from 'express-validator';

// Define ValidationRule type and export it
export type ValidationRule = {
    field: string;
    rules: ParamSchema;
}[];
