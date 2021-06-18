const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const auth = require("../../middleware/auth");
const authController = require("../../controllers/auth");

router.get("/", auth, authController.getAuthUser);

/**
 * @swagger
 * tags:
 *   name: Authorization
 */

/**
 * @swagger
 * /api/auth:
 *   post:
 *     name: Login
 *     summary: Logs in a user
 *     tags: [Authorization]
 *     consumes:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *           example:
 *            {
 *              "email":"slavasgod@gmail.com",
 *              "password":"123123123"
 *             }
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
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  authController.login
);

/**
 *
 * @swagger
 * /api/auth/forgot-password:
 *  put:
 *     name: Forgot Password
 *     summary: Send request for changing password
 *     tags: [Authorization]
 *     consumes:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *           example:
 *            {
 *              "email":"admin@admin.com"
 *            }
 *         required:
 *           - email
 *     responses:
 *        '200':
 *         description: Mail sent to the email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                status:
 *                  type: string
 *                statusMessage:
 *                  type: string
 *                message:
 *                  type: string
 *         example: {
 *            "message":"Ok",
 *            "statusCode":"200",
 *            "data":"Mail sent"
 *          }
 *        '404':
 *         description: Bad request. User with this email does not exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                statusCode:
 *                  type: string
 *                message:
 *                  type: string
 *         example: {"statusCode": "404","message": "User with this email does not exists","errors": []}
 * */

router.put(
  "/forgot-password",
  [check("email", "Please include a valid email").isEmail()],
  authController.forgotPassword
);

/**
 * @swagger
 * /api/auth/reset-password:
 *   put:
 *     name: Change password
 *     summary: Change user password
 *     tags: [Authorization]
 *     consumes:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPass:
 *                 type: string
 *               resetLink:
 *                 type: string
 *           example:
 *            {
 *              "newPass":"123123123",
 *              "resetLink":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVFJ9.eyJ1c2VyIjp7ImlkIjoiNjBaMGNmZTgzZDMxYjIyYmZjYmE5NzVkIn0sImlhdCI6MTYyNDAxMzgxNSwiZXhwIjoxNjI0MzczODE1fQ.15IEsu_lwdZEcqblpN4-htR9XEPptr977KooASIXMdM"
 *             }
 *         required:
 *           - newPass
 *           - resetLink
 *     responses:
 *        '200':
 *         description: Success
 */
router.put("/reset-password", authController.resetPassword);

module.exports = router;
