import db, { Sequelize } from '../models/index'
import reviewService from '../services/reviewService'
const Op = Sequelize.Op

const handlePostReview = async (req, res) => {
    try {
        if (req.body) {
            let mesPostReview = await reviewService.postReview(req.body)
            if (mesPostReview) {
                return res.status(200).json({
                    errCode: mesPostReview.errCode,
                    message: mesPostReview.message
                })
            }
        } else {
            return res.status(400).json({
                errCode: '1',
                message: 'Chưa có thông tin'
            })
        }
    } catch (e) { }
}

const handleShowReview = async (req, res) => {
    try {
        if (req.query.idProduct && req.query.type) {
            let idProduct = req.query.idProduct
            let type = req.query.type
            let data = await db.review.findAll({
                where: { Id_san_pham: idProduct, Loai: type },
                order: [
                    ['createdAt', 'DESC']
                ],
                raw: true
            })
            if (data.length === 0) {
                return res.status(200).json({
                    errCode: '1',
                    message: 'Không tìm thấy sản phẩm'
                })
            }
            else {
                return res.status(200).json(data)

            }
        }
    } catch (e) { }
}

const handleInfoReviewNotResponse = async (req, res) => {
    let listReview = []
    let listArrNew = []
    let listReviewResponse = await db.review.findAll({
        where: { Loai: 2, Id_phan_quyen: 7 },
        order: [[
            'createdAt', 'DESC'
        ]],
        raw: true
    })
    let listReviewNotResponse = await db.review.findAll({
        where: { Loai: 1, Id_phan_quyen: 6 },
        order: [[
            'createdAt', 'DESC'
        ]],
        raw: true
    })
    if (listReviewNotResponse && listReviewResponse) {
        let i
        let j
        for (i = 0; i < listReviewNotResponse.length; i++) {
            for (j = 0; j < listReviewResponse.length; j++) {
                if (listReviewResponse[j].Id_review_user === listReviewNotResponse[i].id) {
                    listArrNew.push(listReviewNotResponse[i])
                }
                else {
                }
            }
        }
        listReviewNotResponse.map((itemReviewNotResponse) => {
            listArrNew.includes(itemReviewNotResponse) ? '' : listReview.push(itemReviewNotResponse)
        })
    }

    return res.status(200).json({
        listReview: listReview,
        listReviewNotResponse: listArrNew
    })
}

const handleGetReviewUser = async (req, res) => {
    try {
        if (req.query.Id_user) {
            let listReviewResponseUser = []
            let listDataReviewUser = await db.review.findAll({
                where: {
                    Id_nguoi_dung: req.query.Id_user,
                    Loai: 1
                },
                order: [
                    ['createdAt', 'DESC']
                ],
                raw: true
            })

            if (listDataReviewUser) {
                let reviewResponse = await db.review.findAll({
                    where: {
                        Loai: 2
                    },
                    order: [
                        ['createdAt', 'DESC']
                    ],
                    raw: true
                })

                for (let i = 0; i < reviewResponse.length; i++) {

                    for (let j = 0; j < listDataReviewUser.length; j++) {
                        if (reviewResponse[i].Id_review_user === listDataReviewUser[j].id) {
                            listReviewResponseUser.push(reviewResponse[i])
                        }
                    }
                }

                return res.status(200).json(listReviewResponseUser)
            } else {
                return res.status(200).json({
                    errCode: 1,
                    message: 'Không tìm thấy'
                })
            }
        }

    } catch (e) { }
}

const handleCheckedReviewUser = async (req, res) => {
    try {
        if (req.body.Id_review) {
            let data = await db.review.findOne({
                where: { id: req.body.Id_review },
                raw: true
            })
            if (data && data.Loai === 2) {
                await db.review.update(
                    {
                        Checked: true
                    },
                    {
                        where: { id: data.id }
                    }
                )
                return res.status(200).json({
                    errCode: 0,
                    message: 'Check thông báo thành công'
                })
            } else {
                return res.status(200).json({
                    errCode: 1,
                    message: 'Không tìm thấy id'
                })
            }
        }
    } catch (e) { }
}

module.exports = {
    handlePostReview: handlePostReview,
    handleShowReview: handleShowReview,
    handleInfoReviewNotResponse: handleInfoReviewNotResponse,
    handleGetReviewUser: handleGetReviewUser,
    handleCheckedReviewUser: handleCheckedReviewUser
}