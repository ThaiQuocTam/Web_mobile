import db from '../models/index'

const postPaymentServicer = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let messageOrder = {}
            let infoOrder = await db.hoa_don.create({
                Ho_ten: data.order.Ho_ten,
                So_dien_thoai: data.order.So_dien_thoai,
                Email: data.order.Email,
                Dia_chi_nhan_hang: data.order.Dia_chi_nhan_hang,
                Ghi_chu: data.order.Ghi_chu,
                Tong_tien: data.order.Tong_tien,
                Trang_thai: 4,
                Id_nguoi_dung: data.order.Id_nguoi_dung,
            }
            )
            messageOrder.infoOrder = infoOrder
            messageOrder.errCode = '0'
            messageOrder.message = 'Thêm hóa đơn thành công'
            resolve(messageOrder)
        } catch (e) {
            reject(e)
        }
    })
}

const postOrderDetail = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let messagePostOrderDetail = {}
            if (data) {
                let newData = []
                for (let i = 0; i <= data.length; i++) {
                    let check = await checkQuantity(data[i])
                    if (check) {
                        if (check.errCode === '0') {
                            data[i].id_Product === check.product.id ?
                                newData.push(data[i]) : ''
                        }
                        if ((check.errCode === '2')) {
                            newData = []
                            messagePostOrderDetail.errCode = '4'
                            messagePostOrderDetail.message = `${data[i].Ten_san_pham} đã hết`
                            break;
                        }
                        if ((check.errCode === '3')) {
                            newData = []
                            messagePostOrderDetail.errCode = '5'
                            messagePostOrderDetail.message = `${data[i].Ten_san_pham} chỉ còn ${check.product.So_luong_SP} chiếc`
                            break;
                        }
                    }
                }
                if (newData.length !== 0) {
                    let total = 0
                    newData.map((item) => {
                        total = total + item.So_luong
                    })
                    for (let i = 0; i < newData.length; i++) {
                        let newQuantity = 0
                        let product = await db.san_pham.findOne({
                            where: { id: data[i].id_Product },
                            raw: true
                        })
                        if (total > product.So_luong_SP) {
                            messagePostOrderDetail.errCode = '5'
                            messagePostOrderDetail.message = `${product.Ten_san_pham} chỉ còn ${product.So_luong_SP} chiếc`
                            break;
                        }
                        else {
                            newQuantity = newQuantity + (product.So_luong_SP - data[i].So_luong)
                            await db.san_pham.update(
                                {
                                    id: product.id,
                                    Ten_san_pham: product.Ten_san_pham,
                                    Hinh_anh: product.Hinh_anh,
                                    Gia_san_pham: product.Gia_san_pham,
                                    So_luong_SP: newQuantity,
                                    Thong_tin_bao_hanh: product.Thong_tin_bao_hanh,
                                    Ghi_chu: product.Ghi_chu,
                                    Id_loai_SP: product.Id_loai_SP,
                                    Id_nhom_SP: product.Id_nhom_SP
                                },
                                {
                                    where: { id: product.id }
                                }
                            );
                            await db.chi_tiet_hd.bulkCreate(newData)
                            messagePostOrderDetail.errCode = '0'
                            messagePostOrderDetail.message = 'Thêm chi tiết thành công'
                            break;
                        }
                    }
                }
            }
            resolve(messagePostOrderDetail)
        } catch (e) {
            reject(e)
        }
    })
}

const checkQuantity = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let mes = {}
            if (data) {
                let product = await db.san_pham.findOne({
                    where: { id: data.id_Product },
                    raw: true
                })

                if (product) {
                    if (product.So_luong_SP <= 0) {
                        mes.errCode = '2'
                        mes.product = product
                    }
                    else {
                        if (product.So_luong_SP < data.So_luong) {
                            mes.errCode = '3'
                            mes.product = product
                        } else {
                            mes.errCode = '0'
                            mes.product = product
                        }
                    }
                }
            }
            resolve(mes)
        } catch (e) {
            reject(e)
        }
    })
}



module.exports = {
    postPaymentServicer: postPaymentServicer,
    postOrderDetail: postOrderDetail
}
