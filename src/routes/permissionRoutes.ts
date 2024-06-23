import { Router } from 'express';
import {createPermission,updatePermission,deletePermission,getPermissionById,selectPermissions}  from '../controllers/permissionController';
import { authAdminProtect } from '../middleware/authAdminMiddleware';

const router = Router();

/**
 * @swagger
 * /api/admin/permission/data:
 *   post:
 *     summary: Returns the list of all the permissions
 *     tags: [Permissions]
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
 *         description: The list of the permissions
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
router.post('/data', authAdminProtect, selectPermissions);

/**
 * @swagger
 * /api/admin/permission:
 *   post:
 *     summary: Create a new permission
 *     tags: [Permissions]
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
 *         description: The permission was created successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Some server error
 */
router.post('/', authAdminProtect, createPermission);

/**
 * @swagger
 * /api/admin/permission/{id}:
 *   put:
 *     summary: Update a permission by ID
 *     tags: [Permissions]
 *     security:
 *     - adminAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The permission ID
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
 *         description: The permission was updated successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Permission not found.
 *       500:
 *         description: Some server error
 */
router.put('/:id', authAdminProtect, updatePermission);

/**
 * @swagger
 * /api/admin/permission/{id}:
 *   delete:
 *     summary: Delete a permission by ID
 *     tags: [Permissions]
 *     security:
 *     - adminAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The permission ID
 *     responses:
 *       200:
 *         description: The permission was deleted successfully.
 *       404:
 *         description: Permission not found.
 *       500:
 *         description: Some server error
 */
router.delete('/:id', authAdminProtect, deletePermission);

/**
 * @swagger
 * /api/admin/permission/{id}:
 *   get:
 *     summary: Get a permission by ID
 *     tags: [Permissions]
 *     security:
 *     - adminAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The permission ID
 *     responses:
 *       200:
 *         description: The permission was retrieved successfully.
 *       404:
 *         description: Permission not found.
 *       500:
 *         description: Some server error
 */
router.get('/:id', authAdminProtect, getPermissionById);

export default router;
