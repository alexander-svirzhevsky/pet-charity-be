const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const userController = require("../../controllers/user");

/**
 * @swagger
 * tags:
 *   name: Registration
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     name: Registration
 *     summary: Register  a user
 *     tags: [Registration]
 *     consumes:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *               email:
 *                 type: string
 *           example:
 *                {
 *                   "email":"alexander@gmail.com",
 *                   "password":"123123123",
 *                   "confirmPassword":"123123123",
 *                   "name":"alexander",
 *                }
 *         required:
 *           - username
 *           - password
 *     responses:
 *        '200':
 *         description: Return token
 *         content:
 *           application/json; charset=utf-8:
 *             schema:
 *               type: object
 *               properties:
 *                token:
 *                  type: string
 *             example: {"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJ1bml2ZXJzZXp4Y3ZAZ21haWwuY29tIiwiaWF0IjoxNTY4MDIzMjAyLCJleHAiOjE1NjgwMjMyMzh9._apV-RyrCHS0miAE0S9pt-06t6x3Xty-skuIWuLGp_k"}
 */

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  userController.register
);

module.exports = router;
