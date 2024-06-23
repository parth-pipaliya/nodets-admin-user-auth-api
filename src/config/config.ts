import dotenv from 'dotenv';

dotenv.config();

const config = {
    jwtSecret: process.env.JWT_ACCESS_SECRET || 'your_jwt_secret',
    jwtExpire: process.env.JWT_ACCESS_EXPIRE || '1d', // Access token expiry time
    jwtRefreshSecret: process.env.JWT_REFRESH_EXPIRE || 'your_jwt_refresh_secret',
    jwtRefreshExpire: process.env.JWT_REFRESH_EXPIRE || '7d', // Refresh token expiry time
    jwtAdminSecret: process.env.JWT_ADMIN_ACCESS_SECRET || 'your_jwt_secret',
    jwtAdminExpire: process.env.JWT_ADMIN_ACCESS_EXPIRE || '1d', // Access token expiry time
    port: process.env.PORT || 5000,
};

export default config;