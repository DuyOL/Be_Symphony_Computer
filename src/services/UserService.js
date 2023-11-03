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
                    message:'Đăng kí Thành Công',
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
            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
                resolve({
                    status: 'OK',
                    message:'Đăng nhập Thành Công',
                    access_token,
                    refresh_token
                })
        }catch(e){
            reject(e)
        }
   })
}
// Update tài khoản
const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'Người dùng không được xác định'
                })
            }
            if (data.password) {
                // hash a password băm mật khẩu ra ký tự đặc biệt lưu vào data
                data.password = bcrypt.hashSync(data.password, 10);
            }
            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'Đã cập nhập tài khoản',
                data: updatedUser
            })
        } catch (e) {
            reject(e)
        }
    })
}
// Delete tài khoản
const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'Người dùng không được xác định'
                })
            }
            await User.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Đã xoá tài khoản thành công',
            })
        } catch (e) {
            reject(e)
        }
    })
}
// Nhận tất cả người dùng
const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find()
            resolve({
                status: 'OK',
                message: 'Thành công',
                data: allUser
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id
            })
            if (user === null) {
                resolve({
                    status: 'ERR',
                    message: 'Người dùng không được xác định'
                })
            }
            resolve({
                status: 'OK',
                message: 'Thành công',
                data: user
            })
        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser
}