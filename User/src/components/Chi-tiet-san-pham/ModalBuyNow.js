//

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/actions'
import { getInfoUserSelector, mesPostPaymentSelector } from '../../redux/selector'
import loading from '../../Assets/Reload-1s-200px.gif'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import MesPayment from 'components/Gio-hang/MesPayment'
import SignIn from 'components/Sign-in/SignIn'
import '../Gio-hang/Cart.css'

const ModalBuyNow = (props) => {

    const navigate = useNavigate()
    const [stateProduct, setStateProduct] = useState()
    const [quantity, setQuantity] = useState(1)
    const [stateEmail, setStateEmail] = useState()
    const dispatch = useDispatch()
    const mesPayment = useSelector(mesPostPaymentSelector)
    const infoUser = useSelector(getInfoUserSelector)
    const [stateMes, setStateMes] = useState()
    const [showModalMesPayment, setShowModalMesPayment] = useState(false)
    const [showModalSignIn, setShowModalSignIn] = useState(false)

    let email = localStorage.getItem("User")
    const [stateLoading, setStateLoading] = useState(false)
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        mode: "onChange"
    });

    useEffect(() => {
        if (props.product) {
            setStateProduct(props.product)
        }
    }, [props.product])

    useEffect(() => {
        setStateEmail(email)
        if (email) {
            dispatch(actions.getInfoUserAction.getInfoUserRequest(email))
        }
    }, [email])

    const submitData = (data) => {
        if (stateProduct && infoUser) {
            stateProduct.So_luong = quantity
            dispatch(actions.postPaymentAction.postPaymentRequest({
                order: {
                    Ho_ten: infoUser.Ho_ten,
                    Email: infoUser.Email,
                    So_dien_thoai: infoUser.Dien_thoai,
                    Dia_chi_nhan_hang: data.Dia_chi_nhan_hang,
                    Tong_tien: stateProduct.Gia_san_pham * quantity,
                    Ghi_chu: data.Ghi_chu,
                    Id_nguoi_dung: infoUser.id
                },
                orderDetail: [stateProduct]
            }))
            setStateLoading(true)
        }
    }

    useEffect(() => {
        try {
            if (mesPayment) {
                setStateMes(mesPayment)
                if (mesPayment.errCode === '0') {
                    const timerId = setTimeout(() => {
                        mesPayment.errCode = ''
                        setStateLoading(false)
                        dispatch(actions.getBillAction.getBillRequest(infoUser.Dien_thoai))
                        navigate('/OrderDetail')
                        localStorage.removeItem('arrProduct')
                    }, 3000)
                    return () => clearTimeout(timerId)
                }
                if (mesPayment.errCode === '4' || mesPayment.errCode === '5' || mesPayment.errCode === '6') {
                    mesPayment.errCode = ''
                    const timerId = setTimeout(() => {
                        setStateLoading(false)
                        setShowModalMesPayment(true)
                    }, 3000)
                    return () => clearTimeout(timerId)
                }
            }
        } catch (e) { }
    }, [mesPayment])

    const handleCloseMes = () => {
        setShowModalMesPayment(false)
    }

    const handleCloseModal = () => {
        setShowModalSignIn(false)
    }

    useEffect(() => {
        if (showModalMesPayment) {
            const timer = setTimeout(() => {
                setShowModalMesPayment(false)
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showModalMesPayment]);

    return (
        <>
            <div className='w-full animate-modalForm'>
                <i onClick={props.isClose} className="bi bi-dash-circle-fill fixed right-54 text-6 hover:text-red-600 cursor-pointer mr-2 text-red-500 float-right"></i>
                <form onSubmit={handleSubmit(submitData)} className="flex flex-row pl-60">
                    <div className="basis-1/2">
                        <div className="flex flex-col p-3 bg-white">
                            <div className='flex items-center justify-center'>
                                <i className='bi bi-check2-circle text-12 mr-2 text-green-900'></i>
                                <span className='text-center text-7 text-green-950 font-semibold'> Thông tin sản phẩm</span>
                            </div>
                            <div className=' pb-10 px-20'>
                                <div className="border border-gray-200 rounded-[12px] px-2 shadow-soft-xxs mb-4">

                                    <div className=''>
                                        <div className='w-full p-3 text-center'>
                                            <img className="mx-auto zoom-image hover:zoom-image-hover" src={stateProduct ? stateProduct.Hinh_anh : ''} />
                                        </div>
                                        <div className='text-center'>
                                            <span className='text-3.2 text-red-500 italic'> -  {stateProduct ? stateProduct.Ten_phien_ban : ''}  - </span>
                                        </div>
                                        <div className='text-center'>
                                            <p className="text-3.5 font-semibold" >{stateProduct ? stateProduct.Ten_san_pham : ''}</p>
                                            <p className='text-3.5 text-red-500 font-semibold inline-block mr-4'>{stateProduct ? stateProduct.Gia_san_pham.toLocaleString() : ''} ₫</p>
                                            <p className='text-3 text-red-500 inline-block line-through'>{stateProduct ? (stateProduct.Gia_san_pham + (stateProduct.Gia_san_pham * (10 / 100))).toLocaleString() : ''} ₫</p>
                                            <div className='my-4 text-center'>
                                                <input
                                                    className="minus is-form  hover:text-red-500 cursor-pointer" type="button" value="-" onClick={() => { quantity <= 1 ? '' : setQuantity(pre => pre - 1) }} />
                                                <input aria-label="quantity" readOnly className="input-qty outline-none" max="10" min="1" name="" type="number" value={quantity} id="textbox" />
                                                <input
                                                    className="plus is-form  hover:text-red-500 cursor-pointer" type="button" value="+" onClick={() => setQuantity(pre => pre + 1)} />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className='flex'>
                                    <p className='mt-4 font-bold'>Tổng thanh toán: </p>
                                    <p className='mt-4 mx-2 text-red-600 font-bold'>{stateProduct ? (stateProduct.Gia_san_pham * quantity).toLocaleString() : ''} ₫</p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="basis-1/3">
                        <div className="h-full p-3 bg-white">
                            <div className='text-center pt-2'>
                                <span className='text-5 uppercase text-green-950 font-semibold'> Thông tin đặt hàng</span>
                            </div>
                            <div className=" rounded-[12px]">
                                <div className="p-4">
                                    <div className="mt-4">
                                        <input
                                            readOnly={email ? false : false}
                                            value={infoUser ? infoUser.Ho_ten : ''}
                                            placeholder='Họ và tên'
                                            type="text"
                                            name="hovaten"
                                            className="mt-1 p-2 pl-5 text-3.5 text-gray-800 font-semibold focus:outline-none bg-slate-50 rounded-5 border border-gray-400 w-full"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <input
                                            value={infoUser ? infoUser.Dien_thoai : ''}
                                            readOnly={email ? true : false}
                                            placeholder='Số điện thoại'
                                            type="number"
                                            name="sdt"
                                            className="mt-1 p-2 pl-5 text-3.5 text-gray-800 font-semibold focus:outline-none bg-slate-50 rounded-5 border border-gray-400 w-full"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <input
                                            {...register('Dia_chi_nhan_hang', { required: true })}
                                            placeholder='Địa chỉ nhận hàng'
                                            type="text"
                                            className="mt-1 p-2 pl-5 text-3.5 text-gray-800 font-semibold focus:outline-none bg-slate-50 rounded-5 border border-gray-400 w-full"
                                        />
                                        {
                                            errors.Dia_chi_nhan_hang &&
                                            <div className='mt-3'>
                                                <p className='text-3 italic text-red-500'>Vui lòng nhập địa chỉ nhận hàng</p>
                                            </div>
                                        }
                                    </div>
                                    <div className="mt-4">
                                        <input
                                            readOnly={email ? true : false}
                                            value={infoUser ? infoUser.Email : ''}
                                            placeholder='Email'
                                            type="email"
                                            className="mt-1 p-2 pl-5 text-3.5 text-gray-800 font-semibold focus:outline-none bg-slate-50 rounded-5 border border-gray-400 w-full"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <textarea
                                            {...register('Ghi_chu', { required: false })}
                                            type="text"
                                            className="mt-1 p-2 pl-5 text-3.5 text-gray-800 font-medium h-44 focus:outline-none bg-slate-50 rounded-5 border border-gray-400 w-full"
                                        />
                                    </div>
                                    {
                                        stateEmail ?
                                            <>
                                                {
                                                    stateLoading ? (<div className="mt-4">
                                                        <div
                                                            className="mt-1 p-2 text-center w-full  border font-semibold focus:outline-none rounded-2 cursor-pointer bg-gray-950 text-black"
                                                        >Đang đặt hàng...
                                                            <div className='w-6 h-6 inline-block pt-1 ml-2'>
                                                                <img className='w-full' src={loading} />
                                                            </div>
                                                        </div>
                                                    </div>) :
                                                        <div className="mt-4">
                                                            <input
                                                                type='submit'
                                                                readOnly={true}
                                                                className="mt-1 p-2 text-center w-full hover:bg-green-950 border focus:outline-none rounded-2 cursor-pointer bg-green-800 text-white"
                                                                value='Xác nhận đặt hàng'
                                                            />
                                                        </div>
                                                }
                                            </>
                                            :
                                            <div className="mt-4" onClick={() => setShowModalSignIn(true)}>
                                                <button
                                                    className="mt-1 text-center p-2 w-full hover:bg-green-950 border focus:outline-none rounded-2 cursor-pointer bg-green-800 text-white"
                                                >Vui lòng đăng nhập</button>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div>
                {
                    showModalMesPayment && <MesPayment mesProps={stateMes} isClose={handleCloseMes} />
                }
            </div>
            <div>
                {showModalSignIn && <div className='fixed flex z-sticky items-center bg-slate-950 justify-center left-0 top-0 right-0 bottom-0'>
                    <SignIn isClose={handleCloseModal} />
                </div>}
            </div>
        </>

    )
}

export default ModalBuyNow