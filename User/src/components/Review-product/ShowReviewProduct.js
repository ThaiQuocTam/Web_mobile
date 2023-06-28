import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as actions from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { listReviewUserSelector, listReviewAdminSelector, mesPostReviewSelector, getInfoUserSelector } from '../../redux/selector'
import { useNavigate } from 'react-router-dom'

const ShowReviewProduct = (props) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const listInfoReviewUser = useSelector(listReviewUserSelector)
    const listInfoReviewAdmin = useSelector(listReviewAdminSelector)
    const mesPostReview = useSelector(mesPostReviewSelector)
    const infoUser = useSelector(getInfoUserSelector)
    const idProduct = props.product.id_Product

    const [stateListInfoReviewUser, setStateListInfoReviewUser] = useState([])
    const [stateListInfoReviewAdmin, setStateListInfoReviewAdmin] = useState([])
    const [stateInfoAdmin, setStateInfoAdmin] = useState()
    const [stateInfoUser, setStateInfoUser] = useState()
    const [ID, setID] = useState()

    let email = localStorage.getItem("User")

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

    useEffect(() => {
        if (idProduct) {
            dispatch(actions.getShowReviewUserAction.getShowReviewUserRequest({ id: idProduct, Loai: 1 }))
            dispatch(actions.getShowReviewAdminAction.getShowReviewAdminRequest({ id: idProduct, Loai: 2 }))
        }
    }, [mesPostReview || idProduct])

    useEffect(() => {
        try {
            if (listInfoReviewUser && listInfoReviewUser.errCode !== '1') {
                setStateListInfoReviewUser(listInfoReviewUser)
            }
            if (listInfoReviewAdmin && listInfoReviewAdmin.errCode !== '1') {
                setStateListInfoReviewAdmin(listInfoReviewAdmin)
            }

        } catch (e) { }
    }, [listInfoReviewUser && listInfoReviewAdmin])

    useEffect(() => {
        try {
            if (email) {
                dispatch(actions.getInfoUserAction.getInfoUserRequest(email))
            }
        } catch (e) { }
    }, [email])

    useEffect(() => {
        try {
            if (infoUser && infoUser.Id_phan_quyen === 7) {
                setStateInfoAdmin(infoUser)
            }
            if (infoUser && infoUser.Id_phan_quyen === 6) {
                setStateInfoUser(infoUser)
            }
        } catch (e) { }
    }, [infoUser])

    const convertDate = (date) => {
        date = new Date(date)
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        let seconds = date.getSeconds()
        let minutes = date.getMinutes()
        let hours = date.getHours()
        return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`
    }

    return (
        <>

            {(stateListInfoReviewUser.length !== 0) ?
                <div className='w-full border-t border-x border-gray-500 bg-white rounded-2 mt-5 px-5 pb-5 '>
                    {
                        stateListInfoReviewUser.map((item) => (
                            <div
                                onMouseEnter={() => { setID(item.id) }}
                                className='border-b border-gray-400 pb-5 mt-5'>
                                <div>
                                    <i class="bi bi-person-circle text-gray-500 text-5 mr-2"></i>
                                    <span className='text-3.5 font-semibold mr-1'>{item.Ten_nguoi_dung || ''}</span>
                                    {
                                        item.Id_phan_quyen === 7 ? <span className='text-2.5 text-green-500 font-semibold'><i class="bi bi-check-circle-fill text-3 text-green-600 mr-1"></i>QTV</span> : ''
                                    }

                                    <span className='text-3 text-gray-500 ml-5'>{convertDate(item.createdAt) || ''}</span>
                                </div>
                                <div className='ml-8'>
                                    <span className='text-3.2 text-gray-800'>{item.Noi_dung || ''}</span>
                                </div>
                                {
                                    (ID === item.id && !stateInfoUser) ?
                                        <div
                                            className='pl-5'>
                                            <form onSubmit={handleSubmit((data) => {
                                                if (stateInfoAdmin) {
                                                    dispatch(actions.postReviewAction.postReviewRequest({
                                                        Ten_nguoi_dung: stateInfoAdmin.Ho_ten,
                                                        Noi_dung: data.Noi_dung,
                                                        Loai: 2,
                                                        Id_nguoi_dung: stateInfoAdmin.id,
                                                        Id_phan_quyen: stateInfoAdmin.Id_phan_quyen,
                                                        Id_review_user: item.id,
                                                        Id_san_pham: props.product.id_Product
                                                    }))
                                                    navigate(0)
                                                    setValue('Noi_dung', '')
                                                }
                                            })}>
                                                <input
                                                    type='text'
                                                    placeholder='Nhập phản hồi của bạn...'
                                                    className='outline-none mr-2 border mt-2 w-90 bg border-slate-200 p-1 placeholder:text-3 text-3 text-gray-600 pl-5 rounded-5'
                                                    {...register('Noi_dung', { required: true })}
                                                />
                                                <button className='rounded-5 px-2 py-1 bg-slate-500 text-white text-3 hover:bg-slate-700'><i class="bi bi-send-fill mr-2 "></i>Bình luận</button>
                                                <br />
                                                {/* vc */}


                                            </form>
                                        </div> : ''
                                }
                                {
                                    stateListInfoReviewAdmin.map((itemAdmin) => (
                                        (itemAdmin.Id_review_user === item.id) ?
                                            <div className='ml-8 pl-2 mt-2 border-l border-slate-500'>
                                                <div>
                                                    <i class="bi bi-person-circle text-green-950 text-5 mr-2"></i>
                                                    <span className='text-3 font-semibold mr-1'>{itemAdmin.Ten_nguoi_dung || ''}</span>
                                                    <span className='text-2.5 text-green-500 font-semibold mr-5'><i class="bi bi-check-circle-fill text-3 text-green-600 mr-1"></i>QTV</span>
                                                    <span className='text-3 text-gray-500'>{convertDate(itemAdmin.createdAt) || ''}</span>
                                                </div>
                                                <div className='ml-8'>
                                                    <span className='text-3.2 text-gray-800'>{itemAdmin.Noi_dung || ''} </span>
                                                </div>
                                            </div>
                                            : ''
                                    ))

                                }

                            </div>
                        ))
                    }
                </div>
                : ''}
        </>
    )
}

export default ShowReviewProduct