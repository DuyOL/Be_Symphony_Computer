const User = require("../models/UserModel")
const bcrypt = require("bcrypt")
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService")

// Tạo tài khoản
const createUser = (newUser) => {
    return new Promise(async(resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser
        try{
            const checkUser = await User.findOne({
                email: email
            })
            // Check email đã tồn tại hay chưa 
            if(checkUser !== null){
                resolve({
                    status: 'OK',
                    message: 'Email đã tồn tại'
                })
            }
            // hash a password băm mật khẩu ra ký tự đặc biệt lưu vào data
            const hash = bcrypt.hashSync(password, 10);
            const createdUser = await User.create({
                name,
                email,
                password :hash,
                phone
            })
            if(createdUser){
                resolve({
                    status: 'OK',
                    message:'Thành Công',
                    data: createdUser
                })
            }
        }catch(e){
            reject(e)
        }
   })
}
// Đăng nhập tài khoản
const loginUser = (userLogin) => {
    return new Promise(async(resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = userLogin
        try{
            const checkUser = await User.findOne({
                email: email
            })
            // Check email đã tồn tại hay chưa 
            if(checkUser === null){
                resolve({
                    status: 'OK',
                    message: 'Email không có trong database'
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password )
            // check mật khẩu có đúng hay không
            if(!comparePassword){
                resolve({
                    status: 'OK',
                    message: 'Mật khẩu hoặc người dùng không chính xác'
                })
            }
            const access_token =  await genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            const fresh_token = await genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
                resolve({
                    status: 'OK',
                    message:'Thành Công',
                    access_token,
                    fresh_token
                })
        }catch(e){
            reject(e)
        }
   })
}
module.exports = {
    createUser,
    loginUser
}