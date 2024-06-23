import express from 'express';
import mongoose from 'mongoose';
import adminAuthRoutes from './routes/adminAuthRoutes';
import adminRoutes from './routes/adminRoutes';
import roleRoutes from './routes/roleRoutes';
import permissionRoutes from './routes/permissionRoutes';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import config from './config/config';
import { setupSwagger } from './config/swaggerConfig';

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/auth-db', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
});

app.use(express.json());

//admin routes
app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/role', roleRoutes);
app.use('/api/admin/permission', permissionRoutes);

//user routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Setup Swagger
setupSwagger(app);

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});