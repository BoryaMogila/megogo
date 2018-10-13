let package = require('../package');
module.exports = {
    app: {
        name: package.name,
        version: package.version
    },
    server: {
        port: process.env.NODE_APP_INSTANCE || 8081,
        lifeTime: process.env.NODE_LIFE_TIME || '', // For auto rebooting features use 'ms','m','s','h','d' suffix for this variable, for example 12h
    },
  database: {
    master: {
      host: '10.1.18.111',
      user: 'master',
      password: 'gtnhjdbx',
      port: '3306',
      database: 'test',
      debug: false,
      connectionLimit: 10,
    },
  },
    worker: process.env.NODE_WORKER_NAME,
    rabbitMq: {
        host: "127.0.0.1",
        port: 5672,
        options: {durable: true},
        queue: process.env.NODE_QUEUE_NAME,
        user: "myuser",
        password: "mypass"
    }
};