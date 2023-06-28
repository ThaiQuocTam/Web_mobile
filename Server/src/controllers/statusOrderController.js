import db from '../models/index'

const handleGetAllStatusOrder = async (req, res) => {
    try {
        let data = await db.trang_thai.findAll({
            raw: true
        })
        data ? res.status(200).json(data) : res.status(401).json({ message: 'Lỗi, không tìm thấy' })
    } catch (e) {
    }
}

module.exports = {
    handleGetAllStatusOrder: handleGetAllStatusOrder
}