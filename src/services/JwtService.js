const jwt = require ('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
// Thông báo truy cập
const genneralAccessToken = async (payload) => {
    console.log('payload',payload)
    const access_token = jwt.sign({
     payload
   }, process.env.ACCESS_TOKEN , { expiresIn: '1h'})

   return access_token
}
// Thông báo làm mới cấp (fresh) truy cập
const genneralRefreshToken = async (payload) => {
    const refresh_token = jwt.sign({
     payload
   }, process.env.REFRESH_TOKEN , { expiresIn: '365d'})

   return refresh_token
}
module.exports = {
    genneralAccessToken,
    genneralRefreshToken
}