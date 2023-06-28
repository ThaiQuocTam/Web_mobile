import db from "../models/index"
import bcrypt from "bcryptjs"

const salt = bcrypt.genSaltSync(10)


let handleUserLogin = async (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isExist = await checkUserEmail(email)
            if (isExist) {
                let user = await db.nguoi_dung.findOne({
                    attributes: ['id', 'Email', 'Id_phan_quyen', 'Mat_khau'],
                    where: { Email: email },
                    raw: true
                })
                if (user) {
                    let check = await bcrypt.compareSync(password, user.Mat_khau)
                    // let check = true
                    if (check) {
                        userData.errCode = 0,
                            userData.errMessage = 'Đăng nhập thành công',

                            delete user.Mat_khau,
                            userData.user = user
                    }
                    else {
                        userData.errCode = 2,
                            userData.errMessage = 'Mật khẩu không chính xác'

                    }
                } else {
                    //asd
                    userData.errCode = 3,
                        userData.errMessage = 'Không tìm thấy người dùng';
                }
            } else {
                userData.errCode = 1,
                    userData.errMessage = `Email không tồn tại. Vui lòng thử lại`;
            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

const checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.nguoi_dung.findOne({
                where: { Email: userEmail }
            })
            if (user) {
                resolve(true)
            }
            else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

const handleRegister = (data) => {

    return new Promise(async (resolve, reject) => {
        let signUpMessage = {}
        try {
            let checkEmail = await db.nguoi_dung.findOne({
                where: { Email: data.Email }
            })
            let checkPhone = await db.nguoi_dung.findOne({
                where: { Dien_thoai: data.Dien_thoai }
            })
            if (checkEmail) {
                signUpMessage.errCode = '2'
                signUpMessage.message = 'Email đã tồn tại'
            } else {
                if (checkPhone) {
                    signUpMessage.errCode = '3'
                    signUpMessage.message = 'Số điện thoại này đã đăng kí'
                } else {
                    if (data.Dien_thoai.length > 12 || data.Dien_thoai.length < 10) {
                        signUpMessage.errCode = '4'
                        signUpMessage.message = 'Số điện thoại không hợp lệ'
                    } else {

                        const hashPasswordBcrypt = await hashPassword(data.Mat_khau)
                        await db.nguoi_dung.create({
                            Ho_ten: data.Ho_ten,
                            Email: data.Email,
                            Dien_thoai: data.Dien_thoai,
                            Mat_khau: hashPasswordBcrypt,
                            Gioi_tinh: data.Gioi_tinh === '1' ? true : false,
                            Id_phan_quyen: data.Id_phan_quyen
                        })
                        signUpMessage.errCode = '0'
                        signUpMessage.message = 'Them thanh cong'
                    }
                }
            }

            resolve(signUpMessage)
        } catch (e) {
            signUpMessage.errCode = '2'
            signUpMessage.message = 'Them that bai'
            reject(signUpMessage)
        }
    })
}

const hashPassword = (Mat_khau) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPassword = await bcrypt.hashSync(Mat_khau, salt)
            resolve(hashPassword)
        } catch (e) {
            reject(e)
        }
    })
}

const checkUserPhone = async (Dien_thoai) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.nguoi_dung.findOne({
                where: { Dien_thoai: Dien_thoai }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

export { handleUserLogin, checkUserEmail, handleRegister }