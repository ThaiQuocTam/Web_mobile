import e from "express";
import db from "../models"

const handlePostAddProductDetail = async (req, res) => {
    try {
        if (req.body) {
            let checkId = await checkIdProductDetail(req.Id_san_pham)
            if (checkId) {
                return res.status(200).json({
                    errCode: '2',
                    message: 'Id sản phẩm đã tồn tại'
                })
            }
            else {
                let mesAddProductDetail = await db.mo_ta_ct.create({
                    Cong_nghe_man_hinh: req.body.Cong_nghe_man_hinh,
                    Do_phan_giai: req.body.Do_phan_giai,
                    He_dieu_hanh: req.body.He_dieu_hanh,
                    Chip_xu_ly: req.body.Chip_xu_ly,
                    Bo_nho_ROM: req.body.Bo_nho_ROM,
                    RAM: req.body.RAM,
                    Dung_luong_PIN: req.body.Dung_luong_PIN,
                    Hinh_anh: req.body.Hinh_anh,
                    Id_san_pham: req.body.Id_san_pham
                })

                mesAddProductDetail ? res.status(200).json({
                    errCode: '0',
                    message: 'Thêm chi tiết sản phẩm thành công',
                }) : ''
            }
        } else {
            return res.status(200).json({
                errCode: '1',
                message: 'Chưa nhập đủ thông tin'
            })
        }
    } catch (e) {
    }
}

const handleGetInfoProductDetail = async (req, res) => {
    try {
        if (req.query.Id_san_pham) {
            let data = await db.mo_ta_ct.findOne({
                where: { Id_san_pham: req.query.Id_san_pham },
                raw: true
            })
            data ? res.status(200).json({ errCode: '0', info: data }) : res.status(200).json({ errCode: '2', message: 'Không tìm thấy sản phẩm' })
        } else {
            return res.status(200).json({
                errCode: '1',
                message: 'Chưa nhập Id product'
            })
        }
    } catch (e) {
    }
}

const handleGetAllProductDetail = async (req, res) => {
    try {
        let data = await db.mo_ta_ct.findAll({
            raw: true
        })
        data ? res.status(200).json(data) : ''
    } catch (e) { }
}

const checkIdProductDetail = async (id) => {
    if (id) {
        let data = await db.mo_ta_ct.findOne({
            where: { Id_san_pham: id },
            raw: true
        })
        if (data) {
            return true
        } else {
            return false
        }
    }
}

const handleEditInfoProductDetail = async (req, res) => {
    try {
        let Cong_nghe_man_hinh = req.body.Cong_nghe_man_hinh
        let Do_phan_giai = req.body.Do_phan_giai
        let He_dieu_hanh = req.body.He_dieu_hanh
        let Chip_xu_ly = req.body.Chip_xu_ly
        let Bo_nho_ROM = req.body.Bo_nho_ROM
        let RAM = req.body.RAM
        let Dung_luong_PIN = req.body.Dung_luong_PIN
        let Hinh_anh = req.body.Hinh_anh
        if (!Cong_nghe_man_hinh || !Do_phan_giai || !He_dieu_hanh || !Chip_xu_ly || !Bo_nho_ROM || !RAM || !Dung_luong_PIN || !Hinh_anh) {
            return res.status(200).json({
                errCode: '2',
                message: 'Vui lòng nhập đầy đủ dữ liệu'
            })
        }
        else {
            let data = req.body
            let idInfoProductDetail = await db.mo_ta_ct.findOne({
                where: { id: data.id },
                raw: true
            })
            if (idInfoProductDetail) {
                if (idInfoProductDetail.Id_san_pham === data.Id_san_pham) {
                    await db.mo_ta_ct.update({
                        Cong_nghe_man_hinh: data.Cong_nghe_man_hinh,
                        Do_phan_giai: data.Do_phan_giai,
                        He_dieu_hanh: data.He_dieu_hanh,
                        Chip_xu_ly: data.Chip_xu_ly,
                        Bo_nho_ROM: data.Bo_nho_ROM,
                        RAM: data.RAM,
                        Dung_luong_PIN: data.Dung_luong_PIN,
                        Hinh_anh: data.Hinh_anh,
                        Id_san_pham: data.Id_san_pham
                    },
                        { where: { id: data.id } }
                    )

                    return res.status(200).json({
                        errCode: '0',
                        message: 'Chỉnh sửa thành công'
                    })
                }
                else {
                    return res.status(200).json({
                        errCode: '3',
                        message: 'Id_san_pham no defined'
                    })
                }
            }
            else {
                return res.status(200).json({
                    errCode: '1',
                    message: 'Không tìm thấy sản phẩm'
                })
            }
        }
    } catch (e) { }
}

module.exports = {
    handlePostAddProductDetail: handlePostAddProductDetail,
    handleGetInfoProductDetail: handleGetInfoProductDetail,
    handleGetAllProductDetail: handleGetAllProductDetail,
    handleEditInfoProductDetail: handleEditInfoProductDetail
}