const redis = require('redis')
const { REDIS_CONF } = require('../config/db');


//创建客户端
const redisClint = redis.createClient(REDIS_CONF)
redisClint.on('error', err => {
    console.error(err)
})

module.exports = redisClint