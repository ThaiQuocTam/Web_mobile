import { where } from 'sequelize'
import db, { Sequelize } from '../models/index'
import productsService from '../services/productsService'
const Op = Sequelize.Op

const handleAddProduct = async (req, res) => {
    let Ten_san_pham = req.body.Ten_san_pham
    let Hinh_anh = req.body.Hinh_anh
    let Gia_san_pham = req.body.Gia_san_pham
    let So_luong_SP = req.body.So_luong_SP
    let Thong_tin_bao_hanh = req.body.Thong_tin_bao_hanh
    let Ghi_chu = req.body.Ghi_chu
    let Id_loai_SP = req.body.Id_loai_SP
    let Id_nhom_SP = req.body.Id_nhom_SP

    if (!Ten_san_pham || !Hinh_anh || !Gia_san_pham || !So_luong_SP || !Id_loai_SP || !Id_nhom_SP) {
        return res.status(200).json({
            errCode: '2',
            message: 'Vui lòng nhập đầy đủ thông tin'
        })
    }
    else {
        let response = await productsService.addProduct(req.body)
        return res.status(200).json({
            errCode: response.errCode,
            message: response.message
        })
    }
}

const handleGetProductType = async (req, res) => {
    try {
        let listProductType = await db.loai_sp.findAll()
        return res.status(200).json(listProductType)
    } catch (e) {
        console.log('Lỗi product-type : ', e);
    }
}

const handleGetProductGroup = async (req, res) => {
    try {
        let listProductGroup = await db.nhom_sp.findAll({
            raw: true
        })
        return res.status(200).json(listProductGroup)
    } catch (e) {
        console.log('Lỗi product-group : ', e);
    }
}

const handleGetProduct = async (req, res) => {
    try {
        let param = parseInt(req.query.limit)
        if (param) {
            let lisProProduct = await db.san_pham.findAll({
                order: [
                    ['updatedAt', 'DESC']
                ],
                limit: param,
                raw: true
            })
            return res.status(200).json(lisProProduct)
        }
        else {
            let lisProProduct = await db.san_pham.findAll({
                order: [
                    ['updatedAt', 'DESC']
                ],
                raw: true
            })
            return res.status(200).json(lisProProduct)
        }
    } catch (e) {

    }
}

const handleGetInfoProduct = async (req, res) => {
    try {
        let infoProduct = await productsService.GetInfoProduct(req.query.id)
        return res.status(200).json({
            errCode: infoProduct.errCode,
            message: infoProduct.message,
            data: infoProduct.data ? infoProduct.data : {}
        })
    } catch (e) {
        console.log(e);
    }
}

const handlePostEditInfoProduct = async (req, res) => {
    try {
        let id = req.body.id
        let Ten_san_pham = req.body.Ten_san_pham
        let Hinh_anh = req.body.Hinh_anh
        let Gia_san_pham = req.body.Gia_san_pham
        let So_luong_SP = req.body.So_luong_SP
        let Thong_tin_bao_hanh = req.body.Thong_tin_bao_hanh
        let Ghi_chu = req.body.Ghi_chu
        let Id_loai_SP = req.body.Id_loai_SP
        let Id_nhom_SP = req.body.Id_nhom_SP

        if (!id || !Ten_san_pham || !Hinh_anh || !Gia_san_pham || !So_luong_SP || So_luong_SP < 0 || !Id_loai_SP || !Id_nhom_SP) {
            return res.status(200).json({
                errCode: '1',
                message: 'Vui lòng nhập đầy đủ thông tin'
            })
        } else {
            let messageEditInfoProduct = await productsService.PostEditInfoProduct(req.body)
            return res.status(200).json({
                errCode: messageEditInfoProduct.errCode,
                message: messageEditInfoProduct.message
            })
        }
    } catch (e) {
    }
}

const handleGetSearchProduct = async (req, res) => {
    try {

        let limitPro = parseInt(req.query.limit)
        let Ten_san_pham = req.query.Ten_san_pham

        if (Ten_san_pham && limitPro) {
            const data = await db.san_pham.findAll({
                where: {
                    Ten_san_pham: { [Op.like]: `%${Ten_san_pham}%` },
                },
                default: true,
                order: [
                    ['updatedAt', 'DESC']
                ],
                limit: limitPro,
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

const handleGetSmartphone = async (req, res) => {
    try {

        let idGroupProduct = req.query.id
        let limit = parseInt(req.query.limit)
        if (idGroupProduct && limit === 0) {
            let data = await db.san_pham.findAll({
                where: { Id_nhom_SP: req.query.id },
                raw: true
            })
            return res.status(200).json(data)
        }
        if (idGroupProduct && limit) {
            let data = await db.san_pham.findAll({
                where: { Id_nhom_SP: req.query.id },
                limit: limit,
                raw: true
            })
            return res.status(200).json(data)
        }
        else {
            return res.status(200).json({
                errCode: 1,
                message: 'Lỗi server'
            })
        }
    } catch (e) {
    }
}

const handleGetInfoBill = async (req, res) => {
    try {
        let data = await productsService.getInfoBill(req.query.So_dien_thoai)
        if (data) {
            return res.status(200).json(data)
        } else {
            return res.status(500).json({
                errCode: '1',
                message: 'Không tìm thấy Bill'
            })
        }

    } catch (e) {
    }
}

const handleGetInfoOderDetail = async (req, res) => {
    try {

        let arrIdOrder = []
        let arr = req.body.arrIdOrder
        if (arr) {
            arrIdOrder = [...req.body.arrIdOrder]
        }
        if (arrIdOrder.length !== 0) {
            let listInfoOrderDetail = await productsService.getListOrderDetail(arrIdOrder)
            if (listInfoOrderDetail) {
                return res.status(200).json(listInfoOrderDetail)
            }
            else {
                return res.status(500).json({
                    errCode: '1',
                    message: 'Loi'
                })
            }
        }
        else {
        }
    } catch (e) {
    }
}

const handlePostAddProductGroup = async (req, res) => {
    try {
        if (req.body.Ten_nhom !== '') {
            let info = await db.nhom_sp.findOne({
                where: { Ten_nhom: req.body.Ten_nhom }
            })
            if (info) {
                return res.status(200).json({
                    errCode: '2',
                    message: 'Đã tồn tại tên nhóm'
                })
            }
            else {
                let mes = await db.nhom_sp.create({
                    Ten_nhom: req.body.Ten_nhom
                })

                if (mes) {
                    return res.status(200).json({
                        errCode: '0',
                        message: 'Thêm thành công'
                    })
                }
                else {
                    return res.status.json({
                        errCode: '1',
                        message: 'Thêm thất bại'
                    })
                }
            }
        }
        else {
            return res.status(200).json({
                errCode: '3',
                message: 'Vui lòng nhập dữ liệu'
            })
        }
    } catch (e) { }
}

const handlePostEditProductGroup = async (req, res) => {
    try {
        if (req.body && req.body.Ten_nhom !== '') {
            let infoProductGroup = await db.nhom_sp.findOne({
                where: { id: req.body.id_nhom },
                raw: true
            })

            if (infoProductGroup) {
                await db.nhom_sp.update(
                    {
                        Ten_nhom: req.body.Ten_nhom
                    },
                    {
                        where: { id: req.body.id_nhom }
                    }
                )
                return res.status(200).json({
                    errCode: '0',
                    message: 'Cập nhật thành công'
                })
            }
        }
        else {
            return res.status(200).json({
                errCode: '1',
                message: 'Vui lòng nhập dữ liệu'
            })
        }
    } catch (e) { }
}

const handlePostAddProductTye = async (req, res) => {
    try {
        if (req.body.Ten_loai_SP !== '') {
            let info = await db.loai_sp.findOne({
                where: { Ten_loai_SP: req.body.Ten_loai_SP }
            })
            if (info) {
                return res.status(200).json({
                    errCode: '2',
                    message: 'Loại sản phẩm này đã tồn tại'
                })
            }
            else {
                let mes = await db.loai_sp.create({
                    Ten_loai_SP: req.body.Ten_loai_SP
                })

                if (mes) {
                    return res.status(200).json({
                        errCode: '0',
                        message: 'Thêm thành công'
                    })
                }
                else {
                    return res.status.json({
                        errCode: '1',
                        message: 'Thêm thất bại'
                    })
                }
            }
        }
        else {
            return res.status(200).json({
                errCode: '3',
                message: 'Vui lòng nhập dữ liệu'
            })
        }
    } catch (e) { }
}

const handlePostEditProductType = async (req, res) => {
    try {
        if (req.body && req.body.Ten_loai_SP !== '') {
            let infoProductType = await db.loai_sp.findOne({
                where: { id: req.body.id_loai_SP },
                raw: true
            })

            if (infoProductType) {
                await db.loai_sp.update(
                    {
                        Ten_loai_SP: req.body.Ten_loai_SP
                    },
                    {
                        where: { id: req.body.id_loai_SP }
                    }
                )
                return res.status(200).json({
                    errCode: '0',
                    message: 'Cập nhật thành công'
                })
            }
        }
        else {
            return res.status(200).json({
                errCode: '1',
                message: 'Vui lòng nhập dữ liệu'
            })
        }
    } catch (e) { }
}

const handleAddVersionProduct = async (req, res) => {
    try {
        let Id_SP = req.body.Id_SP
        let Anh_phien_ban = req.body.Anh_phien_ban
        let Ten_phien_ban = req.body.Ten_phien_ban
        let Gia_phien_ban = req.body.Gia_phien_ban
        if (!Id_SP || !Anh_phien_ban || !Ten_phien_ban || !Gia_phien_ban) {
            return res.status(200).json({
                errCode: 1,
                message: 'Vui lòng nhập đủ thông tin'
            })
        }
        else {
            if (Gia_phien_ban.length > 9) {
                return res.status(200).json({
                    errCode: 2,
                    message: 'Giá sản phẩm không hợp lệ'
                })
            }
            else {
                let check = await db.phien_ban.findOne({
                    where: { Ten_phien_ban: Ten_phien_ban, Id_SP: Id_SP },
                    raw: true
                })
                if (check) {
                    return res.status(200).json({
                        errCode: 3,
                        message: 'Tên phiên bản đã tồn tại'
                    })
                }
                else {
                    await db.phien_ban.create({
                        Id_SP: Id_SP,
                        Anh_phien_ban: Anh_phien_ban,
                        Ten_phien_ban: Ten_phien_ban,
                        Gia_phien_ban: Gia_phien_ban
                    })

                    return res.status(200).json({
                        errCode: 0,
                        message: 'Thêm thành công'
                    })
                }
            }
        }
    } catch (e) { }
}

const handleGetInfoVersionProduct = async (req, res) => {
    try {
        if (req.query.Id_SP) {
            let data = await db.phien_ban.findAll({
                where: { Id_SP: req.query.Id_SP },
                order: [
                    ['createdAt', 'DESC']
                ],
                raw: true
            })
            data ? res.status(200).json(data) : res.status(200).json({
                errCode: 1,
                message: 'Không tìm thấy'
            })
        }
        else {
        }
    } catch (e) { }
}

const handleEditVersion = async (req, res) => {
    try {
        let Id = req.body.Id
        let Anh_phien_ban = req.body.Anh_phien_ban
        let Ten_phien_ban = req.body.Ten_phien_ban
        let Gia_phien_ban = req.body.Gia_phien_ban
        if (!Id || !Anh_phien_ban || !Ten_phien_ban || !Gia_phien_ban) {
            return res.status(200).json({
                errCode: 1,
                message: 'Vui lòng nhập đủ thông tin'
            })
        }
        else {
            if (Gia_phien_ban.length > 9) {
                return res.status(200).json({
                    errCode: 3,
                    message: 'Giá sản phẩm không hợp lệ'
                })
            }
            else {
                let checkData = await db.phien_ban.findOne({
                    where: { id: Id },
                    raw: true
                })
                if (checkData) {
                    await db.phien_ban.update(
                        {
                            Ten_phien_ban: Ten_phien_ban,
                            Gia_phien_ban: Gia_phien_ban,
                            Anh_phien_ban: Anh_phien_ban
                        },
                        {
                            where: { id: checkData.id }
                        })
                    return res.status(200).json({
                        errCode: 0,
                        message: 'Cập nhập thành công'
                    })
                }
                else {
                    return res.status(200).json({
                        errCode: 2,
                        message: 'Không tìm thấy'
                    })
                }
            }
        }
    } catch (e) { }
}

const handleDeleteVersionProduct = async (req, res) => {
    try {
        if (req.body.id) {
            let check = await db.phien_ban.findOne({
                where: { id: req.body.id }
            })
            if (check) {
                await check.destroy()
                return res.status(200).json({
                    errCode: 0,
                    message: 'Xóa thành công'
                })
            }
            else {
                return res.status(200).json({
                    errCode: 2,
                    message: 'Không tìm tháy'
                })
            }
        }
        else {
            return res.status(200).json({
                errCode: 1,
                message: 'Vui lòng nhập id'
            })
        }
    } catch (e) { }
}

module.exports = {
    handleAddProduct: handleAddProduct,
    handleGetProductGroup: handleGetProductGroup,
    handleGetProductType: handleGetProductType,
    handleGetProduct: handleGetProduct,
    handleGetInfoProduct: handleGetInfoProduct,
    handlePostEditInfoProduct: handlePostEditInfoProduct,
    handleGetSearchProduct: handleGetSearchProduct,
    handleGetSmartphone: handleGetSmartphone,
    handleGetInfoBill: handleGetInfoBill,
    handleGetInfoOderDetail: handleGetInfoOderDetail,
    handlePostAddProductGroup: handlePostAddProductGroup,
    handlePostEditProductGroup: handlePostEditProductGroup,
    handlePostAddProductTye: handlePostAddProductTye,
    handlePostEditProductType: handlePostEditProductType,
    handleAddVersionProduct: handleAddVersionProduct,
    handleGetInfoVersionProduct: handleGetInfoVersionProduct,
    handleEditVersion: handleEditVersion,
    handleDeleteVersionProduct: handleDeleteVersionProduct
}