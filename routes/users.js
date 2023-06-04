/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - username
 *         - password
 *         - isAdmin
 *         - isMember
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         firstName:
 *           type: string
 *           description: the first name of the user
 *         lastName:
 *           type: string
 *           description: the last name of the user
 *         username:
 *           type: string
 *           description: the username choosen by the user
 *         password:
 *           type: string
 *           description: the password choosen by the user
 *         isAdmin:
 *           type: boolean
 *           description: Whether the user has admin access or not
 *         isMember:
 *           type: boolean
 *           description: Whether the user has membership access or not
 *       example:
 *         id: d5fE_asz
 *         firstName: Lorem
 *         lastName: Ipsum
 *         username: loremipsum123
 *         password: 12345678
 *         isAdmin: false
 *         isMember: true
 */
/**
 * @swagger
 * tags:
 *   name: User
 *   description: The user managing API
 * /user:
 *   post:
 *     summary: Create a new user
 *     tags: [user]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The created User.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: No response
 *
 */
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('respond with a resource');
});

module.exports = router;
