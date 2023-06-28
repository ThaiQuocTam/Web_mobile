import bcrypt from "bcryptjs"
import db from '../models/index'

const salt = bcrypt.genSaltSync(10)

const createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPasswordFromBcrypt = await hashUserPassword(data.Mat_khau)
            await db.nguoi_dung.create({
                Ho_ten: data.Ho_ten,
                Email: data.Email,
                Dien_thoai: data.Dien_thoai,
                Ten_tai_khoan: data.Ten_tai_khoan,
                Mat_khau: hashPasswordFromBcrypt,
                Gioi_tinh: data.Gioi_tinh === '1' ? true : false,
                Id_phan_quyen: data.Id_phan_quyen,
            })

            resolve('create a new user succeed')

        } catch (e) {
            reject(e)
        }
    })

    console.log("data form serviceks");
    console.log(data);
    console.log(hashPasswordFromBcrypt);
}

const hashUserPassword = (Mat_khau) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPassword = await bcrypt.hashSync(Mat_khau, salt)
            resolve(hashPassword)
        } catch (e) {
            reject(e)
        }
    })
}

const getAllNguoiDung = () => {
    return new Promise((resolve, reject) => {
        try {
            const user = db.nguoi_dung.findAll({
                raw: true
            })
            resolve(user)
        } catch (e) {
            console.log("khong lay duoc nguoi dung : ", e);
            reject(e)
        }
    })
}

const getUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.nguoi_dung.findOne({
                where: { id: userId }
            })

            if (user) {
                resolve(user)
            }
            else {
                resolve({})
            }
        }
        catch (e) {
            reject(e)
        }
    })
}

const updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.nguoi_dung.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.Ho_ten = data.Ho_ten;
                user.Email = data.Email;
                user.Dien_thoai = data.Dien_thoai;
                user.Mat_khau = data.Mat_khau;
                user.Ten_tai_khoan = data.Ten_tai_khoan;
                user.Gioi_tinh = data.Gioi_tinh;
                user.Id_phan_quyen = data.Id_phan_quyen

                await user.save()
                resolve()
            }
            else {
                console.log('Loix');
                resolve()
            }
        } catch (e) {
            console.log(e);
            reject()
        }
    })
}

const deleteUser = (idUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.nguoi_dung.findOne({
                where: { id: idUser }
            })

            if (user) {
                await user.destroy()
            }
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

export { createNewUser, getAllNguoiDung, getUserById, updateUser, deleteUser }