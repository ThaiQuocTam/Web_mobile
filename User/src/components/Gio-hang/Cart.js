import BackHome from 'components/Trang-chu/BackHome'
import React, { useEffect, useState } from 'react'
import { json, Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import './Cart.css'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/actions'
import { getInfoUserSelector, mesPostPaymentSelector } from '../../redux/selector'
import loading from '../../Assets/Reload-1s-200px.gif'
import MesPayment from './MesPayment'
import SignIn from 'components/Sign-in/SignIn'

const Cart = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const infoUser = useSelector(getInfoUserSelector)
    const mesPayment = useSelector(mesPostPaymentSelector)

    const [stateEmail, setStateEmail] = useState()
    const [stateInfoUser, setStateInfoUser] = useState({})
    const [sumPayment, setSumPayment] = useState(0)
    const [stateLoading, setStateLoading] = useState(false)
    const [stateMes, setStateMes] = useState()
    const [showModalMesPayment, setShowModalMesPayment] = useState(false)
    const [showModalSignIn, setShowModalSignIn] = useState(false)

    let email = localStorage.getItem("User")
    let listProductCartLocal = JSON.parse(localStorage.getItem('arrProduct'))

    useEffect(() => {
        if (listProductCartLocal) {
            let sum = 0
            listProductCartLocal.map((item) => {
                item.email === email ? sum = sum + (item.Gia_san_pham * item.So_luong) : ''
            })
            setSumPayment(sum)
        }
    }, [listProductCartLocal])

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        mode: "onChange"
    });

    useEffect(() => {
        setStateEmail(email)
        if (email) {
            dispatch(actions.getInfoUserAction.getInfoUserRequest(email))
        }
    }, [email])

    useEffect(() => {
        try {
            if (infoUser) {
                setStateInfoUser(infoUser)
            }
        } catch (e) {

        }
    }, [infoUser])

    const submitData = (data) => {
        if (listProductCartLocal && Object.keys(stateInfoUser).length !== 0) {
            if (listProductCartLocal.length !== 0) {
                dispatch(actions.postPaymentAction.postPaymentRequest({
                    order: {
                        Ho_ten: stateInfoUser.Ho_ten,
                        Email: stateInfoUser.Email,
                        So_dien_thoai: stateInfoUser.Dien_thoai,
                        Dia_chi_nhan_hang: data.Dia_chi_nhan_hang,
                        Tong_tien: sumPayment,
                        Ghi_chu: data.Ghi_chu,
                        Id_nguoi_dung: stateInfoUser.id
                    },
                    orderDetail: listProductCartLocal
                }))
                setStateLoading(true)
            }
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
                        dispatch(actions.getBillAction.getBillRequest(stateInfoUser.Dien_thoai))
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

    useEffect(() => {
        if (showModalMesPayment) {
            let timerId = setTimeout(() => {
                setShowModalMesPayment(false)
            }, 4000)
            return () => clearTimeout(timerId)
        }
    }, [showModalMesPayment])

    const handleCloseMes = () => {
        setShowModalMesPayment(false)
    }

    const handleCloseModal = () => {
        setShowModalSignIn(false)
    }

    return (
        <>
            <div>
                <BackHome />
            </div>
            <div className='rounded-3 mx-10 shadow-soft-xxs'>
                <form onSubmit={handleSubmit(submitData)} class="flex flex-row pl-60">
                    <div class="basis-1/2">

                        <div class="flex flex-col mt-10 p-3 bg-white">
                            <div className='flex items-center justify-center'>
                                <i className='bi bi-check2-circle text-12 mr-2 text-green-900'></i>
                                <span className='text-center text-7 text-green-950 font-semibold'> GIỎ HÀNG</span>
                            </div>
                            <div className=' px-20'>
                                {
                                    listProductCartLocal ?
                                        <div
                                            onClick={() => {
                                                localStorage.removeItem('arrProduct');
                                                navigate(0)
                                            }}
                                            className='cursor-pointer hover:opacity-60 pb-4 w-auto'>
                                            <span className='text-3.5 border-b border-red-600 pb-1 text-red-600'>Xóa tất cả</span>
                                        </div> : ''
                                }
                                {
                                    listProductCartLocal ?
                                        listProductCartLocal.length !== 0 ?
                                            listProductCartLocal.map((item) => (
                                                item.email === email ?
                                                    <div className="border border-gray-200 rounded-[12px] px-2 shadow-soft-xxs mb-4">
                                                        <i onClick={() => {
                                                            let cart
                                                            let storage = localStorage.getItem('arrProduct')
                                                            if (storage) {
                                                                cart = JSON.parse(storage)
                                                                cart = cart.filter(itemCart => itemCart.id_Product !== item.id_Product || itemCart.Ten_phien_ban !== item.Ten_phien_ban)
                                                                localStorage.setItem('arrProduct', JSON.stringify(cart))
                                                            }
                                                            navigate('/Cart')
                                                        }}
                                                            class="bi bi-dash-circle-fill text-6 hover:text-red-600 cursor-pointer mr-2 text-red-500 float-right"></i>
                                                        <div className=''>
                                                            <div className='w-full p-5 text-center'>
                                                                <img className="mx-auto my-1 zoom-image hover:zoom-image-hover" src={item.Hinh_anh} />
                                                            </div>
                                                            <div className='text-center'>
                                                                <span className='text-3.2 text-green-950 italic'> -  {item.Ten_phien_ban || ''}  - </span>
                                                            </div>
                                                            <div className='text-center'>
                                                                <p className="text-3.5 font-semibold" >{item.Ten_san_pham}</p>
                                                                <p className='text-3.5 text-red-500 font-semibold inline-block mr-4'>{item.Gia_san_pham.toLocaleString() || ''}  ₫</p>
                                                                <p className='text-3 text-red-500 inline-block line-through'>{(item.Gia_san_pham + (item.Gia_san_pham * (10 / 100))).toLocaleString() || ''}  ₫</p>
                                                                {/* <input
                                                        value={item.Ten_san_pham}
                                                        // onChange={() => { setSateData({ ...stateData, Ten_san_pham: item.Ten_san_pham }) }}
                                                        {...register('Gia_san_pham', { required: true })}
                                                    /> */}
                                                                {/* <p
                                                        {...register('Gia_san_pham', { required: true })}
                                                        className="mt-4 ">{item.Gia_san_pham}</p> */}

                                                                <div className='my-4 text-center'>
                                                                    {/* <p
                                                            {...register('So_luong', { required: true })}
                                                            className="mt-2 ">{item.So_luong}</p> */}
                                                                    <input
                                                                        onClick={() => {
                                                                            let storage = localStorage.getItem('arrProduct') // Lấy list giỏ hàng trên local gán cho storage
                                                                            if (storage) {
                                                                                let cart = JSON.parse(storage) // convert storage ra dạng mảng ròi gán cho cart
                                                                                cart.map((itemStorage) => { // duyệt mảng
                                                                                    if (itemStorage.id_Product === item.id_Product && itemStorage.Ten_phien_ban === item.Ten_phien_ban) { // check id vs version từng phẩn từ trong mảng vs sản phẩm muốn giảm
                                                                                        if (itemStorage.So_luong > 0) { // nếu số lượng sản phẩm đó lớn hơn 0                                                               
                                                                                            itemStorage.So_luong -= 1  // Trừ đi 1
                                                                                            localStorage.setItem('arrProduct', JSON.stringify([...cart])) // Cập nhật lạt giỏ hảng
                                                                                            navigate('/Cart') // Làm mới trang
                                                                                        }
                                                                                        if (itemStorage.So_luong <= 0) { // Nếu sản phẩm <=0
                                                                                            cart = cart.filter(itemCart => itemCart.id_Product !== item.id_Product || itemCart.Ten_phien_ban !== item.Ten_phien_ban) // Lấy ra cái list kh liên quan đến sản phẩm này
                                                                                            localStorage.setItem('arrProduct', JSON.stringify(cart)) // Cập nhật cái giỏ hàng và xóa sản phẩm này
                                                                                            navigate('/Cart') // Làm mới trang
                                                                                        }

                                                                                    }
                                                                                })
                                                                            }
                                                                        }}
                                                                        className="minus is-form  hover:text-red-500 cursor-pointer" type="button" value="-" />
                                                                    <input aria-label="quantity" readOnly className="input-qty outline-none" max="10" min="1" name="" type="number" value={item.So_luong || 0} id="textbox" />
                                                                    <input
                                                                        onClick={() => {
                                                                            let storage = localStorage.getItem('arrProduct')
                                                                            if (storage) {
                                                                                let cart = JSON.parse(storage)
                                                                                cart.map((itemStorage) => {
                                                                                    if (itemStorage.id_Product === item.id_Product && itemStorage.Ten_phien_ban === item.Ten_phien_ban) {
                                                                                        if (itemStorage.So_luong < 30) {
                                                                                            itemStorage.So_luong += 1
                                                                                            localStorage.setItem('arrProduct', JSON.stringify([...cart]))
                                                                                            navigate('/Cart')
                                                                                        }
                                                                                    }
                                                                                })
                                                                            }
                                                                        }}
                                                                        className="plus is-form  hover:text-red-500 cursor-pointer" type="button" value="+" />
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div> : ''
                                            ))
                                            :
                                            <div className='mb-2 border border-gray-300 p-3 rounded-3 text-center'><span className='text-5 text-red-800'>Chưa có sản phẩm trong giỏ hàng</span></div>
                                        :
                                        <div className='mb-2 border rounded-3 p-2 text-center border-gray-300'><span className='text-5 text-red-800 font-semibold'>Chưa có sản phẩm trong giỏ hàng</span></div>
                                }
                                <div className='flex'>
                                    <p className='mt-4 font-bold'>Tổng thanh toán: </p>
                                    <p className='mt-4 mx-2 text-red-600 font-bold'>{sumPayment.toLocaleString()} ₫</p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="basis-1/3">
                        <div className="mt-14 p-3 bg-white">
                            <div className='text-center pt-2'>
                                <span className='text-5 uppercase text-green-950 font-semibold'> Thông tin đặt hàng</span>
                            </div>
                            <div className=" rounded-[12px]">
                                <div className="p-4">
                                    <div className="mt-8">
                                        <input
                                            placeholder='Họ và tên'
                                            value={stateInfoUser.Ho_ten}
                                            readOnly={email ? true : false}
                                            type="text"
                                            name="hovaten"
                                            className="mt-1 p-2 pl-5 text-3.5 text-gray-800 font-semibold focus:outline-none bg-slate-50 rounded-5 border border-gray-400 w-full"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <input
                                            placeholder='Số điện thoại'
                                            type="number"
                                            name="sdt"
                                            readOnly={email ? true : false}
                                            value={stateInfoUser.Dien_thoai}
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
                                            placeholder='Email'
                                            value={stateInfoUser.Email}
                                            readOnly={email ? true : false}
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
                                                    </div>) : <div className="mt-4">
                                                        <button
                                                            className="mt-1 p-2 text-center w-full hover:bg-green-950 border focus:outline-none rounded-2 cursor-pointer bg-green-800 text-white"
                                                        >Xác nhận đặt hàng
                                                        </button>
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

export default Cart
