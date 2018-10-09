const rd = require('redis');
const redis = rd.createClient({host: process.env.REDIS_HOST})
redis.auth(process.env.REDIS_PASSWORD)

const getData = (key) => {
  return new Promise((resolve, reject) => {
    redis.get(key, ((err, result) => {
      if (err) reject(err)
      if (result) {
        resolve(JSON.parse(result))
      } else {
        resolve(false)
      }
    }))
  })
}

const setData = (key, data) => redis.set(key, JSON.stringify(data))

const deleteData = (key) => redis.del(key)


module.exports = {
  getData,
  setData,
  deleteData,
}
