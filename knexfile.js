const { DATABASE_URL } =  require('./configVars')
module.exports = {
  development: {
    client: 'pg',
    connection: DATABASE_URL,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
  },

  staging: {
    client: 'pg',
    connection: DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
  },

  production: {
    client: 'pg',
    connection: DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
  }

};


