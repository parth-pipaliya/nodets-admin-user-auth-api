import { Router } from 'express';
import { registerController, loginController } from '../controllers/adminAuthController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Admin Auth
 *   description: Admin Authentication endpoints
 */

/**
 * @swagger
 * /api/admin/auth/register:
 *   post:
 *     summary: Register a new admin
 *     tags: [Admin Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Admin registered successfully
 *       400:
 *         description: Admin already exists
 *       500:
 *         description: Server error
 */
router.post('/register', registerController);

/**
 * @swagger
 * /api/admin/auth/login:
 *   post:
 *     summary: Login a admin
 *     tags: [Admin Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Admin logged in successfully
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post('/login', loginController);


export default router;
