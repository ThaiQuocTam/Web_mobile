import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/actions/actions'
import { mesAddProductDetailSelector } from 'redux/selector/selector';
import AddSuccess from './AddSuccess';

const ModalAddProductDetail = (props) => {

    const dispatch = useDispatch()
    const mesAddProductDetail = useSelector(mesAddProductDetailSelector)
    const [showAddSuccess, setShowAddSuccess] = useState(false)
    const [id, setId] = useState()

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onChange"
    });

    const idProduct = localStorage.getItem('id_add_product')

    useEffect(() => {
        if (idProduct) {
            setId(idProduct)
        }
    }, [idProduct])

    const dataSubmit = (data) => {
        if (id) {
            let image = ''
            const reader = new FileReader()
            reader.onloadend = () => {
                image = reader.result.toString()
                let returnData = {
                    Cong_nghe_man_hinh: data.Cong_nghe_man_hinh,
                    Do_phan_giai: data.Do_phan_giai,
                    He_dieu_hanh: data.He_dieu_hanh,
                    Chip_xu_ly: data.Chip_xu_ly,
                    Bo_nho_ROM: data.Bo_nho_ROM,
                    RAM: data.RAM,
                    Dung_luong_PIN: data.Dung_luong_PIN,
                    Hinh_anh: image,
                    Id_san_pham: id
                }
                dispatch(actions.postAddProductDetailAction.postAddProductDetailRequest(returnData))
            }
            reader.readAsDataURL(data.Hinh_anh[0])
        }
    }

    useEffect(() => {
        if (mesAddProductDetail) {
            setShowAddSuccess(true)
        }
    }, [mesAddProductDetail])

    const handleHideModalAddSuccess = () => {
        setShowAddSuccess(false)
        props.isClose()
    }

    return (
        <>
            <div className=''>
                <form onSubmit={handleSubmit(dataSubmit)}>
                    <div className='bg-white w-180-em animate-modalForm'>
                        <div className='h-10 leading-10 bg-blue-450 border-b border-slate-200' >
                            <span className='text-5 font-semibold text-white ml-4'>Thêm thông số sản phẩm</span>
                            <div className='float-right '>
                                <span>
                                    <i onClick={props.isClose} className="bi cursor-pointer bi-x-circle-fill text-slate-50 text-6 mr-5 hover:text-slate-900"></i>
                                </span>
                            </div>
                        </div >
                        <div className='p-3'>
                            <div className='pl-3 pt-2 rounded-5 border border-gray-300'>
                                <div className='px-2 pb-3 mt-1'>
                                    <input
                                        className='w-full placeholder:text-gray-500 text-3.5 border-2 rounded-2 focus:outline-none focus:border-red-200 hover:border-slate-200 border-slate-100 focus:bg-white pl-5 py-2 text-slate-800 font-medium'
                                        placeholder='Công nghệ màn hình'
                                        {...register('Cong_nghe_man_hinh', { required: true })}
                                    />

                                </div>
                                <div className='px-2'>
                                    <div className=" pb-3">
                                        <input
                                            type='text'
                                            className='w-full placeholder:text-gray-500  text-3.5 border-2 rounded-2  focus:outline-none focus:border-red-200 hover:border-slate-200 border-slate-100 pl-5 py-2 text-slate-800 font-medium'
                                            placeholder='Độ phân giải'
                                            {...register('Do_phan_giai', { required: true })}
                                        />

                                    </div>
                                </div>

                                <div className='px-2 pb-3 mt-1'>
                                    <input
                                        type='text'
                                        placeholder='Hệ điều hành'
                                        className='w-full shadow-soft-xxs placeholder:text-gray-500 text-3.5 border-2 rounded-2  focus:outline-none focus:border-red-200 hover:border-slate-200 border-slate-100 pl-5 py-2 text-slate-800 font-medium'
                                        {...register('He_dieu_hanh', { required: true })}
                                    />

                                </div>
                                <div className='px-2 pb-3 mt-1'>
                                    <input
                                        type='text'
                                        placeholder='Chíp xử lý'
                                        className='w-full shadow-soft-xxs placeholder:text-gray-500 text-3.5 border-2 rounded-2  focus:outline-none focus:border-red-200 hover:border-slate-200 border-slate-100 pl-5 py-2 text-slate-800 font-medium'
                                        {...register('Chip_xu_ly', { required: true })}
                                    />

                                </div>
                                <div className='px-2 pb-3 mt-1'>
                                    <input
                                        type='text'
                                        placeholder='Bộ nhớ ROM'
                                        className='w-full shadow-soft-xxs placeholder:text-gray-500 text-3.5 border-2 rounded-2  focus:outline-none focus:border-red-200 hover:border-slate-200 border-slate-100 pl-5 py-2 text-slate-800 font-medium'
                                        {...register('Bo_nho_ROM', { required: true })}
                                    />

                                </div>
                                <div className='px-2 pb-3 mt-1'>
                                    <input
                                        type='text'
                                        placeholder='RAM'
                                        className='w-full shadow-soft-xxs placeholder:text-gray-500 text-3.5 border-2 rounded-2  focus:outline-none focus:border-red-200 hover:border-slate-200 border-slate-100 pl-5 py-2 text-slate-800 font-medium'
                                        {...register('RAM', { required: true })}
                                    />

                                </div>

                                <div className='px-2 pb-3 mt-1'>
                                    <input
                                        type='text'
                                        placeholder='Dung lượng PIN'
                                        className='w-full shadow-soft-xxs placeholder:text-gray-500 text-3.5 border-2 rounded-2  focus:outline-none focus:border-red-200 hover:border-slate-200 border-slate-100 pl-5 py-2 text-slate-800 font-medium'
                                        {...register('Dung_luong_PIN', { required: true })}
                                    />

                                </div>

                                <div className='px-2 pb-3'>
                                    <label className="mb-2 text-gray-900 text-3.5 font-semibold">Hình ảnh : </label>
                                    <input
                                        type="file"
                                        className="block w-3/5 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        {...register('Hinh_anh', { required: true })}
                                    />
                                </div>
                                <div className='px-2 w-full mb-5'>
                                    <button className='w-full bg-gradient-dark-gray text-white py-1 rounded-2 hover:opacity-90'> Lưu</button>
                                </div>
                            </div>
                        </div>
                    </div >
                </form >
            </div >

            {
                showAddSuccess && <div>
                    <AddSuccess show={handleHideModalAddSuccess} Mes={mesAddProductDetail ? mesAddProductDetail.errCode === '0' ? 'Thêm thành công' : '' : ''} />
                </div>
            }
        </>
    )
}

export default ModalAddProductDetail