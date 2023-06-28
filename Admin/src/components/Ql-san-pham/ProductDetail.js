import { useEffect, useState } from 'react'
import * as actions from '../../redux/actions/actions'
import { useDispatch, useSelector } from 'react-redux'
import { infoProductDetailSelector, mesEditInfoProductDetailSelector } from 'redux/selector/selector'
import { Link, useNavigate } from 'react-router-dom'
import ModalEditInfoProductDetail from './ModalEditInfoProductDetail'

const ProductDetail = () => {

    const infoProductDetail = useSelector(infoProductDetailSelector)
    const mesEditInfoProductDetail = useSelector(mesEditInfoProductDetailSelector)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [stateInfoProductDetail, setStateInfoProductDetail] = useState()
    const [showModalEditInfoProductDetail, setShowModalEditInfoProductDetail] = useState(false)

    const id_Product = localStorage.getItem('Id_Product_Detail')

    useEffect(() => {
        try {
            if (id_Product) {
                dispatch(actions.getInfoProductDetailAction.getInfoProductDetailRequest(id_Product))
            }
        } catch (e) {
            console.log(e);
        }
    }, [id_Product || mesEditInfoProductDetail])

    useEffect(() => {
        setStateInfoProductDetail(infoProductDetail)
    }, [infoProductDetail || mesEditInfoProductDetail])

    const handleHideModalEditInfoProductDetail = () => {
        setShowModalEditInfoProductDetail(false)
        navigate(0)
    }

    return (
        <>
            <div className='w-full border-b pb-2 mb-4 border-gray-700'>
                <Link className=" leading-9 h-9 block text-green-900 hover:text-green-600" to="/QlSanPham">
                    <i className="bi bi-arrow-left-circle text-8  mr-2 " />
                    <strong className='text-4  '>Quay lại</strong>
                </Link  >
            </div>
            <div className='font-bold text-3xl pb-3'>Thông số sản phẩm</div>
            <div>
                <button onClick={() => setShowModalEditInfoProductDetail(true)} className='text-3.5 text-black border-gray-500 border-2 px-3 pr-5 py-3 font-semibold rounded-2 cursor-pointer hover:bg-slate-600 hover:text-white' >Chỉnh sửa thông tin</button>
            </div>
            <div className='px-5 pt-2 rounded-4'>
                <div className='flex my-5 border-b border-gray-400 pb-2'>
                    <div className='w-20pc'>
                        <span className='text-4 font-semibold text-gray-800'>Công nghệ màn hình</span>
                    </div>
                    <div className='w-80pc'>
                        <span className='text-4 text-gray-800'>{stateInfoProductDetail ? stateInfoProductDetail.info.Cong_nghe_man_hinh : ''}</span>
                    </div>
                </div>
                <div className='flex my-5 border-b border-gray-400 pb-2'>
                    <div className='w-20pc'>
                        <span className='text-4 font-semibold text-gray-800'>Độ phân giải</span>
                    </div>
                    <div className='w-80pc'>
                        <span className='text-4 text-gray-800'>{stateInfoProductDetail ? stateInfoProductDetail.info.Do_phan_giai : ''}</span>
                    </div>
                </div>
                <div className='flex my-5 border-b border-gray-400 pb-2'>
                    <div className='w-20pc'>
                        <span className='text-4 font-semibold text-gray-800'>Hệ điều hành</span>
                    </div>
                    <div className='w-80pc'>
                        <span className='text-4 text-gray-800'>{stateInfoProductDetail ? stateInfoProductDetail.info.He_dieu_hanh : ''}</span>
                    </div>
                </div>
                <div className='flex my-5 border-b border-gray-400 pb-2'>
                    <div className='w-20pc'>
                        <span className='text-4 font-semibold text-gray-800'>Chíp xử lý</span>
                    </div>
                    <div className='w-80pc'>
                        <span className='text-4 text-gray-800'>{stateInfoProductDetail ? stateInfoProductDetail.info.Chip_xu_ly : ''}</span>
                    </div>
                </div>
                <div className='flex my-5 border-b border-gray-400 pb-2'>
                    <div className='w-20pc'>
                        <span className='text-4 font-semibold text-gray-800'>Bộ nhớ ROM</span>
                    </div>
                    <div className='w-80pc'>
                        <span className='text-4 text-gray-800'>{stateInfoProductDetail ? stateInfoProductDetail.info.Bo_nho_ROM : ''}</span>
                    </div>
                </div>
                <div className='flex my-5 border-b border-gray-400 pb-2'>
                    <div className='w-20pc'>
                        <span className='text-4 font-semibold text-gray-800'>RAM</span>
                    </div>
                    <div className='w-80pc'>
                        <span className='text-4 text-gray-800'>{stateInfoProductDetail ? stateInfoProductDetail.info.RAM : ''}</span>
                    </div>
                </div>
                <div className='flex my-5 border-b border-gray-400 pb-2'>
                    <div className='w-20pc'>
                        <span className='text-4 font-semibold text-gray-800'>Dung lượng pin</span>
                    </div>
                    <div className='w-80pc'>
                        <span className='text-4 text-gray-800'>{stateInfoProductDetail ? stateInfoProductDetail.info.Dung_luong_PIN : ''}</span>
                    </div>
                </div>
                <div className='flex'>
                    <div className='w-20pc'>
                        <span className='text-4 font-semibold text-gray-800'>Hình ảnh</span>
                    </div>
                    <div className='w-80pc mr-48 border border-gray-400 rounded-5 p-2'>
                        <img className='w-full' src={stateInfoProductDetail ? stateInfoProductDetail.info.Hinh_anh : ''} />
                    </div>
                </div>
            </div>
            <div>
                {
                    showModalEditInfoProductDetail && <div className='fixed flex z-sticky  items-center bg-slate-250 justify-center left-0 top-0 right-0 bottom-0'>
                        <ModalEditInfoProductDetail isClose={handleHideModalEditInfoProductDetail} />
                    </div>
                }

            </div>
        </>
    )
}

export default ProductDetail