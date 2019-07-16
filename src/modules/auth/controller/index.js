const { User } = require('models')
const db = require('models')
const logger = require('helpers/logger')({ context: 'Controller' })
const jwt = require('utils/jwt')
const bcrypt = require('bcrypt')
const errors = require('helpers/errors')

let authController = {}

let transaction

authController.register = async ({ email, password, firstName, lastName }) => {
  try {
    // await db.sequelize.sync({ force: true })
    transaction = await db.sequelize.transaction()

    let user = await User.create({ email, password, firstName, lastName }, { transaction })

    let token = jwt.sign({ id: user.id, role: user.role })

    await transaction.commit()

    return { jwt: token }
  } catch (err) {
    logger.info(err)
    await transaction.rollback()
  }
}

authController.login = async ({ email, password }) => {
  try {
    const user = await User.findOne({
      where: {
        email
      }
    })
    if (!user) throw errors.buildError('ERR_LOGIN_FAILURE')

    if (!bcrypt.compareSync(password || '', user.password)) {
      throw errors.buildError('ERR_LOGIN_FAILURE')
    }
    let token = jwt.sign({ id: user.id, role: user.role })

    return { jwt: token }
  } catch (err) {
    throw err
  }
}

module.exports = {
  ...authController
}
