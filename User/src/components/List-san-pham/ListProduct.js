import BackHome from "components/Trang-chu/BackHome"
import { listSmartphone } from "models/Home.model"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import ShowButton from "./ShowButton"
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/actions'
import { listProductSelector } from '../../redux/selector'
import LimitProduct from "components/Trang-chu/LimitProduct"
import axios from "axios"

const ListSmartphone = () => {

    const dispatch = useDispatch()
    const listSmartphone = useSelector(listProductSelector)
    const navigate = useNavigate()

    const [stateListSmartphone, setStateListSmartphone] = useState([])
    const [ID, setID] = useState()
    const [limit, setLimit] = useState(5)
    const [stateAllProduct, setStateAllProduct] = useState()

    const nameProductGroupLocal = localStorage.getItem("nameProductGroup")
    const idProductGroupLocal = localStorage.getItem("idProductGroup")


    useEffect(() => {
        setLimit(5)
        dispatch(actions.getListSmartphoneAction.getListSmartphoneRequest({
            idGroupProduct: idProductGroupLocal,
            limit: 5
        }))
    }, [idProductGroupLocal])

    useEffect(() => {
        axios.get(`http://localhost:7001/api/get-smartphone?id=${idProductGroupLocal}&limit=${0}`)
            .then(listData => setStateAllProduct(listData.data))
            .catch(e => console.log(e))
    }, [idProductGroupLocal])

    useEffect(() => {
        try {
            if (listSmartphone) {
                setStateListSmartphone(listSmartphone)
            }
        } catch (e) {

        }
    }, [listSmartphone])

    const refreshPage = () => {
        navigate(0);
    }

    const idProduct = stateListSmartphone.map((item) => item.id)

    const handleOnClickSeeMore = () => {
        let limitNew = limit + 5
        setLimit(limitNew)
        dispatch(actions.getListSmartphoneAction.getListSmartphoneRequest({
            idGroupProduct: idProductGroupLocal,
            limit: limitNew
        }))
    }

    useEffect(() => {
        if (stateAllProduct && stateListSmartphone && stateListSmartphone.length !== 0) {
            console.log('all', stateAllProduct.length);
            console.log('Group', stateListSmartphone.length);
        }
    }, [stateAllProduct && stateListSmartphone])

    return (
        <>
            <div className="bg-gray-100" style={{ 'padding': '0 70px' }}>
                <div className="bg-white">
                    <div>
                        <BackHome />
                    </div>
                    <div className="w-54 rounded-2 mb-5">
                        <div className=" text-center w-full pr-5 ml-20 border-l-25 border-green-200 p-2 bg-green-950">
                            <span className='text-3.5 font-semibold text-white'>{nameProductGroupLocal || 'Điện Thoại'}</span>
                        </div>
                    </div>
                    <div className="overflow-hidden w-full" style={{ 'margin': '0 54px' }} >
                        {stateListSmartphone.map((item, index) => (
                            <div onMouseEnter={() => { const exist = idProduct.includes(item.id); exist ? setID(item.id) : '' }} className='p-5 relative mx-3 my-5 w-56 h-96  box-shadow rounded-2 float-left' style={{ 'background-color': '#e4eded3d' }}>
                                {
                                    item.So_luong_SP <= 5 ? <LimitProduct soLuong={item.So_luong_SP} /> : ''
                                }
                                {
                                    item.So_luong_SP <= 5 && item.So_luong_SP > 0 ?
                                        <div className="absolute animate-bounce w-10 top-0 left-0">
                                            <img className="w-full" src='https://hoanghamobile.com/Content/web/sticker/hot.png' />
                                        </div> : ''
                                }
                                {
                                    item.So_luong_SP === 0 ?
                                        <div className="absolute bg-green-950 p-1 rounded-2 px-2 top-0 right-0">
                                            <span className="text-3 text-white font-">Vui lòng đợi vài ngày</span>
                                        </div> : ''

                                }

                                <div className='shadow-soft-xs h-54 bg-white rounded-2 p-4'>
                                    <img className='zoom-image hover:zoom-image-hover w-full' src={item.Hinh_anh} />
                                </div>
                                <div className='text-center h-24 mb-2'>
                                    <div className='pt-2 pb-1max-h-20 h-20 overflow-hidden'>
                                        <span className='text-3.5 font-semibold text-black'>{item.Ten_san_pham} - Chính hãng</span>
                                    </div>
                                    <div className='pb-2'>
                                        <span className='text-red-600 text-3.5 mr-5 font-semibold'>{item.Gia_san_pham.toLocaleString()}  ₫</span>
                                        <span className='line-through text-3'>{(item.Gia_san_pham + (item.Gia_san_pham * (10 / 100))).toLocaleString()}  ₫</span>
                                    </div>
                                </div>
                                {
                                    ID === item.id ? <div className="mt-5"> <ShowButton Id={item.id} nameProduct={item.Ten_san_pham} /> </div> : ''
                                }

                            </div>

                        ))}
                    </div>
                    {
                        (stateAllProduct && stateListSmartphone && stateListSmartphone.length !== 0) ?
                            stateAllProduct.length === stateListSmartphone.length ?
                                '' : <div className="my-5 text-center">
                                    <button onClick={handleOnClickSeeMore} className="px-20 py-1 border-2 rounded-1 border-green-950 shadow-soft-xxs  font-semibold italic text-green-950 bg-white hover:bg-green-950 hover:text-white text-3.2">{`Xem thêm ${parseInt(stateAllProduct.length) - parseInt(stateListSmartphone.length)} sản phẩm`}</button>
                                </div> : ''
                    }
                </div>
            </div>
        </>
    )
}

export default ListSmartphone