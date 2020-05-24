module.exports = {
  production: {
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    database: process.env.DATABASE_NAME || 'neoapp',
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT || 5432,
    dialect: 'postgres',
    pool: {
      max: process.env.DATABASE_POOL_MAX || 5,
      idle: process.env.DATABASE_POOL_IDLE || 10000,
      acquire: process.env.DATABASE_POOL_ACQUIRE || 30000
    }
  },
  development: {
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    database: process.env.DATABASE_NAME || 'neoapp',
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT || 5432,
    dialect: 'postgres',
    pool: {
      max: process.env.DATABASE_POOL_MAX || 5,
      idle: process.env.DATABASE_POOL_IDLE || 10000,
      acquire: process.env.DATABASE_POOL_ACQUIRE || 30000
    }
  },
  test: {
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    database: process.env.DATABASE_NAME || 'neoapp',
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT || 5432,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 50,
      idle: 30000,
      acquire: 60000
    }
  }
}
