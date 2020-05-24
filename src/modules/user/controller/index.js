const { User } = require('models')
const db = require('models')
const logger = require('helpers/logger')({ context: 'Controller' })
const { ResourceNotFoundError } = require('helpers/errors')

const userController = {}

let transaction

userController.create = async ({ email, password, firstName, lastName }) => {
  try {
    // await db.sequelize.sync({ force: true })
    transaction = await db.sequelize.transaction()
    await User.create({ email, password, firstName, lastName }, { transaction })
    await transaction.commit()
  } catch (err) {
    logger.info(err)
    await transaction.rollback()
    throw err
  }
}

userController.list = async ({ limit = 10, offset = 0 }) => {
  const users = await User.findAll({
    offset,
    limit,
    attributes: {
      exclude: ['password']
    }
  })
  return users
}

userController.update = async ({
  id,
  email,
  password,
  firstName,
  lastName
}) => {
  try {
    transaction = await db.sequelize.transaction()
    const userFetch = await User.findOne(
      {
        where: {
          id: id
        }
      },
      {
        transaction
      }
    )

    if (!userFetch) throw new Error('Not found')

    await userFetch.update(
      {
        email,
        password,
        firstName,
        lastName
      },
      { transaction }
    )

    await transaction.commit()
  } catch (err) {
    logger.info(err)
    await transaction.rollback()
    throw err
  }
}

userController.delete = async ({ id }) => {
  try {
    transaction = await db.sequelize.transaction()
    const userFetch = await User.findOne(
      {
        where: {
          id: id
        }
      },
      {
        transaction
      }
    )

    if (!userFetch) throw new Error('Not found')

    await userFetch.destroy({ id }, { transaction })

    await transaction.commit()
  } catch (err) {
    logger.info(err)
    await transaction.rollback()
    throw err
  }
}

userController.findById = async ({ id }) => {
  const userFetch = await User.findOne({
    where: {
      id: id
    },
    attributes: {
      exclude: ['password']
    }
  })

  if (!userFetch) throw new ResourceNotFoundError(`user with id ${id}`, 'hhhh')

  return userFetch
}

module.exports = {
  userController
}
