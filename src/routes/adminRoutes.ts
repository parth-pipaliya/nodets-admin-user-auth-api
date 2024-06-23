import { Router } from 'express';
import {createAdmin,updateAdmin,deleteAdmin,getAdminById,selectAdmins}  from '../controllers/adminController';
import { authAdminProtect } from '../middleware/authAdminMiddleware';

const router = Router();


/**
 * @swagger
 * /api/admin/data:
 *   post:
 *     summary: Returns the list of all the admins
 *     tags: [Admins]
 *     security:
 *     - adminAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               search:
 *                 type: string
 *                 description: Filter conditions as JSON string
 *                 default: ""
 *               page:
 *                 type: integer
 *                 default: 1
 *                 description: The page number for pagination
 *               limit:
 *                 type: integer
 *                 default: 10
 *                 description: The number of items per page
 *     responses:
 *       200:
 *         description: The list of the admins
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                   default: {}
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 pages:
 *                   type: integer
 *       500:
 *         description: Some server error
 */
router.post('/data', authAdminProtect, selectAdmins);

/**
 * @swagger
 * /api/admin:
 *   post:
 *     summary: Create a new admin
 *     tags: [Admins]
 *     security:
 *     - adminAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: The admin was created successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Some server error
 */
router.post('/', authAdminProtect, createAdmin);

/**
 * @swagger
 * /api/admin/{id}:
 *   put:
 *     summary: Update a admin by ID
 *     tags: [Admins]
 *     security:
 *     - adminAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The admin ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: The admin was updated successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Admin not found.
 *       500:
 *         description: Some server error
 */
router.put('/:id', authAdminProtect, updateAdmin);

/**
 * @swagger
 * /api/admin/{id}:
 *   delete:
 *     summary: Delete a admin by ID
 *     tags: [Admins]
 *     security:
 *     - adminAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The admin ID
 *     responses:
 *       200:
 *         description: The admin was deleted successfully.
 *       404:
 *         description: Admin not found.
 *       500:
 *         description: Some server error
 */
router.delete('/:id', authAdminProtect, deleteAdmin);

/**
 * @swagger
 * /api/admin/{id}:
 *   get:
 *     summary: Get a admin by ID
 *     tags: [Admins]
 *     security:
 *     - adminAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The admin ID
 *     responses:
 *       200:
 *         description: The admin was retrieved successfully.
 *       404:
 *         description: Admin not found.
 *       500:
 *         description: Some server error
 */
router.get('/:id', authAdminProtect, getAdminById);


export default router;
