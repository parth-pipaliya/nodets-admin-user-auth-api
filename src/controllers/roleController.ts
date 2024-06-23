import { Request, Response, NextFunction } from 'express';
import RoleService from '../services/roleService';

export const createRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const role = await RoleService.createData(req.body);
        res.status(201).json(role);
    } catch (error) {
        next(error);
    }
};

export const updateRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const role = await RoleService.updateData(req.params.id, req.body);
        res.status(200).json(role);
    } catch (error) {
        next(error);
    }
};

export const deleteRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const role = await RoleService.deleteData(req.params.id);
        res.status(200).json(role);
    } catch (error) {
        next(error);
    }
};

export const getRoleById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const role = await RoleService.getById(req.params.id);
        res.status(200).json(role);
    } catch (error) {
        next(error);
    }
};

export const selectRoles = async (req: Request, res: Response, next: NextFunction) => {
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

        const roles = await RoleService.selectData(filter, page, limit);
        const totalRoles = await RoleService.countData(filter); 

        res.status(200).json({
            data: roles,
            total: totalRoles,
            page: page,
            pages: Math.ceil(totalRoles / limit)
        });
    } catch (error) {
        next(error);
    }
};