import { Request, Response, NextFunction } from 'express';
import PermissionService from '../services/permissionService';

export const createPermission = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const permission = await PermissionService.createData(req.body);
        res.status(201).json(permission);
    } catch (error) {
        next(error);
    }
};

export const updatePermission = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const permission = await PermissionService.updateData(req.params.id, req.body);
        res.status(200).json(permission);
    } catch (error) {
        next(error);
    }
};

export const deletePermission = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const permission = await PermissionService.deleteData(req.params.id);
        res.status(200).json(permission);
    } catch (error) {
        next(error);
    }
};

export const getPermissionById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const permission = await PermissionService.getById(req.params.id);
        res.status(200).json(permission);
    } catch (error) {
        next(error);
    }
};


export const selectPermissions = async (req: Request, res: Response, next: NextFunction) => {
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

        const permissions = await PermissionService.selectData(filter, page, limit);
        const totalPermissions = await PermissionService.countData(filter); 

        res.status(200).json({
            data: permissions,
            total: totalPermissions,
            page: page,
            pages: Math.ceil(totalPermissions / limit)
        });
    } catch (error) {
        next(error);
    }
};
