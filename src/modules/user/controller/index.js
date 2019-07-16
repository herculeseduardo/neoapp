const { User } = require('models')
const db = require('models')
const logger = require('helpers/logger')({ context: 'Controller' })

let userController = {}

let transaction

userController.create = async ({ email, password, firstName, lastName }) => {
  try {
    // await db.sequelize.sync({ force: true })
    transaction = await db.sequelize.transaction()
    await User.create({ email, password, firstName, lastName }, { transaction })
    await transaction.commit()
  } catch (err) {
    logger.info(err)
    if (err) await transaction.rollback()
  }
}

userController.list = async () => {
  const users = await User.findAll({
    attributes: {
      exclude: ['password']
    }
  })
  return users
}

userController.update = async ({ id, email, password, firstName, lastName }) => {
  try {
    transaction = await db.sequelize.transaction()
    const userFetch = await User.findOne({
      where: {
        id: id
      }
    }, {
      transaction
    })

    if (!userFetch) throw new Error('Not found')

    await userFetch.update({
      email, password, firstName, lastName
    }, { transaction })

    await transaction.commit()
  } catch (err) {
    logger.info(err)
    await transaction.rollback()
  }
}

module.exports = {
  userController
}
