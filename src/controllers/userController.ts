import { Request, Response, NextFunction } from 'express';
import UserService from '../services/userService';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.createData(req.body);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.updateData(req.params.id, req.body);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.deleteData(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.getById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export const selectUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { search, page = 1, limit = 10 } = req.body;
        let filter = {};
  
        if (search) {
          const searchRegex = new RegExp(search, 'i'); // case-insensitive regex
          filter = {
            $or: [
              { email: searchRegex },
              // Add more fields as necessary
            ],
          };
        }

        const users = await UserService.selectData(filter, page, limit);
        const totalUsers = await UserService.countData(filter); // Assuming a countUsers method to count documents

        res.status(200).json({
            data: users,
            total: totalUsers,
            page: page,
            pages: Math.ceil(totalUsers / limit)
        });
    } catch (error) {
        next(error);
    }
};