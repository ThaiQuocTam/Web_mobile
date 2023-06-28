import React, { useEffect, useState, lazy } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/actions/actions'
import { listProductTypeSelector, listProductGroupSelector, infoProductSelector, messageEditInfoProductSelector } from 'redux/selector/selector';
import EditSuccess from './EditSuccess';

const EditInfoProduct = (props) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const messageEditInfoProduct = useSelector(messageEditInfoProductSelector)
    const infoProduct = useSelector(infoProductSelector)
    const dataListProDuctType = useSelector(listProductTypeSelector)
    const dataListProDuctGroup = useSelector(listProductGroupSelector)
    const [showSuccess, setShowSuccess] = useState(false)
    const [messageModal, setMessageModal] = useState('')
    const [stateDataSubmit, setStateDataSubmit] = useState({
        id: 0,
        Ten_san_pham: '',
        Hinh_anh: '',
        Gia_san_pham: 0,
        So_luong_SP: 0,
        Thong_tin_bao_hanh: '',
        Ghi_chu: '',
        Id_loai_SP: 0,
        Id_nhom_SP: 0
    })

    useEffect(() => {
        dispatch(actions.getListProductTypeAction.getListProductTypeRequest())
        dispatch(actions.getListProductGroupAction.getListProductGroupRequest())
    }, [])


    useEffect(() => {
        try {
            if (dataListProDuctType || dataListProDuctGroup) {
                setStateDataProductType(dataListProDuctType)
                setStateDataProductGroup(dataListProDuctGroup)
            }
        } catch (e) {
        }
    }, [dataListProDuctType || dataListProDuctGroup])

    useEffect(() => {
        try {
            if (infoProduct) {
                setStateDataSubmit({
                    id: infoProduct.id,
                    Ten_san_pham: infoProduct.Ten_san_pham,
                    Hinh_anh: infoProduct.Hinh_anh,
                    Gia_san_pham: infoProduct.Gia_san_pham,
                    So_luong_SP: infoProduct.So_luong_SP,
                    Thong_tin_bao_hanh: infoProduct.Thong_tin_bao_hanh,
                    Ghi_chu: infoProduct.Ghi_chu,
                    Id_loai_SP: infoProduct.Id_loai_SP,
                    Id_nhom_SP: infoProduct.Id_nhom_SP
                })
            }
        } catch (e) {

        }
    }, [infoProduct])

    const convertBase64 = (file) => {
        let fileString = ''
        const reader = new FileReader()
        reader.onloadend = () => {
            fileString = reader.result.toString()
            setStateDataSubmit({ ...stateDataSubmit, Hinh_anh: fileString })
        }
        reader.readAsDataURL(file)
    }

    const handleSubmitEdtProduct = () => {
        dispatch(actions.postEditInfoProductAction.postEditInfoProductRequest(stateDataSubmit))
    }

    useEffect(() => {
        try {
            if (messageEditInfoProduct) {
                if (messageEditInfoProduct.errCode === '0') {
                    setShowSuccess(true)
                    setMessageModal('Chỉnh sửa thành công')
                }
                else {
                    setShowSuccess(true)
                    setMessageModal(messageEditInfoProduct.message)
                }
            }
        } catch (e) {

        }
    }, [messageEditInfoProduct])

    const handleHideModal = () => {
        setShowSuccess(false)
        messageEditInfoProduct.errCode = ''
    }

    useEffect(() => {
        if (showSuccess) {
            const timer = setTimeout(() => {
                setShowSuccess(false)
                return () => clearTimeout(timer);
            }, 3000);
        }
    }, [showSuccess]);

    return (
        <>
            <div className=''>
                <form>
                    <div className='bg-white w-180-em animate-modalForm'>
                        <div className='h-10 leading-10 bg-blue-450 border-b border-slate-200' >
                            <span className='text-5 font-semibold text-white ml-4   inline-block h-10 overflow-hidden w-85pc '> {stateDataSubmit.Ten_san_pham} </span>
                            <div className='float-right '>
                                <span className=''>
                                    <i onClick={props.isClose} className="bi cursor-pointer bi-x-circle-fill text-slate-50 text-6 mr-5 hover:text-slate-900"></i>
                                </span>
                            </div>
                        </div >
                        <div className='p-3'>
                            <div className='pl-3 pt-2 rounded-5 border border-gray-300'>
                                <div className='px-2 pb-3 mt-1'>
                                    <input
                                        readOnly
                                        value={stateDataSubmit.Ten_san_pham}
                                        className='w-full placeholder:text-gray-500 bg-slate-50 text-3.5 border-2 rounded-2 focus:outline-none focus:border-red-200 border-slate-100 pl-5 py-2 text-slate-800 font-medium'
                                        placeholder=''
                                    />
                                </div>
                                <div className='px-2'>
                                    <div className=" pb-3">
                                        <input
                                            value={stateDataSubmit.Gia_san_pham}
                                            onChange={(e) => setStateDataSubmit({ ...stateDataSubmit, Gia_san_pham: e.target.value })}
                                            type='number'
                                            className='w-full placeholder:text-gray-500  text-3.5 border-2 rounded-2  focus:outline-none focus:border-red-200 hover:border-slate-200 border-slate-100 pl-5 py-2 text-slate-800 font-medium'
                                            placeholder='Giá sản phẩm'
                                        />

                                    </div>
                                </div>

                                <div className='px-2 pb-3 mt-1'>
                                    <input
                                        value={stateDataSubmit.So_luong_SP}
                                        onChange={(e) => setStateDataSubmit({ ...stateDataSubmit, So_luong_SP: e.target.value })}
                                        type='number'
                                        className='w-full shadow-soft-xxs placeholder:text-gray-500 text-3.5 border-2 rounded-2  focus:outline-none focus:border-red-200 hover:border-slate-200 border-slate-100 pl-5 py-2 text-slate-800 font-medium' placeholder='Số lượng'
                                    />
                                </div>
                                <div className='px-2 pb-3'>
                                    <label className="mb-2 text-gray-900 text-3.5 font-semibold">Hình ảnh : </label>
                                    <div className='flex'>
                                        <div className='w-70pc leading-30'>
                                            <input
                                                type="file"
                                                onChange={(e) => convertBase64(e.target.files[0])}
                                                className="block leading-30 w-3/5 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                            />
                                        </div>
                                        <div>
                                            <img className='w-30 h-30' src={stateDataSubmit.Hinh_anh} />
                                        </div>
                                    </div>

                                </div>
                                <div className='px-2 pb-3 mt-1'>
                                    <input
                                        value={stateDataSubmit.Thong_tin_bao_hanh}
                                        onChange={(e) => setStateDataSubmit({ ...stateDataSubmit, Thong_tin_bao_hanh: e.target.value })}
                                        className='w-full shadow-soft-xxs placeholder:text-gray-500 text-3.5 border-2 rounded-2  focus:outline-none focus:border-red-200 hover:border-slate-200 border-slate-100 pl-5 py-2 text-slate-800 font-medium' placeholder='Thông tin bảo hành'
                                    />
                                </div>
                                <div className='px-2 pb-3 mt-1'>
                                    <label className='inline-block w-1/2 text-gray-900 text-3.5 font-semibold'>Loại sản phẩm : </label>
                                    <select
                                        onChange={(e) => { setStateDataSubmit({ ...stateDataSubmit, Id_loai_SP: e.target.value }) }}
                                        className='w-1/2 px-7 shadow-soft-xxs text-3.5 border-2 py-2 outline-none text-slate-800 font-medium rounded-2'
                                    >
                                        {
                                            dataListProDuctType.map((item) => (
                                                <option value={item.id} selected={item.id === stateDataSubmit.Id_loai_SP ? 'selected' : ''} >{item.Ten_loai_SP}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className='px-2 pb-3 mt-1'>
                                    <label className='inline-block w-1/2 text-gray-900 text-3.5 font-semibold'>Nhóm sản phẩm :</label>
                                    <select
                                        onChange={(e) => { setStateDataSubmit({ ...stateDataSubmit, Id_nhom_SP: e.target.value }) }}
                                        className='w-1/2 px-7 shadow-soft-xxs text-3.5 border-2 py-2 outline-none text-slate-800 font-medium rounded-2'
                                    >
                                        {
                                            dataListProDuctGroup.map((item) => (
                                                <option value={item.id} selected={item.id === stateDataSubmit.Id_nhom_SP ? 'selected' : ''} >{item.Ten_nhom}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className='px-2 pb-3 border-gray-300'>
                                    <textarea
                                        value={stateDataSubmit.Ghi_chu}
                                        onChange={(e) => setStateDataSubmit({ ...stateDataSubmit, Ghi_chu: e.target.value })}
                                        placeholder='Ghi chú...'
                                        className='w-full py-2 text-3.5 border-2 hover:border-slate-200 rounded-2 h-15 focus:outline-none focus:border-red-200 border-slate-100 pl-5 text-slate-800 font-medium'
                                    />
                                </div>
                                <div className='px-2 w-full text-center mb-5'>
                                    <Link to='#' onClick={handleSubmitEdtProduct} className='w-full block bg-gradient-dark-gray text-white py-1 rounded-2 hover:opacity-90'> Lưu</Link>
                                </div>
                            </div>
                        </div>
                    </div >
                </form >
            </div >

            {
                showSuccess && <EditSuccess isClose={handleHideModal} mes={messageModal} />
            }
        </>
    )
}

export default EditInfoProduct