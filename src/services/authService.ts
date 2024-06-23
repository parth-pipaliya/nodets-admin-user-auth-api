import User, { IUser } from '../models/user';
import logger from '../utils/logger';

interface RegisterInput {
    email: string;
    password: string;
}

interface LoginInput {
    email: string;
    password: string;
}

class AuthService {
    async register({ email, password }: RegisterInput): Promise<IUser> {
        let user: IUser | null = await User.findOne({ email });
        logger.info(email);
        if (user) {
            throw new Error('User already exists');
        }

        user = new User({ email, password });
        await user.save();

        return user;
    }

    async login({ email, password }: LoginInput): Promise<IUser> {
        const user: IUser | null = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isMatch: boolean = await user.comparePassword(password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        return user;
    }
}

export default new AuthService();
