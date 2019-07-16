const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: false
      }
    },
    password: DataTypes.STRING,
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: [0, 50]
      }
    },
    lastName: {
      type: DataTypes.STRING(50),
      validate: {
        len: [0, 50]
      }
    }
  }, {
    paranoid: true
  })
  User.beforeCreate((user, options) => {
    return bcrypt.hash(user.password, 10)
      .then(hash => {
        user.password = hash
      })
      .catch(err => {
        if (err) throw new Error()
      })
  })
  User.associate = (models) => {
    // associations can be defined here
  }
  return User
}
