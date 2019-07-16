/**
 * @swagger
 * /api/register:
 *   post:
 *     description: Do login
 *     tags:
 *       - auth
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Auth
 *         type: object
 *         schema:
 *           $ref: '#/definitions/Auth'
 *     responses:
 *       200:
 *         description: auths
 *         schema:
 *           $ref: '#/definitions/auth'
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 */
/**
 * @swagger
 * /api/login:
 *   post:
 *     description: Do login
 *     tags:
 *       - auth
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Auth
 *         type: object
 *         schema:
 *           $ref: '#/definitions/Auth'
 *     responses:
 *       200:
 *         description: auths
 *         schema:
 *           $ref: '#/definitions/auth'
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * definitions:
 *   Auth:
 *     required:
 *       - email
 *       - password
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 */

/**
* @swagger
* definitions:
*   auth:
*     properties:
*       jwt:
*         type: string
*/
