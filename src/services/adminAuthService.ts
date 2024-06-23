import Admin, { IAdmin } from '../models/admin';
import logger from '../utils/logger';

interface RegisterInput {
    email: string;
    password: string;
}

interface LoginInput {
    email: string;
    password: string;
}

class AdminAuthService {
    async register({ email, password }: RegisterInput): Promise<IAdmin> {
        let admin: IAdmin | null = await Admin.findOne({ email });
        logger.info(email);
        if (admin) {
            throw new Error('Admin already exists');
        }

        admin = new Admin({ email, password });
        await admin.save();

        return admin;
    }

    async login({ email, password }: LoginInput): Promise<IAdmin> {
        const admin: IAdmin | null = await Admin.findOne({ email });
        if (!admin) {
            throw new Error('Invalid credentials');
        }

        const isMatch: boolean = await admin.comparePassword(password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        return admin;
    }
}

export default new AdminAuthService();
