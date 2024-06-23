import { Router } from 'express';
import {createUser,updateUser,deleteUser,getUserById,selectUsers}  from '../controllers/userController';
import { authProtect } from '../middleware/authMiddleware';

const router = Router();

/**
 * @swagger
 * /api/user/data:
 *   post:
 *     summary: Returns the list of all the users
 *     tags: [Users]
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
 *         description: The list of the users
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
router.post('/data', authProtect, selectUsers);

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
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
 *         description: The user was created successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Some server error
 */
router.post('/', authProtect, createUser);

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
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
 *       '200':
 *         description: The user was updated successfully.
 *       '400':
 *         description: Bad request.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Some server error
 */
router.put('/:id', authProtect, updateUser);

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The user was deleted successfully.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Some server error
 */
router.delete('/:id', authProtect, deleteUser);

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The user was retrieved successfully.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Some server error
 */
router.get('/:id', authProtect, getUserById);


export default router;
