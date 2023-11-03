const jwt = require ('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
// Thông báo truy cập
const genneralAccessToken = async (payload) => {
    console.log('payload',payload)
    const access_token = jwt.sign({
     payload
   }, process.env.ACCESS_TOKEN , { expiresIn: '30s'})

   return access_token
}
// Thông báo làm mới cấp (fresh) truy cập
const genneralRefreshToken = async (payload) => {
    const refresh_token = jwt.sign({
     payload
   }, process.env.REFRESH_TOKEN , { expiresIn: '365d'})

   return refresh_token
}

const refreshTokenJwtService =(token) => {
  return new Promise((resolve, reject) => {
    try {
        console.log('token', token)
        jwt.verify(token, process.env.REFRESH_TOKEN,async(err,user) => {
          if(err){
            resolve({
              status: 'ERROR',
              message: 'The authemtication'
            })
          }
          const { payload } = user
          const access_token = await genneralAccessToken({
            id: payload?.id,
            isAdmin: payload?.isAdmin
          })
          resolve({
              status: 'OK',
              message: 'Thành công',
              access_token
          })
        })
    } catch (e) {
        reject(e)
    }
})
}
module.exports = {
    genneralAccessToken,
    genneralRefreshToken,
    refreshTokenJwtService
}