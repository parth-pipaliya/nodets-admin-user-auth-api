import { Router } from 'express';
import {createRole,updateRole,deleteRole,getRoleById,selectRoles}  from '../controllers/roleController';
import { authAdminProtect } from '../middleware/authAdminMiddleware';

const router = Router();


/**
 * @swagger
 * /api/admin/role/data:
 *   post:
 *     summary: Returns the list of all the roles
 *     tags: [Roles]
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
 *         description: The list of the roles
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
router.post('/data', authAdminProtect, selectRoles);

/**
 * @swagger
 * /api/admin/role:
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
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
 *         description: The role was created successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Some server error
 */
router.post('/', authAdminProtect, createRole);

/**
 * @swagger
 * /api/admin/role/{id}:
 *   put:
 *     summary: Update a role by ID
 *     tags: [Roles]
 *     security:
 *     - adminAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The role ID
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
 *         description: The role was updated successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Role not found.
 *       500:
 *         description: Some server error
 */
router.put('/:id', authAdminProtect, updateRole);

/**
 * @swagger
 * /api/admin/role/{id}:
 *   delete:
 *     summary: Delete a role by ID
 *     tags: [Roles]
 *     security:
 *     - adminAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The role ID
 *     responses:
 *       200:
 *         description: The role was deleted successfully.
 *       404:
 *         description: Role not found.
 *       500:
 *         description: Some server error
 */
router.delete('/:id', authAdminProtect, deleteRole);

/**
 * @swagger
 * /api/admin/role/{id}:
 *   get:
 *     summary: Get a role by ID
 *     tags: [Roles]
 *     security:
 *     - adminAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The role ID
 *     responses:
 *       200:
 *         description: The role was retrieved successfully.
 *       404:
 *         description: Role not found.
 *       500:
 *         description: Some server error
 */
router.get('/:id', authAdminProtect, getRoleById);

export default router;
