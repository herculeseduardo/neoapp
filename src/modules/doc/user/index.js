/**
* @swagger
* definitions:
*   User:
*     type: object
*     required:
*       - id
*       - name
*       - email
*       - lastUpdate
*     properties:
*       id:
*         type: number
*       name:
*         type: string
*       email:
*         type: string
*       lastUpdate:
*         type: number
*   Users:
*     type: array
*     items:
*       $ref: '#/definitions/User'
*/

/**
 * @swagger
 * /api/user:
 *   get:
 *     description: Retrieve the full list of users
 *     tags:
 *       - users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: users
 *         schema:
 *           $ref: '#/definitions/User'
 */

/**
 * @swagger
 * /api/user:
 *   post:
 *     description: Create user
 *     tags:
 *       - users
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Users
 *         type: object
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: user
 *         schema:
 *           $ref: '#/definitions/UserResponse'
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * definitions:
 *   User:
 *     required:
 *       - email
 *       - password
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 */
/**
 * @swagger
 * definitions:
 *   UserResponse:
 *     required:
 *       - email
 *       - password
 *     properties:
 *       email:
 *         type: string
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 */

/**
 * @swagger
 * /api/user/{userId}:
 *   put:
 *     description: Update user
 *     tags:
 *       - users
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Users
 *         type: object
 *         schema:
 *           $ref: '#/definitions/User'
 *       - in: path
 *         name: userId
 *         description: id
 *         required: true
 *     responses:
 *       200:
 *         description: user
 *         schema:
 *           $ref: '#/definitions/UserResponse'
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 */
