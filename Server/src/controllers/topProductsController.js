import { raw } from 'body-parser';
import db from '../models/index'

const handleTopProduct = async (req, res) => {

    if (req.query.Id_nhom_SP) {
        let listProduct = await db.san_pham.findAll({
            where: { Id_nhom_SP: req.query.Id_nhom_SP },
            order: [
                ['So_luong_SP', 'ASC']
            ],
            limit: 10,
            attributes: ['id', 'Ten_san_pham', 'Hinh_anh', 'Gia_san_pham', 'So_luong_SP', 'Thong_tin_bao_hanh', 'Ghi_chu'],
            raw: true
        })

        return res.status(200).json(listProduct)
    }
}

module.exports = {
    handleTopProduct: handleTopProduct,
}