const Product = require("../models/ProductModel")

// Tạo sản phẩm
const createProduct = (newProduct) => {
    return new Promise(async(resolve, reject) => {
        const { name, image, type, price, countInStock ,rating ,description } = newProduct
        try{
            const checkProduct = await Product.findOne({
                name: name
            })
            // Check email đã tồn tại hay chưa 
            if(checkProduct !== null){
                resolve({
                    status: 'OK',
                    message: 'Tên Sản phẩm đã tồn tại'
                })
            }
            const newProduct = await Product.create({
                name,
                image,
                type,
                price,
                countInStock ,
                rating ,
                description 
            })
            if(newProduct){
                resolve({
                    status: 'OK',
                    message:'Đăng kí Thành Công',
                    data: newProduct
                })
            }
        }catch(e){
            reject(e)
        }
   })
}
// Update sản phẩm
const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if (checkProduct === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not defined'
                })
            }

            const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedProduct
            })
        } catch (e) {
            reject(e)
        }
    })
}
const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if (checkProduct === null) {
                resolve({
                    status: 'OK',
                    message: 'Người dùng không được xác định'
                })
            }
            await Product.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Đã xoá sản phẩm thành công',
            })
        } catch (e) {
            reject(e)
        }
    })
}
const getDetailsProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id
            })
            if (product === null) {
                resolve({
                    status: 'OK',
                    message: 'The product is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: product
            })
        } catch (e) {
            reject(e)
        }
    })
}
const getAllProduct = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allProduct = await Product.find()
            resolve({
                status: 'OK',
                message: 'Thành công',
                data: allProduct
            })
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct
}