const { Joi } = require('celebrate')
const joiObjectId = require('joi-objectid')

// add joi-objectId to Joi
Joi.objectId = joiObjectId(Joi)

const authSchema = Joi.object().keys({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(7).required()
}).options({ abortEarly: false })

module.exports = {
  authSchema
}
