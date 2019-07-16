const { User } = require('models')
const db = require('models')
const logger = require('helpers/logger')({ context: 'Controller' })

let userController = {}

let transaction

userController.create = async ({ email, password, firstName, lastName }) => {
  try {
    await db.sequelize.sync({ force: true })
    transaction = await db.sequelize.transaction()
    await User.create({ email, password, firstName, lastName }, { transaction })
    await transaction.commit()
  } catch (err) {
    logger.info(err)
    if (err) await transaction.rollback()
  }
}

module.exports = {
  userController
}
