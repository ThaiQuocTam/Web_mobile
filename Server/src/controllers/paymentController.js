import { raw } from "body-parser"
import e from "express"
import db from "../models"
import paymentService from '../services/paymentService'

const express = require('express')

const handlePostPayment = async (req, res) => {
    try {
        let payment = {
            order: req.body.order,
            orderDetail: req.body.orderDetail
        }
        if (!payment) {
            return res.status(500).json({
                errCode: '1',
                message: 'Chưa đủ thông tin'
            })
        } else {
            let messagePostOrder = await paymentService.postPaymentServicer(payment)
            if (messagePostOrder) {
                payment.orderDetail.map((item) => {
                    item.Id_HD = messagePostOrder.infoOrder.dataValues.id
                })
                let messagePostOrderDetail = await paymentService.postOrderDetail(payment.orderDetail)
                if (messagePostOrderDetail && messagePostOrderDetail.errCode !== '0') {
                    await db.hoa_don.destroy({
                        where: { id: messagePostOrder.infoOrder.dataValues.id }
                    })
                    return res.status(200).json({
                        errCode: messagePostOrderDetail.errCode,
                        message: messagePostOrderDetail.message
                    })
                }
                else {
                    return res.status(200).json({
                        errCode: messagePostOrderDetail.errCode,
                        message: messagePostOrderDetail.message
                    })
                }
            }
            else {
                return res.status(500).json({
                    errCode: '6',
                    message: 'Đặt hàng không thành công'
                })
            }
        }


    } catch (e) {
    }
}

const handleGetInfoOder = async (req, res) => {
    try {
        let data = await db.hoa_don.findAll({
            order: [
                ['updatedAt', 'DESC']
            ],
            raw: true
        })
        return res.status(200).json(data)
    } catch (e) {
    }
}

const handleGetInfoOrderDetail = async (req, res) => {
    try {
        if (req.query.Id_HD) {
            let data = await db.chi_tiet_hd.findAll({
                where: { Id_HD: req.query.Id_HD },
                raw: true
            })

            data ? res.status(200).json(data) : res.status(200).json({ errCode: '1', message: 'Không tìm thấy' })
        }
    } catch (e) { }
}

const handleHasReceived = async (req, res) => {
    try {
        if (req.body.id) {
            let checkBill = await db.hoa_don.findOne({
                where: { id: req.body.id },
                raw: true
            })
            if (checkBill && checkBill.Trang_thai === 5) {
                db.hoa_don.update(
                    {
                        Ho_ten: checkBill.Ho_ten,
                        Email: checkBill.Email,
                        Dia_chi_nhan_hang: checkBill.Dia_chi_nhan_hang,
                        Tong_tien: checkBill.Tong_tien,
                        Trang_thai: 8,
                        So_dien_thoai: checkBill.So_dien_thoai,
                        Ghi_chu: checkBill.Ghi_chu,
                        Id_nguoi_dung: checkBill.Id_nguoi_dung
                    },
                    {
                        where: { id: checkBill.id }
                    }
                )

                return res.status(200).json({
                    errCode: 0,
                    message: 'Xác nhận đã nhận hàng thành công'
                })
            }
            else {
                return res.status(400).json({
                    errCode: 1,
                    message: 'Lỗi'
                })
            }
        }
    } catch (e) { }
}

const handleConfirmOrder = async (req, res) => {
    try {
        if (req.body.id) {
            let check = await db.hoa_don.findOne({
                where: { id: req.body.id },
                raw: true
            })
            if (check) {
                await db.hoa_don.update({
                    Ho_ten: check.Ho_ten,
                    Email: check.Email,
                    Dia_chi_nhan_hang: check.Dia_chi_nhan_hang,
                    Tong_tien: check.Tong_tien,
                    Trang_thai: 5,
                    So_dien_thoai: check.So_dien_thoai,
                    Ghi_chu: check.Ghi_chu,
                    Id_nguoi_dung: check.Id_nguoi_dung
                },
                    {
                        where: { id: check.id }
                    })
                return res.status(200).json({
                    errCode: 0,
                    message: 'Đã xác nhận'
                })
            } else {
                return res.status(200).json({
                    errCode: 1,
                    message: 'Không tìm thấy hóa đơn'
                })
            }

        }

    } catch (e) { }
}

const handleDeleteOrder = async (req, res) => {
    try {
        if (req.body.id) {
            let check = await db.hoa_don.findOne({
                where: { id: req.body.id },
                raw: true
            })
            if (check) {
                if (check.Trang_thai === 8) {
                    await db.hoa_don.destroy({
                        where: { id: check.id }
                    })
                    await db.chi_tiet_hd.destroy({
                        where: { Id_HD: check.id }
                    })

                    return res.status(200).json({
                        errCode: 0,
                        message: 'Xóa thành công'
                    })
                }
                else {
                    return res.status(200).json({
                        errCode: 1,
                        message: 'Hóa đơn chưa nhận hàng'
                    })
                }
            } else {
                return res.status(200).json({
                    errCode: 2,
                    message: 'Không tìm thấy hóa đơn'
                })
            }
        }
    }
    catch (e) { }
}

module.exports = {
    handlePostPayment: handlePostPayment,
    handleGetInfoOder: handleGetInfoOder,
    handleGetInfoOrderDetail: handleGetInfoOrderDetail,
    handleHasReceived: handleHasReceived,
    handleConfirmOrder: handleConfirmOrder,
    handleDeleteOrder: handleDeleteOrder
}
