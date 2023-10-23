const jwt = require ('jsonwebtoken')

// Thông báo truy cập
const genneralAccessToken = async (payload) => {
    console.log('payload',payload)
    const access_token = jwt.sign({
     payload
   }, 'access_token' , { expiresIn: '1h'})

   return access_token
}
// Thông báo làm mới cấp (fresh) truy cập
const genneralRefreshToken = async (payload) => {
    const access_token = jwt.sign({
     payload
   }, 'fresh_token' , { expiresIn: '365d'})

   return access_token
}
module.exports = {
    genneralAccessToken,
    genneralRefreshToken
}