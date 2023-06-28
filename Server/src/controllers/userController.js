import db, { Sequelize } from '../models/index'
const Op = Sequelize.Op
import bcrypt from "bcryptjs"
import { handleUserLogin, handleRegister } from "../services/userService"
const express = require('express')

const handleSignIn = async (req, res) => {
    let email = req.body.Email
    let password = req.body.Mat_khau
    let phanQuyen = req.body.phanQuyen

    if (!email || !password) {
        return res.status(200).json({
            errCode: 1,
            message: 'Vui lòng nhập đầy đủ thông tin'
        })
    }
    else {
        if (phanQuyen === 6) {
            let signInData = await handleUserLogin(email, password)
            return res.status(200).json({
                errCode: signInData.errCode,
                message: signInData.errMessage,
                user: signInData.user ? signInData.user : {}
            })
        }
        else {
            if (phanQuyen === 7) {
                let checkInfo = await db.nguoi_dung.findOne({
                    attributes: ['id', 'Email', 'Id_phan_quyen', 'Mat_khau'],
                    where: { Email: email },
                    raw: true
                })
                if (checkInfo && checkInfo.Id_phan_quyen === 7) {
                    let check = await bcrypt.compareSync(password, checkInfo.Mat_khau)
                    if (check) {
                        delete checkInfo.Mat_khau
                        return res.status(200).json({
                            errCode: 0,
                            message: 'Đăng nhập thành công',
                            info: checkInfo
                        })
                    }
                    else {
                        return res.status(200).json({
                            errCode: 2,
                            message: 'Mật khẩu không chính xác'
                        })
                    }
                }
                else {
                    return res.status(200).json({
                        errCode: 3,
                        message: 'Email không tồn tại'
                    })
                }
            }
        }
    }

}

const handleSignUp = async (req, res) => {

    let Ho_ten = req.body.Ho_ten
    let Email = req.body.Email
    let Mat_khau = req.body.Mat_khau
    let Dien_thoai = req.body.Dien_thoai
    let Gioi_tinh = req.body.Gioi_tinh

    if (!Ho_ten || !Email || !Mat_khau || !Dien_thoai || !Gioi_tinh) {
        return res.status(200).json({
            errCode: 5,
            message: 'Vui lòng nhập đầy đủ thông tin'
        })
    } else {
        let signUpData = await handleRegister(req.body)
        return res.status(200).json({
            errCode: signUpData.errCode,
            message: signUpData.message
        })
    }
}

const handleGetInfoUser = async (req, res) => {
    try {
        let infoUser = await db.nguoi_dung.findOne({
            where: { Email: req.query.Email }
        })
        if (infoUser) {
            return res.status(200).json(infoUser)
        } else {
            return res.status(200).json({
                errCode: '1',
                message: 'Không tìm thấy người dùng'
            })
        }
    } catch (e) {

    }
}
const handleGetAllInfoUser = async (req, res) => {
    try {
        let infoUser = await db.nguoi_dung.findAll({
            order: [
                ['updatedAt', 'DESC']
            ],
            raw: true
        })
        if (infoUser) {
            return res.status(200).json(infoUser)
        } else {
            return res.status(200).json({
                errCode: '1',
                message: 'Không tìm thấy người dùng'
            })
        }
    } catch (e) {

    }
}

const handleGetSearchMember = async (req, res) => {
    try {
        if (req.query.email) {
            const data = await db.nguoi_dung.findAll({
                where: {
                    Email: { [Op.like]: `%${req.query.email}%` }
                },
                default: true,
                order: [
                    ['updatedAt', 'DESC']
                ],
                raw: true,
            });

            if (data) {
                return res.status(200).json(data)
            }
            else {
                return res.status(200).json({
                    errCode: '1',
                    data: data
                })
            }
        }
        else {
        }
    } catch (e) { }
}

const handleDeleteAdmin = async (req, res) => {
    try {
        if (req.body.id) {
            let checkMember = await db.nguoi_dung.findOne({
                where: {
                    id: req.body.id,
                },
                raw: true
            })
            if (checkMember) {
                if (checkMember.Id_phan_quyen === 6) {
                    let checkOrder = await db.hoa_don.findAll({
                        where: { Id_nguoi_dung: checkMember.id },
                        raw: true
                    })
                    if (checkOrder && checkOrder.length !== 0) {
                        let checked = checkOrder.filter((item) => item.Trang_thai !== 8)
                        if (checked && checked.length !== 0) {

                            return res.status(200).json({
                                errCode: 2,
                                message: 'User chưa nhận hàng'
                            })
                        }
                        else {
                            await db.nguoi_dung.destroy({
                                where: { id: checkMember.id }
                            })
                            return res.status(200).json({
                                errCode: 0,
                                message: 'Xóa thành công'
                            })
                        }
                    }
                    else {
                        await db.nguoi_dung.destroy({
                            where: { id: checkMember.id }
                        })
                        return res.status(200).json({
                            errCode: 0,
                            message: 'Xóa thành công'
                        })
                    }
                }
                else {
                    await db.nguoi_dung.destroy({
                        where: { id: checkMember.id }
                    })
                    return res.status(200).json({
                        errCode: 0,
                        message: 'Xóa admin thành công'
                    })
                }
            }
            else {
                return res.status(200).json({
                    errCode: 3,
                    message: 'Không tìm thấy'
                })
            }

        }
    } catch (e) { }
}

module.exports = {
    handleSignIn: handleSignIn,
    handleSignUp: handleSignUp,
    handleGetInfoUser: handleGetInfoUser,
    handleGetAllInfoUser: handleGetAllInfoUser,
    handleGetSearchMember: handleGetSearchMember,
    handleDeleteAdmin: handleDeleteAdmin
}

