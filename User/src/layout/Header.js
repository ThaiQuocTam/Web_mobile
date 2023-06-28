import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import image from '../Assets/images/logo.jpg'
import { listProductGroupSelector, signInSelector, getInfoUserSelector } from '../redux/selector/index'
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../redux/actions'
import SignIn from 'components/Sign-in/SignIn';
import axios from 'axios';

const Header = () => {


    const navigate = useNavigate();
    const dispatch = useDispatch()
    const listProductGroup = useSelector(listProductGroupSelector)
    const signData = useSelector(signInSelector)
    const infoUserSelector = useSelector(getInfoUserSelector)

    const [hidden, setHidden] = useState(false)
    const [limit, SetLimit] = useState(5)
    const [stateDataReviewResponseUser, setStateDataReviewResponse] = useState()
    const [stateProductGroup, setStateProductGroup] = useState([])
    const [stateSoluong, setStateSoluong] = useState(0)
    const [showModalSignIn, setShowModalSignIn] = useState(false)
    const [email, setEmail] = useState()
    const [stateValueSearch, setStateValuSearch] = useState('')
    const [stateListSearchProduct, setStateListSearchProduct] = useState()
    const [showNotification, setShowNotification] = useState(false)
    const [dataReview, setDataReview] = useState()
    const [infoUser, setInfoUser] = useState()
    const [listProduct, setListProduct] = useState()
    const [showNotificationRead, setShowNotificationRead] = useState(true)
    const [bgNotificationRead, setBgNotificationRead] = useState('')
    const [bgNotification, setBgNotification] = useState('bg-sky-200 text-blue-500')

    let emailLocal = localStorage.getItem("User")
    let listProductCartLocal = JSON.parse(localStorage.getItem('arrProduct'))

    useEffect(() => {
        let soLuong = 0
        if (listProductCartLocal && email) {
            listProductCartLocal.map((item) => {
                item.email === email ? soLuong = soLuong + item.So_luong : ''
            })
        }
        setStateSoluong(soLuong)
    }, [listProductCartLocal])

    useEffect(() => {
        dispatch(actions.getListProductGroupAction.getListProductGroupRequest())
    }, [])

    useEffect(() => {
        try {
            if (listProductGroup) {
                setStateProductGroup(listProductGroup)
            }
        } catch (e) {
            console.log(e);
        }
    }, [listProductGroup])

    const handleCloseModal = () => {
        setShowModalSignIn(false)
    }

    useEffect(() => {
        if (emailLocal || signData) {
            setEmail(emailLocal)
            dispatch(actions.getInfoUserAction.getInfoUserRequest(emailLocal))
        }
    }, [emailLocal || signData])

    useEffect(() => {
        if (stateValueSearch !== '') {
            SetLimit(5)
            let limitProduct = 5
            axios.get(`http://localhost:7001/api/get-search-product?Ten_san_pham=${stateValueSearch}&limit=${limitProduct}`)
                .then(listProduct => setStateListSearchProduct(listProduct.data))
                .catch(e => console.log(e))
        }
        else {
            setStateListSearchProduct()
        }
    }, [stateValueSearch])

    useEffect(() => {
        if (infoUserSelector) {
            setInfoUser(infoUserSelector)
            axios.get(`http://localhost:7001/api/get-list-product`)
                .then(listData => setListProduct(listData.data))
                .catch(e => console.log(e))
        }
    }, [infoUserSelector])

    useEffect(() => {
        if (infoUser) {
            if (infoUser.Id_phan_quyen === 7) {
                axios.get(`http://localhost:7001/api/get-info-review-not-response`)
                    .then(info => setDataReview(info.data))
                    .catch(e => console.log(e))
            }
            else {
                axios.get(`http://localhost:7001/api/get-info-review-user?Id_user=${infoUser.id}`)
                    .then(reviewData => setStateDataReviewResponse(reviewData.data))
                    .catch(e => console.log(e))
            }
        }
    }, [infoUser || dataReview])


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

    const handleOnClickSeeMore = () => {
        let limitMore = limit + 5
        SetLimit(limitMore)
        axios.get(`http://localhost:7001/api/get-search-product?Ten_san_pham=${stateValueSearch}&limit=${limitMore}`)
            .then(listProduct => setStateListSearchProduct(listProduct.data))
            .catch(e => console.log(e))
    }

    return (
        <>
            <header className='h-200 px-5 z-10 mb-10 bg-white'>
                <div className='flex items-center content-center pl-24'>
                    <div className='w-15pc h-15pc'>
                        <Link to='/' className='w-full h-full block'>
                            <img className='w-full h-full' src={image} />
                        </Link>
                    </div>
                    <ul className=''>
                        <li className='inline-block mr-10'>
                            <div className='relative'>
                                <input
                                    value={stateValueSearch}
                                    onChange={(e) => setStateValuSearch(e.target.value)}
                                    className='border focus:outline-none border-green-700 hover:border-green-900 focus:border placeholder:text-3.5 placeholder:text-slate-500 focus:border-green-900 rounded-5 h-10 w-120 mr-3 pl-5' type={'text'} placeholder='Nhập sản phẩm cần tìm...' />
                            </div>
                            {
                                stateListSearchProduct ?
                                    <div className='mt-1 absolute bg-slate-100  rounded-2 p-3 max-h-96 overflow-auto z-30 cursor-pointer' style={{ width: '525px' }}>
                                        {
                                            stateListSearchProduct.map((item) => (
                                                <div onClick={() => { localStorage.setItem("idProduct", item.id); navigate(`/DetailProduct?Ten_san_pham=${item.Ten_san_pham}`); setStateListSearchProduct(); setStateValuSearch('') }} className='flex mb-3 hover:bg-slate-50 p-1'>
                                                    <div className="mt-1 w-16 mr-5">
                                                        <img className='w-full' src={item.Hinh_anh} />
                                                    </div>
                                                    <div className='mr-5 mt-5'>
                                                        <span className='text-4 text-gray-800 font-semibold w-96 max-w-96 block overflow-hidden'>{item.Ten_san_pham}</span>
                                                        <div className='mt-1'>
                                                            <span className='mr-30 text-3.5 text-gray-700 font-semibold'>{item.Gia_san_pham.toLocaleString()}  ₫</span>
                                                            <span className='text-3.2 text-red-800 line-through '>{(item.Gia_san_pham + (item.Gia_san_pham * (10 / 100))).toLocaleString()}  ₫</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        {
                                            stateListSearchProduct.length !== 0 ?
                                                <div
                                                    className='text-center border-t border-gray-800'>
                                                    <button
                                                        onClick={handleOnClickSeeMore}
                                                        className='italic shadow-soft-xxs p-1 bg-white font-semibold hover:text-white hover:bg-green-950 border-green-950 border px-10 rounded-3 mb-2 mt-2 text-3.2 text-green-950'>Xem thêm...</button>
                                                </div> : ''
                                        }
                                    </div> : ''
                            }


                        </li>
                        <Link to='/Cart'>
                            <li className='inline-block mr-10 text-5 hover:opacity-50'>
                                <a className='inline-block' href='#'>
                                    <i className="bi bi-cart2 inline-block text-green-900 text-6 pr-1"></i>
                                    <span className='w-7 h-7 text-center inline-block text-white text-3.5 p-1 bg-orange-500 rounded-2'>
                                        {stateSoluong || 0}
                                    </span>
                                </a>
                            </li>
                        </Link>
                        {/* <Link to='/Cart'> */}
                        <li className='inline-block mr-10 text-5 relative'>
                            {/* <a className='inline-block hover:opacity-50 ' href='#'> */}

                            <div onClick={() => setShowNotification(!showNotification)}>
                                {
                                    (dataReview && dataReview.listReview.length !== 0) ?
                                        <i class="bi bi-circle-fill animate-spin absolute text-orange-500 text-3 right-0 cursor-pointer"></i> : ''
                                }
                                {
                                    (stateDataReviewResponseUser && stateDataReviewResponseUser.length !== 0) ?
                                        stateDataReviewResponseUser.every((item) => item.Checked === 1) ? ''
                                            : <i class="bi bi-circle-fill animate-spin absolute text-orange-500 text-3 right-0 cursor-pointer"></i>
                                        : ''
                                }
                                <i className="bi bi-bell-fill cursor-pointer inline-block text-green-900 text-6 pr-1"></i>
                            </div>
                            {/* </a> */}
                            {
                                showNotification &&
                                <div className='w-72 animate-modalForm rounded-2 shadow-soft-xxs absolute bg-slate-50  pl-5 p-4 max-h-120    z-50 overflow-auto'>
                                    {
                                        emailLocal ?
                                            showNotification &&
                                            <>
                                                <span className='font-semibold' style={{ 'font-family': 'sans-serif' }}>Thông báo</span>
                                                <div className='flex mt-2 pb-2 mb-2 border-b border-gray-500'>
                                                    <div onClick={() => { setShowNotificationRead(true); setBgNotificationRead(''); setBgNotification('bg-sky-200 text-blue-500') }} className={`mr-10 border text-black hover:bg-slate-200 hover:text-black border-slate-200 py-1 rounded-2 px-2 cursor-pointer ${bgNotification}`}>
                                                        <span className='text-3.5 font-black' >Chưa đọc</span>
                                                        {/* style={{ 'color': '#1877f2' }} */}
                                                    </div>
                                                    <div onClick={() => { setBgNotificationRead('bg-sky-200 text-blue-500'); setBgNotification(''); setShowNotificationRead(false) }} className={`py-1 rounded-2 px-2 border border-slate-200 hover:text-black hover:bg-slate-200 cursor-pointer ${bgNotificationRead}`} >
                                                        <span className='text-3.5 font-black'>Đã đọc</span>
                                                    </div>
                                                </div>
                                                {
                                                    showNotificationRead ?
                                                        <div>
                                                            {
                                                                dataReview ?
                                                                    dataReview.listReview.map((item) => (
                                                                        listProduct.map((itemProduct => (
                                                                            item.Id_san_pham === itemProduct.id ?
                                                                                <a onClick={() => localStorage.setItem("idProduct", itemProduct.id)} href='/DetailProduct#Review'>
                                                                                    <div className='mb-2 hover:bg-slate-500 hover:text-white p-2 rounded-2'>
                                                                                        <span className='text-3.2 font-bold mr-1'>{item.Ten_nguoi_dung}</span>
                                                                                        <span className='text-3.2 mr-1'>Đã bình luận về sản phẩm</span>
                                                                                        <span className='text-3.2 font-semibold'>{itemProduct.Ten_san_pham}</span><br />
                                                                                        <span className='text-3 inline-block overflow-hidden '>({item.Noi_dung})</span><br />
                                                                                        <span className='text-3 '>{convertDate(item.createdAt)}</span>
                                                                                    </div>
                                                                                </a> : ''
                                                                        )))
                                                                    )) : stateDataReviewResponseUser && stateDataReviewResponseUser.length !== 0 ?
                                                                        <>
                                                                            {
                                                                                stateDataReviewResponseUser.map((itemReview) => (
                                                                                    listProduct.map((itemProduct) => (
                                                                                        itemProduct.id === itemReview.Id_san_pham && itemReview.Checked === 0 ?
                                                                                            <a onClick={() => { navigate(0); setShowNotification(false); localStorage.setItem("idProduct", itemProduct.id); axios.put(`http://localhost:7001/api/put-check-review-user`, { Id_review: itemReview.id }) }} href='/DetailProduct#Review'>
                                                                                                <div className='mb-2 hover:bg-slate-500 hover:text-white p-2 rounded-2 relative'>
                                                                                                    <span className='text-2.5 absolute text-green-500 font-semibold mr-5 top-0 ' style={{ 'left': '-18px', 'top': '20px' }}>QTV</span>
                                                                                                    <span className='text-3.2 font-bold mr-1'>{itemReview.Ten_nguoi_dung}</span>
                                                                                                    <span className='text-3.2 mr-1'>Đã trả lời bình luận của bạn tại sản phẩm </span>
                                                                                                    <span className='text-3.2 font-semibold'>{itemProduct.Ten_san_pham}</span><br />
                                                                                                    <span className='text-3 inline-block overflow-hidden '>({itemReview.Noi_dung})</span><br />
                                                                                                    <span className='text-3 '>{convertDate(itemReview.createdAt)}</span>
                                                                                                </div>
                                                                                            </a> : ''
                                                                                    ))
                                                                                ))
                                                                            }
                                                                        </>
                                                                        : ''
                                                            }
                                                        </div>
                                                        :
                                                        <div>
                                                            {
                                                                dataReview && dataReview.listReviewNotResponse ?
                                                                    dataReview.listReviewNotResponse.map((item) => (
                                                                        listProduct.map((itemProduct => (
                                                                            item.Id_san_pham === itemProduct.id ?
                                                                                <a onClick={() => { navigate(0); setShowNotification(false); localStorage.setItem("idProduct", itemProduct.id) }} href='/DetailProduct#Review'>
                                                                                    <div className='mb-2 hover:bg-slate-500 hover:text-white p-2 rounded-2'>
                                                                                        <span className='text-3.2 font-bold mr-1'>{item.Ten_nguoi_dung}</span>
                                                                                        <span className='text-3.2 mr-1'>Đã bình luận về sản phẩm</span>
                                                                                        <span className='text-3.2 font-semibold'>{itemProduct.Ten_san_pham}</span><br />
                                                                                        <span className='text-3 inline-block overflow-hidden '>({item.Noi_dung})</span><br />
                                                                                        <span className='text-3 '>{convertDate(item.createdAt)}</span>
                                                                                    </div>
                                                                                </a> : '')))
                                                                    ))
                                                                    : stateDataReviewResponseUser && stateDataReviewResponseUser.length !== 0 ?
                                                                        <>
                                                                            {
                                                                                stateDataReviewResponseUser.map((itemReview) => (
                                                                                    listProduct.map((itemProduct) => (
                                                                                        itemProduct.id === itemReview.Id_san_pham && itemReview.Checked === 1 ?
                                                                                            <a onClick={() => { navigate(0); setShowNotification(false); localStorage.setItem("idProduct", itemProduct.id) }} href='/DetailProduct#Review'>
                                                                                                <div className='mb-2 hover:bg-slate-500 hover:text-white p-2 rounded-2 relative'>
                                                                                                    <span className='text-2.5 absolute text-green-500 font-semibold mr-5 top-0 ' style={{ 'left': '-18px', 'top': '20px' }}>QTV</span>
                                                                                                    <span className='text-3.2 font-bold mr-1'>{itemReview.Ten_nguoi_dung}</span>
                                                                                                    <span className='text-3.2 mr-1'>Đã trả lời bình luận của bạn tại sản phẩm </span>
                                                                                                    <span className='text-3.2 font-semibold'>{itemProduct.Ten_san_pham}</span><br />
                                                                                                    <span className='text-3 inline-block overflow-hidden '>({itemReview.Noi_dung})</span><br />
                                                                                                    <span className='text-3 '>{convertDate(itemReview.createdAt)}</span>
                                                                                                </div>
                                                                                            </a> : ''
                                                                                    ))
                                                                                ))
                                                                            }
                                                                        </>
                                                                        : ''
                                                            }
                                                        </div>
                                                }


                                            </> :
                                            <div className='text-center'>
                                                <span className='text-3.5  text-red-600 font-semibold'>Vui Lòng đăng nhập</span>
                                            </div>
                                    }
                                </div>
                            }

                        </li>
                        {/* </Link> */}
                        <li className='inline-block mr-10 hover:opacity-50'>
                            <a href='/OrderLookup'>
                                <div className='cursor-pointer'>
                                    <i className="bi bi-clock-history text-6 pr-2 text-green-700"></i>
                                    <span className='inline-block pb-2 text-3.5 font-semibold'>Tra cứu đơn hàng</span>
                                </div>
                            </a>
                        </li>
                        {
                            email ?
                                <li onMouseEnter={() => setHidden(true)} onMouseLeave={() => setHidden(false)} className='inline-block mr-10 relative'>
                                    <div className='cursor-pointer relative'>
                                        {
                                            infoUser && infoUser.Id_phan_quyen === 7 &&
                                            <span className='text-2.5 absolute text-green-500 font-semibold mr-5 top-0 ' style={{ 'right': '-48px' }}><i class="bi bi-check-circle-fill text-3 text-green-600 mr-1"></i>QTV</span>
                                        }
                                        <i className="bi bi-person-fill text-6 pr-2 text-green-700"></i>
                                        <span className='font-semibold text-3.5 relative' >{email}</span>
                                    </div>
                                    {
                                        hidden && <a href='/' onClick={() => localStorage.removeItem('User')} className='absolute bg-slate-500 w-28 h-8 leading-8 text-center rounded-2 cursor-pointer hover:opacity-75 animate-modalForm' style={{ right: '-80px' }}>
                                            <span className='text-white text-3.5'>Đăng xuất</span>
                                            <i class="bi bi-caret-up-fill absolute position-top_-19 left-1 text-slate-500"></i>
                                        </a>
                                    }

                                </li>

                                :
                                <li className='inline-block mr-10 hover:opacity-50'>
                                    <div onClick={() => setShowModalSignIn(true)} className='cursor-pointer'>
                                        <i className="bi bi-person-fill text-6 pr-2 text-green-700"></i>
                                        <span className='font-semibold text-3.5 left-4 right ' >Đăng nhập</span>
                                    </div>
                                </li>
                        }
                    </ul>
                </div >

                <div className='px-32 mt-2 '>
                    <div className='w-full min-h-12 flex justify-center leading-12 items-center bg-green-300 rounded-2 '>
                        {
                            stateProductGroup.map((item) => (
                                <>
                                    <Link onClick={() => { localStorage.setItem("idProductGroup", item.id); localStorage.setItem("nameProductGroup", item.Ten_nhom) }} to={`/ListProduct?${item.Ten_nhom}`}
                                        className={`font-semibold hover:bg-green-950 hover:text-white px-2 inline-block h-12 text-gray-900 uppercase text-4 mr-14`}>
                                        {item.Ten_nhom}
                                    </Link>
                                </>
                            ))
                        }
                    </div>
                </div >
            </header >
            <div>
                {showModalSignIn && <div className='fixed flex z-sticky items-center bg-slate-950 justify-center left-0 top-0 right-0 bottom-0'>
                    <SignIn isClose={handleCloseModal} />
                </div>}
            </div>
        </>

    )
}

export default Header