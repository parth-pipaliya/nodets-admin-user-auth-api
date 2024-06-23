import { Request, Response, NextFunction } from 'express';
import AdminService from '../services/adminService';

export const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const admin = await AdminService.createData(req.body);
        res.status(201).json(admin);
    } catch (error) {
        next(error);
    }
};

export const updateAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const admin = await AdminService.updateData(req.params.id, req.body);
        res.status(200).json(admin);
    } catch (error) {
        next(error);
    }
};

export const deleteAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const admin = await AdminService.deleteData(req.params.id);
        res.status(200).json(admin);
    } catch (error) {
        next(error);
    }
};

export const getAdminById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const admin = await AdminService.getById(req.params.id);
        res.status(200).json(admin);
    } catch (error) {
        next(error);
    }
};


export const selectAdmins = async (req: Request, res: Response, next: NextFunction) => {
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

        const admins = await AdminService.selectData(filter, page, limit);
        const totalAdmins = await AdminService.countData(filter); 

        res.status(200).json({
            data: admins,
            total: totalAdmins,
            page: page,
            pages: Math.ceil(totalAdmins / limit)
        });
    } catch (error) {
        next(error);
    }
};