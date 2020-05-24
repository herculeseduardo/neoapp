const jsonwebtoken = require('jsonwebtoken')

module.exports = {
  sign: data => {
    return jsonwebtoken.sign(data, process.env.JWT_SECRET_KEY, {
      expiresIn: parseInt(process.env.JWT_IAT)
    })
  },
  verify: (...args) => jsonwebtoken.verify(...args),
  decode: (...args) => jsonwebtoken.decode(...args)
}
