import React, { useEffect, useState } from 'react'
import FileBase64 from 'react-file-base64'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/actions/actions'
import { listProductTypeSelector, listProductGroupSelector, messageCreateProductSelector } from 'redux/selector/selector';
import AddSuccess from './AddSuccess';


const ModalThemSP = ({ isClose }) => {

    const dispatch = useDispatch()
    const dataListProDuctType = useSelector(listProductTypeSelector)
    const dataListProDuctGroup = useSelector(listProductGroupSelector)
    const messageCreateProduct = useSelector(messageCreateProductSelector)

    const [stateDataProductType, setStateDataProductType] = useState([])
    const [stateDataProductGroup, setStateDataProductGroup] = useState([])
    const [message, setMessage] = useState('')
    const [showSuccess, setShowSuccess] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onChange"
    });

    // const convertBase64 = (file) => {
    //     let fileString = ''
    //     const reader = new FileReader()
    //     reader.onloadend = () => {
    //         fileString = reader.result.toString()
    //         setState(fileString)

    //     }
    //     reader.readAsDataURL(file)
    // }

    useEffect(() => {
        dispatch(actions.getListProductTypeAction.getListProductTypeRequest())
        dispatch(actions.getListProductGroupAction.getListProductGroupRequest())
    }, [])

    useEffect(() => {
        try {
            if (dataListProDuctType) {
                setStateDataProductType(dataListProDuctType)
            }
        } catch (e) {
            console.log('');
        }
    }, [dataListProDuctType])

    useEffect(() => {
        try {
            if (dataListProDuctGroup) {
                setStateDataProductGroup(dataListProDuctGroup)
            }
        } catch (e) {
            console.log('');
        }
    }, [dataListProDuctGroup])

    const dataSubmit = (data) => {
        let image = ''
        const reader = new FileReader()
        reader.onloadend = () => {
            image = reader.result.toString()
            let dataReturn = {
                Ten_san_pham: data.Ten_san_pham,
                Hinh_anh: image,
                So_luong_SP: data.So_luong_SP,
                Gia_san_pham: data.Gia_san_pham,
                Thong_tin_bao_hanh: data.Thong_tin_bao_hanh,
                Ghi_chu: data.Ghi_chu,
                Id_loai_SP: data.Id_loai_SP,
                Id_nhom_SP: data.Id_nhom_SP
            }
            dispatch(actions.postCreateProductAction.postCreateProductRequest(dataReturn))
        }
        reader.readAsDataURL(data.Hinh_anh[0])
    }

    useEffect(() => {
        try {
            if (messageCreateProduct) {
                if (messageCreateProduct.errCode === '0') {
                    setMessage('Thêm thành công')
                    setShowSuccess(true)
                }
                if (messageCreateProduct.errCode !== '0') {
                    setMessage(messageCreateProduct.message)
                    setShowSuccess(true)
                }
            }
        } catch (e) {
            console.log('Lỗi', e);
        }
    }, [messageCreateProduct])

    const showMessage = () => {
        setShowSuccess(false)
        messageCreateProduct.errCode = ''
    }

    useEffect(() => {
        if (showSuccess) {
            const timer = setTimeout(() => {
                setShowSuccess(false)
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showSuccess]);

    return (
        <>
            <div className=''>
                <form onSubmit={handleSubmit(dataSubmit)}>
                    <div className='bg-white w-180-em animate-modalForm'>
                        <div className='h-10 leading-10 bg-blue-450 border-b border-slate-200' >
                            <span className='text-5 font-semibold text-white ml-4'>Thêm sản phẩm</span>
                            <div className='float-right '>
                                <span onClick={isClose}>
                                    <i className="bi cursor-pointer bi-x-circle-fill text-slate-50 text-6 mr-5 hover:text-slate-900"></i>
                                </span>
                            </div>
                        </div >
                        <div className='p-3'>
                            <div className='pl-3 pt-2 rounded-5 border border-gray-300'>
                                <div className='px-2 pb-3 mt-1'>
                                    <input
                                        className='w-full placeholder:text-gray-500 text-3.5 border-2 rounded-2 focus:outline-none focus:border-red-200 hover:border-slate-200 border-slate-100 focus:bg-white pl-5 py-2 text-slate-800 font-medium'
                                        {...register('Ten_san_pham', { required: true })}
                                        placeholder='Tên sản phẩm'
                                    />
                                    {
                                        errors.Ten_san_pham && <span className="text-red-500 text-3 italic">Vui lòng nhập tên sản phẩm </span>
                                    }
                                </div>
                                <div className='px-2'>
                                    <div className=" pb-3">
                                        <input
                                            type='number'
                                            className='w-full placeholder:text-gray-500  text-3.5 border-2 rounded-2  focus:outline-none focus:border-red-200 hover:border-slate-200 border-slate-100 pl-5 py-2 text-slate-800 font-medium'
                                            {...register('Gia_san_pham', { required: true })}
                                            placeholder='Giá sản phẩm'
                                        />
                                        {
                                            errors.Gia_san_pham && <span className="text-red-500 text-3 italic">Vui lòng nhập giá sản phẩm </span>
                                        }
                                    </div>
                                </div>

                                <div className='px-2 pb-3 mt-1'>
                                    <input
                                        type='number'
                                        className='w-full shadow-soft-xxs placeholder:text-gray-500 text-3.5 border-2 rounded-2  focus:outline-none focus:border-red-200 hover:border-slate-200 border-slate-100 pl-5 py-2 text-slate-800 font-medium' placeholder='Số lượng'
                                        {...register('So_luong_SP', { required: true })}
                                    />
                                    {
                                        errors.So_luong_SP && <span className="text-red-500 text-3 italic">Vui lòng nhập số lượng </span>
                                    }
                                </div>
                                <div className='px-2 pb-3'>
                                    <label className="mb-2 text-gray-900 text-3.5 font-semibold">Hình ảnh : </label>
                                    <input
                                        type="file"
                                        className="block w-3/5 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        {...register('Hinh_anh', { required: true })}
                                    />
                                </div>
                                <div className='px-2 pb-3 mt-1'>
                                    <input
                                        className='w-full shadow-soft-xxs placeholder:text-gray-500 text-3.5 border-2 rounded-2  focus:outline-none focus:border-red-200 hover:border-slate-200 border-slate-100 pl-5 py-2 text-slate-800 font-medium' placeholder='Thông tin bảo hành'
                                        {...register('Thong_tin_bao_hanh', { required: false })}
                                    />
                                </div>
                                <div className='px-2 pb-3 mt-1'>
                                    <label className='inline-block w-1/2 text-gray-900 text-3.5 font-semibold'>Loại sản phẩm : </label>
                                    <select
                                        className='w-1/2 px-7 shadow-soft-xxs text-3.5 border-2 py-2 outline-none text-slate-800 font-medium rounded-2'
                                        {...register('Id_loai_SP', { required: false })}
                                    >
                                        {
                                            stateDataProductType.map((item) => (
                                                <option value={item.id}>{item.Ten_loai_SP}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className='px-2 pb-2 mt-1'>
                                    <label className='inline-block w-1/2 text-gray-900 text-3.5 font-semibold'>Nhóm sản phẩm :</label>
                                    <select
                                        className='w-1/2 px-7 shadow-soft-xxs text-3.5 border-2 py-2 outline-none text-slate-800 font-medium rounded-2'
                                        {...register('Id_nhom_SP', { required: true })}
                                    >
                                        {
                                            stateDataProductGroup.map((item) => (
                                                <option value={item.id}>{item.Ten_nhom}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className='px-2 pb-3 border-gray-300'>
                                    <textarea
                                        placeholder='Ghi chú...'
                                        className='w-full py-2  text-3.5 border-2 hover:border-slate-200 rounded-2 h-15 focus:outline-none focus:border-red-200 border-slate-100 pl-5 text-slate-800 font-medium'
                                        {...register('Ghi_chu', { required: false })}
                                    />
                                </div>
                                <button className='w-full bg-gradient-dark-gray text-white py-1 rounded-2 hover:opacity-90'> Lưu</button>
                            </div>
                        </div>
                    </div >
                </form >
            </div >

            {
                showSuccess && (<AddSuccess show={showMessage} Mes={message} />)
            }
        </>
    )
}

export default ModalThemSP