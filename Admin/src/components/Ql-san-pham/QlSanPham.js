import { useState, useEffect } from 'react'
import ModalThemSP from './ModalThemSP'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/actions/actions'
import {
    listProductSelector,
    listProductTypeSelector,
    listProductGroupSelector,
    messageEditInfoProductSelector,
    infoProductSearchedSelector
} from 'redux/selector/selector';
import EditInfoProduct from './EditInfoProduct';
import axios from 'axios';
import ModalAddProductDetail from './ModalAddProductDetail';


const QlSanPham = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const listProduct = useSelector(listProductSelector)
    const dataListProDuctType = useSelector(listProductTypeSelector)
    const dataListProDuctGroup = useSelector(listProductGroupSelector)
    const mesEditInfoProduct = useSelector(messageEditInfoProductSelector)
    const infoProduct = useSelector(infoProductSearchedSelector)

    const [showModalAddProduct, setShowModalAddProduct] = useState(false)
    const [limit, setLimit] = useState(5)
    const [pageSize, setPageSize] = useState(20)
    const [showModalAddProductDetail, setShowModalAddProductDetail] = useState(false)
    const [showModalEditInfoProduct, setShowModalEditInfoProduct] = useState(false)
    const [stateListProduct, setStateListProduct] = useState([])
    const [stateDataProductType, setStateDataProductType] = useState([])
    const [stateDataProductGroup, setStateDataProductGroup] = useState([])
    const [stateListProductDetail, setStateListProductDetail] = useState()
    const [stateValueSearchProduct, setStateValueSearchProduct] = useState({
        Ten_san_pham: ''
    })

    const hideModalAddProduct = () => {
        navigate(0)
        setShowModalAddProduct(false)
    }


    const hideModalEditInfoProduct = () => {
        setShowModalEditInfoProduct(false)
        navigate(0)
    }

    useEffect(() => {
        dispatch(actions.getProductAction.getProductRequest(pageSize))
        dispatch(actions.getListProductTypeAction.getListProductTypeRequest())
        dispatch(actions.getListProductGroupAction.getListProductGroupRequest())
    }, [])

    useEffect(() => {
        if (infoProduct) {
            setStateListProduct(infoProduct)
        }
    }, [infoProduct])

    useEffect(() => {
        if (stateValueSearchProduct.Ten_san_pham !== '') {
            setLimit(5)
            dispatch(actions.getSearchProductAction.getSearchProductRequest({
                Ten_san_pham: stateValueSearchProduct.Ten_san_pham,
                limit: 5
            }))
            setStateListProduct([])
        }
        else {
            if (listProduct) {
                setStateListProduct([])
                setStateListProduct(listProduct)
            }
        }
    }, [listProduct && stateValueSearchProduct])

    useEffect(() => {
        if (listProduct) {
            axios.get(`http://localhost:7001/api/get-all-product-detail`)
                .then(listProductDetail => listProductDetail.data.length !== 0 ? setStateListProductDetail(listProductDetail.data) : 'không có')
                .catch(e => console.log(e))
        }
        if (dataListProDuctType) {
            setStateDataProductType(dataListProDuctType)
        }
        if (dataListProDuctGroup) {
            if (dataListProDuctGroup.length !== 0) {
                setStateDataProductGroup(dataListProDuctGroup)
            }
            else {
                console.log(dataListProDuctGroup);
            }
        }
    }, [listProduct || dataListProDuctType && dataListProDuctGroup])

    const handleHideModalAddProductDetail = () => {
        navigate(0)
        setShowModalAddProductDetail(false)
    }

    const handleOnClickSeeMore = () => {
        let limitMore = limit + 5
        setLimit(limitMore)
        dispatch(actions.getSearchProductAction.getSearchProductRequest({
            Ten_san_pham: stateValueSearchProduct.Ten_san_pham,
            limit: limitMore
        }))
    }

    const handleOnClickGetMoreInfoProduct = () => {
        let pageSizeMore = pageSize + 10
        setPageSize(pageSizeMore)
        axios.get(`http://localhost:7001/api/get-list-product?limit=${pageSizeMore}`)
            .then(listData => setStateListProduct(listData.data))
            .catch(e => console.log(e))
    }

    return (
        <>
            <div className='font-bold text-3xl text-gray-700 pb-3 border-b border-slate-200'>Danh sách sản phẩm</div>
            <div className='w-full mt-4'>
                <div className='inline-block relative'>
                    <input
                        value={stateValueSearchProduct.Ten_san_pham}
                        onChange={(e) => { setStateValueSearchProduct({ Ten_san_pham: e.target.value }) }
                        }
                        className='border focus:outline-none border-green-700 text-3.5 hover:border-green-900 focus:border placeholder:text-3 placeholder:text-slate-500 focus:border-green-900 rounded-5 h-10 w-96 mr-3 px-5' type={'text'} placeholder='Nhập sản phẩm cần tìm...' />
                    <a className='inline-block h-10 leading-10' href='#'><i className="bi bi-search text-gray-600 h-10 inline-block hover:text-black text-5 cursor-pointer leading-10"></i></a>
                </div>
                <div className="leading-9 h-9 mb-5 inline-block ml-540" onClick={() => setShowModalAddProduct(true)}>
                    <strong className='text-3.5 text-black border-gray-500 border-2 px-3 py-3 ml-2 rounded-2 cursor-pointer hover:bg-slate-600 hover:text-white'> + &ensp; Thêm Sản Phẩm</strong>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className=" inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="w-full overflow-auto block h-36-rem">
                                <thead className=" border-b">
                                    <tr className=''>
                                        <th scope="col" className=" w-80 text-sm sticky top-0 bg-gray-400 font-semibold py-2 px-2 text-4 text-black  text-center">
                                            STT
                                        </th>
                                        <th scope="col" className=" w-80 text-sm sticky top-0 bg-gray-400  px-2 font-semibold text-black text-4 text-center">
                                            Tên sản phẩm
                                        </th>
                                        <th scope="col" className=" w-80 text-sm sticky top-0 bg-gray-400  px-2 font-semibold text-black text-4 text-center">
                                            Hình ảnh
                                        </th>

                                        <th scope="col" className=" w-80 text-sm sticky top-0 bg-gray-400  px-2 font-semibold text-black text-4 text-center">
                                            Số lượng
                                        </th>
                                        <th scope="col" className=" w-80 text-sm sticky top-0 bg-gray-400  px-2 font-semibold text-black text-4 text-center">
                                            hãng
                                        </th>
                                        <th scope="col" className=" w-80 text-sm sticky top-0 bg-gray-400  px-2 font-semibold text-black text-4 text-center">
                                            Nhóm sản phẩm
                                        </th>
                                        <th scope="col" className=" w-80 text-sm sticky top-0 bg-gray-400  px-2 font-semibold text-black text-4 text-center">
                                            Thông tin bảo hành
                                        </th>
                                        <th scope="col" className=" w-80 text-sm sticky top-0 bg-gray-400  px-2 font-semibold text-black text-4 text-center">
                                            Giá sản phẩm
                                        </th>
                                        <th scope="col" className=" w-80 text-sm sticky top-0 bg-gray-400  px-2 font-semibold text-black text-4 text-center">
                                            Ghi chú
                                        </th>
                                        <th scope="col" className=" w-80 text-sm z-30 sticky top-0 bg-gray-400  px-2 font-semibold text-black text-4 text-center">

                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        stateListProduct.map((item, index) => (
                                            <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                                <td className="whitespace-nowrap text-center text-3.5 text-sm font-medium text-gray-900 px-2 py-2">
                                                    {index + 1}
                                                </td>
                                                <td className="whitespace-nowrap block w-60 overflow-hidden text-ellipsis text-center text-sm text-3.5 font-medium text-gray-900 px-2 py-2" style={{ 'height': '138px', 'line-height': '125px' }}>
                                                    {item.Ten_san_pham}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light whitespace-nowrap text-center">
                                                    <img className="mx-3 my-2 w-24" src={item.Hinh_anh} />
                                                </td>

                                                <td className="text-sm text-gray-900 text-center text-3.5 font-light px-2 py-2 whitespace-nowrap">
                                                    {item.So_luong_SP}
                                                </td>
                                                <td className="text-sm text-center text-gray-900 text-3.5 font-light px-2 py-2 whitespace-nowrap">
                                                    {
                                                        stateDataProductType.map((item2) => (
                                                            item.Id_loai_SP === item2.id ? item2.Ten_loai_SP : ''
                                                        ))
                                                    }
                                                </td>
                                                <td className="text-sm text-center text-gray-900 text-3.5 font-light px-2 py-2 whitespace-nowrap">
                                                    {
                                                        stateDataProductGroup.map((item2) => (
                                                            item.Id_nhom_SP === item2.id ? item2.Ten_nhom : ''
                                                        ))
                                                    }
                                                </td>
                                                <td className="text-sm text-center block w-30 overflow-hidden text-ellipsis text-gray-900 text-3.5 font-light px-2 py-2 whitespace-nowrap">
                                                    {item.Thong_tin_bao_hanh}
                                                </td>
                                                <td className="text-sm text-gray-900 text-center text-3.5 font-light px-2 py-2 whitespace-nowrap">
                                                    {item.Gia_san_pham.toLocaleString()} ₫
                                                </td>
                                                <td className="text-sm text-gray-900 block w-30 overflow-hidden text-ellipsis  text-3.5 font-light px-2 py-2 whitespace-nowrap text-center">
                                                    {item.Ghi_chu}
                                                </td>
                                                <td className="text-sm relative text-gray-900 font-light px-2 py-2 whitespace-nowrap text-center">
                                                    <button onClick={() => { localStorage.setItem('id_add_product', item.id); navigate('/VersionProduct') }} className="px-4 top-4 absolute py-1 text-3 text-green-700 border-green-700 font-semibold hover:bg-green-950 hover:text-white hover:border-white border-2 rounded">Phiên bản khác</button>

                                                    {
                                                        stateListProductDetail ?
                                                            stateListProductDetail.some((itemProductDetail) => itemProductDetail.Id_san_pham === item.id) ?
                                                                <Link onClick={() => localStorage.setItem('Id_Product_Detail', item.id)} to="/ProductDetail" className="px-4 py-1 text-sm text-blue-500 border-blue-500 font-semibold hover:bg-blue-500  hover:text-white hover:border-white border-2 rounded">Xem thông Số</Link>
                                                                :
                                                                <Link onClick={() => { setShowModalAddProductDetail(true); localStorage.setItem('id_add_product', item.id); }} className="px-4 py-1 text-sm text-gray-700 border-gray-500 font-semibold hover:bg-gray-500  hover:text-white border-2 rounded">Thêm thông Số</Link>

                                                            // <Link  className="px-4 py-1 absolute top-12 text-sm text-gray-700 border-gray-700 left-1 font-semibold hover:bg-gray-700 hover:text-white hover:border-white border-2 rounded">Thêm thông số</Link>
                                                            :
                                                            ''}
                                                    <button onClick={() => { dispatch(actions.getInfoProductAction.getInfoProductRequest(item.id)); setShowModalEditInfoProduct(true) }} className="px-4 py-1 left-9 bottom-4 text-sm absolute text-black border-black font-semibold hover:bg-slate-600 hover:text-white hover:border-white border-2 rounded">Sửa</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                                {
                                    stateListProduct.length !== 0 ?
                                        stateValueSearchProduct.Ten_san_pham !== '' ?
                                            <div className='text-center'>
                                                <button
                                                    onClick={handleOnClickSeeMore}
                                                    className='italic shadow-soft-xxs p-1 bg-white font-semibold hover:text-white hover:bg-green-950 border-green-950 border px-10 rounded-3 mb-2 mt-2 text-3.2 text-green-950'>Xem thêm...
                                                </button>
                                            </div> :
                                            <div className='text-center'>
                                                <button
                                                    onClick={handleOnClickGetMoreInfoProduct}
                                                    className='italic shadow-soft-xxs p-1 bg-white font-semibold hover:text-white hover:bg-green-950 border-green-950 border px-10 rounded-3 mb-2 mt-2 text-3.2 text-green-950'>Xem thêm...
                                                </button>
                                            </div>
                                        : ''
                                }
                            </table>

                        </div>
                    </div>
                </div>
            </div>
            {
                showModalAddProduct &&
                <div className='fixed flex z-sticky  items-center bg-slate-250 justify-center left-0 top-0 right-0 bottom-0'>
                    <ModalThemSP isClose={hideModalAddProduct} />
                </div>
            }
            {
                showModalEditInfoProduct &&
                <div className='fixed flex z-sticky items-center bg-slate-250 justify-center left-0 top-0 right-0 bottom-0'>
                    <EditInfoProduct isClose={hideModalEditInfoProduct} />
                </div>
            }
            {
                showModalAddProductDetail &&
                <div className='fixed flex z-sticky  items-center bg-slate-250 justify-center left-0 top-0 right-0 bottom-0'>
                    <ModalAddProductDetail isClose={handleHideModalAddProductDetail} />
                </div>
            }
        </>
    )
}

export default QlSanPham