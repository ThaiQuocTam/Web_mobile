import db from '../models/index'

const handleGetListSlides = async (req, res) => {
    try {
        let data = await db.slide.findAll({
            raw: true
        })
        return res.status(200).json(data)
    } catch (e) { }
}

const handlePostAddSlides = async (req, res) => {
    try {
        let Hinh_anh = req.body.Hinh_anh
        if (Hinh_anh) {
            let mes = await db.slide.create({
                Hinh_anh: Hinh_anh
            })
            if (mes) {
                return res.status(200).json({
                    errCode: 0,
                    message: 'Thêm thành công'
                })
            }
        }
        else {
            return res.status(200).json({
                errCode: 1,
                message: 'Vui lòng nhập đầy dủ dữ liệu'
            })
        }

    } catch (e) { }
}

const handlePostDeleteSlides = async (req, res) => {
    try {
        let idSlide = req.body.idSlide
        if (idSlide) {
            let checkData = await db.slide.findOne({
                where: { id: idSlide },
                raw: true
            })
            if (checkData) {
                await db.slide.destroy({
                    where: { id: idSlide }
                })

                return res.status(200).json({
                    errCode: 0,
                    message: 'Xóa thành công'
                })
            }
            else {
                return res.status(200).json({
                    errCode: 2,
                    message: 'Không tìm thấy'
                })
            }
        }
        else {
            return res.status(200).json({
                errCode: 1,
                message: 'Chưa có id'
            })
        }
    } catch (e) { }
}


module.exports = {
    handleGetListSlides: handleGetListSlides,
    handlePostAddSlides: handlePostAddSlides,
    handlePostDeleteSlides: handlePostDeleteSlides,
}