import db from "../models/index"

const addProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        let addProductMessage = {}
        try {
            let check = await checkNameProduct(data.Ten_san_pham)
            if (check) {
                addProductMessage.errCode = '1'
                addProductMessage.message = 'Tên sản phẩm đã tồn tại đã tồn tại!'
            }
            else {
                if (data.Gia_san_pham.length > 10) {
                    addProductMessage.errCode = '3'
                    addProductMessage.message = 'Giá sản phẩm không hợp lệ'
                } else {
                    if (data.So_luong_SP.length >= 7) {
                        addProductMessage.errCode = '4'
                        addProductMessage.message = 'Số lượng sản phẩm không hợp lệ'
                    }
                    else {
                        await db.san_pham.create({
                            Ten_san_pham: data.Ten_san_pham,
                            Hinh_anh: data.Hinh_anh,
                            Gia_san_pham: data.Gia_san_pham,
                            So_luong_SP: data.So_luong_SP,
                            Thong_tin_bao_hanh: data.Thong_tin_bao_hanh,
                            Ghi_chu: data.Ghi_chu,
                            Id_loai_SP: data.Id_loai_SP,
                            Id_nhom_SP: data.Id_nhom_SP
                        })
                        addProductMessage.errCode = '0'
                        addProductMessage.message = 'Thêm sản phẩm thành công'
                    }
                }
            }
            resolve(addProductMessage)
        } catch (e) {
            reject(e)
        }
    })
}

const checkNameProduct = async (name) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkName = await db.san_pham.findOne({
                where: { Ten_san_pham: name },
                raw: true
            })

            if (checkName) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

const GetInfoProduct = (idProduct) => {
    return new Promise(async (resolve, reject) => {
        try {
            let infoProduct = {}
            if (idProduct) {
                let data = await db.san_pham.findOne({
                    where: { id: idProduct },
                    raw: true
                })
                if (data) {
                    infoProduct.errCode = '0'
                    infoProduct.data = data
                } else {
                    infoProduct.errCode = '3'
                    infoProduct.message = 'Sản phẩm không tồn tại'
                }
            }
            else {
                infoProduct.errCode = '1'
                infoProduct.message = 'Id không tồn tại'
            }
            resolve(infoProduct)
        } catch (e) {
            reject(e)
        }
    })
}

const PostEditInfoProduct = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let messageEditProduct = {}
            let idProductEdit = await db.san_pham.findOne({
                where: { id: data.id },
                raw: true
            })
            if (idProductEdit) {
                if (data.Gia_san_pham.length > 10) {
                    messageEditProduct.errCode = '3'
                    messageEditProduct.message = 'Giá sản phẩm không hợp lệ'
                } else {
                    if (data.So_luong_SP.length >= 7) {
                        messageEditProduct.errCode = '4'
                        messageEditProduct.message = 'Số lượng sản phẩm không hợp lệ'
                    }
                    else {
                        await db.san_pham.update({
                            Ten_san_pham: data.Ten_san_pham,
                            Hinh_anh: data.Hinh_anh,
                            Gia_san_pham: data.Gia_san_pham,
                            So_luong_SP: data.So_luong_SP,
                            Thong_tin_bao_hanh: data.Thong_tin_bao_hanh,
                            Ghi_chu: data.Ghi_chu,
                            Id_loai_SP: data.Id_loai_SP,
                            Id_nhom_SP: data.Id_nhom_SP,
                        }, {
                            where: { id: data.id }
                        })
                        messageEditProduct.errCode = '0'
                        messageEditProduct.message = 'Chửa sửa thành công'
                    }
                }

            } else {
                messageEditProduct.errCode = '2'
                messageEditProduct.message = 'Id sản phẩm không tồn tại'
            }

            resolve(messageEditProduct)
        } catch (e) {
            reject(e)
        }
    })
}

const SearchProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data) {
                let check = await db.san_pham.find({
                    '$or': [
                        { 'Ten_san_pham': { $regex: data.Ten_san_pham } }
                    ]
                })
                resolve(check)
            }
            else {
            }
        } catch (e) {

        }

    })
}

const getInfoBill = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let messageGetOrderDetail = {}
            if (data) {
                let infoOderDetail = await db.hoa_don.findAll({
                    where: {
                        So_dien_thoai: data,
                    },
                    order: [
                        ['updatedAt', 'DESC']
                    ],
                    raw: true

                })
                if (infoOderDetail.length !== 0) {
                    messageGetOrderDetail.errCode = '0'
                    messageGetOrderDetail.message = 'Đã tìm thấy'
                    messageGetOrderDetail.infoOderDetail = infoOderDetail
                }
                else {
                    messageGetOrderDetail.errCode = '1'
                    messageGetOrderDetail.message = 'Kh tìm thấy'
                }
            }
            resolve(messageGetOrderDetail)
        } catch (e) {
            reject(e)
        }
    })
}

const getListOrderDetail = async (arrId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const listArr = arrId
            if (listArr) {
                let listInfoOrder = []
                for (let i = 0; i < listArr.length; i++) {
                    let data = await db.chi_tiet_hd.findAll({
                        where: { Id_HD: listArr[i] },
                        raw: true
                    })
                    data ?
                        data.map((item) => listInfoOrder.push(item)) : ''
                }
                resolve(listInfoOrder)
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    addProduct: addProduct,
    GetInfoProduct: GetInfoProduct,
    PostEditInfoProduct: PostEditInfoProduct,
    SearchProduct: SearchProduct,
    getInfoBill: getInfoBill,
    getListOrderDetail: getListOrderDetail
}