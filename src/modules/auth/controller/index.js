const { User } = require('models')
const db = require('models')
const logger = require('helpers/logger')({ context: 'Controller' })
const jwt = require('utils/jwt')
const bcrypt = require('bcrypt')
const errors = require('helpers/errors')

const authController = {}

let transaction

authController.register = async ({ email, password, firstName, lastName }) => {
  try {
    //await db.sequelize.sync({ force: true })
    transaction = await db.sequelize.transaction()

    const user = await User.create(
      { email, password, firstName, lastName },
      { transaction }
    )

    const token = jwt.sign({ id: user.id })

    await transaction.commit()

    return { jwt: token }
  } catch (err) {
    logger.info(err)
    await transaction.rollback()
    throw err
  }
}

authController.login = async ({ email, password }) => {
  const user = await User.findOne({
    where: {
      email
    }
  })
  if (!user) throw errors.buildError('ERR_LOGIN_FAILURE')

  if (!bcrypt.compareSync(password || '', user.password)) {
    throw errors.buildError('ERR_LOGIN_FAILURE')
  }
  const token = jwt.sign({ id: user.id })

  return { jwt: token }
}

module.exports = {
  ...authController
}
