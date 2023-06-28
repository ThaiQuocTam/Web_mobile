import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/actions/actions'
import { infoProductDetailSelector, mesEditInfoProductDetailSelector } from 'redux/selector/selector';
import AddSuccess from './AddSuccess';

const ModalAddProductDetail = (props) => {

    const dispatch = useDispatch()
    const infoProductDetail = useSelector(infoProductDetailSelector)
    const mesEditInfoProductDetail = useSelector(mesEditInfoProductDetailSelector)
    const [showAddSuccess, setShowAddSuccess] = useState(false)
    const [id, setId] = useState()
    const [stateInfoProductDetailEdit, setStateInfoProductDetailEdit] = useState({
        id: 0,
        Cong_nghe_man_hinh: '',
        Do_phan_giai: '',
        He_dieu_hanh: '',
        Chip_xu_ly: '',
        Bo_nho_ROM: '',
        RAM: '',
        Dung_luong_PIN: '',
        Hinh_anh: '',
        Id_san_pham: 0
    })
    const [stateMesEdit, setStateMesEdit] = useState()

    const idProduct = localStorage.getItem('id_add_product')

    useEffect(() => {
        if (idProduct) {
            setId(idProduct)
        }
        if (props.propsProductDetail) {
            setStateInfoProductDetailEdit(props.propsProductDetail)
        }
    }, [idProduct || props.propsProductDetail])

    const handleHideModalAddSuccess = () => {
        setShowAddSuccess(false)
    }

    useEffect(() => {
        if (infoProductDetail) {
            setStateInfoProductDetailEdit({
                ...stateInfoProductDetailEdit,
                id: infoProductDetail.info.id,
                Cong_nghe_man_hinh: infoProductDetail.info.Cong_nghe_man_hinh,
                Do_phan_giai: infoProductDetail.info.Do_phan_giai,
                He_dieu_hanh: infoProductDetail.info.He_dieu_hanh,
                Chip_xu_ly: infoProductDetail.info.Chip_xu_ly,
                Bo_nho_ROM: infoProductDetail.info.Bo_nho_ROM,
                RAM: infoProductDetail.info.RAM,
                Dung_luong_PIN: infoProductDetail.info.Dung_luong_PIN,
                Hinh_anh: infoProductDetail.info.Hinh_anh,
                Id_san_pham: infoProductDetail.info.Id_san_pham
            })
        }
    }, [infoProductDetail])

    const convertBase64 = (file) => {
        let fileString = ''
        const reader = new FileReader()
        reader.onloadend = () => {
            fileString = reader.result.toString()
            setStateInfoProductDetailEdit({ ...stateInfoProductDetailEdit, Hinh_anh: fileString })
        }
        reader.readAsDataURL(file)
    }

    const handleActionEdit = () => {
        dispatch(actions.postEditInfoProductDetailAction.postEditInfoProductDetailRequest(stateInfoProductDetailEdit))
    }

    useEffect(() => {
        if (mesEditInfoProductDetail) {
            setStateMesEdit(mesEditInfoProductDetail)
            setShowAddSuccess(true)
            console.log(mesEditInfoProductDetail);
        }
    }, [mesEditInfoProductDetail])

    return (
        <>
            <div className=''>
                <form>
                    <div className='bg-white w-180-em animate-modalForm'>
                        <div className='h-10 leading-10 bg-blue-450 border-b border-slate-200' >
                            <span className='text-5 font-semibold text-white ml-4'>chỉnh sửa</span>
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
                                        value={stateInfoProductDetailEdit.Cong_nghe_man_hinh}
                                        onChange={(e) => setStateInfoProductDetailEdit({ ...stateInfoProductDetailEdit, Cong_nghe_man_hinh: e.target.value })}
                                        className='w-full placeholder:text-gray-500 text-3.5 border-2 rounded-2 focus:outline-none focus:border-red-200 hover:border-slate-200 border-slate-100 focus:bg-white pl-5 py-2 text-slate-800 font-medium'
                                        placeholder='Công nghệ màn hình'
                                    />

                                </div>
                                <div className='px-2'>
                                    <div className=" pb-3">
                                        <input
                                            type='text'
                                            value={stateInfoProductDetailEdit.Do_phan_giai}
                                            onChange={(e) => setStateInfoProductDetailEdit({ ...stateInfoProductDetailEdit, Do_phan_giai: e.target.value })}
                                            className='w-full placeholder:text-gray-500  text-3.5 border-2 rounded-2  focus:outline-none focus:border-red-200 hover:border-slate-200 border-slate-100 pl-5 py-2 text-slate-800 font-medium'
                                            placeholder='Độ phân giải'
                                        />

                                    </div>
                                </div>

                                <div className='px-2 pb-3 mt-1'>
                                    <input
                                        type='text'
                                        value={stateInfoProductDetailEdit.He_dieu_hanh}
                                        onChange={(e) => setStateInfoProductDetailEdit({ ...stateInfoProductDetailEdit, He_dieu_hanh: e.target.value })}
                                        placeholder='Hệ điều hành'
                                        className='w-full shadow-soft-xxs placeholder:text-gray-500 text-3.5 border-2 rounded-2  focus:outline-none focus:border-red-200 hover:border-slate-200 border-slate-100 pl-5 py-2 text-slate-800 font-medium'
                                    />

                                </div>
                                <div className='px-2 pb-3 mt-1'>
                                    <input
                                        type='text'
                                        value={stateInfoProductDetailEdit.Chip_xu_ly}
                                        onChange={(e) => setStateInfoProductDetailEdit({ ...stateInfoProductDetailEdit, Chip_xu_ly: e.target.value })}
                                        placeholder='Chíp xử lý'
                                        className='w-full shadow-soft-xxs placeholder:text-gray-500 text-3.5 border-2 rounded-2  focus:outline-none focus:border-red-200 hover:border-slate-200 border-slate-100 pl-5 py-2 text-slate-800 font-medium'
                                    />

                                </div>
                                <div className='px-2 pb-3 mt-1'>
                                    <input
                                        type='text'
                                        value={stateInfoProductDetailEdit.Bo_nho_ROM}
                                        onChange={(e) => setStateInfoProductDetailEdit({ ...stateInfoProductDetailEdit, Bo_nho_ROM: e.target.value })}
                                        placeholder='Bộ nhớ ROM'
                                        className='w-full shadow-soft-xxs placeholder:text-gray-500 text-3.5 border-2 rounded-2  focus:outline-none focus:border-red-200 hover:border-slate-200 border-slate-100 pl-5 py-2 text-slate-800 font-medium'
                                    />

                                </div>
                                <div className='px-2 pb-3 mt-1'>
                                    <input
                                        type='text'
                                        value={stateInfoProductDetailEdit.RAM}
                                        onChange={(e) => setStateInfoProductDetailEdit({ ...stateInfoProductDetailEdit, RAM: e.target.value })}
                                        placeholder='RAM'
                                        className='w-full shadow-soft-xxs placeholder:text-gray-500 text-3.5 border-2 rounded-2  focus:outline-none focus:border-red-200 hover:border-slate-200 border-slate-100 pl-5 py-2 text-slate-800 font-medium'
                                    />

                                </div>

                                <div className='px-2 pb-3 mt-1'>
                                    <input
                                        type='text'
                                        value={stateInfoProductDetailEdit.Dung_luong_PIN}
                                        onChange={(e) => setStateInfoProductDetailEdit({ ...stateInfoProductDetailEdit, Dung_luong_PIN: e.target.value })}
                                        placeholder='Dung lượng PIN'
                                        className='w-full shadow-soft-xxs placeholder:text-gray-500 text-3.5 border-2 rounded-2  focus:outline-none focus:border-red-200 hover:border-slate-200 border-slate-100 pl-5 py-2 text-slate-800 font-medium'
                                    />

                                </div>

                                <div className='px-2 pb-3 flex'>
                                    <div className='w-50pc'>
                                        <label className="mb-2 text-gray-900 text-3.5 font-semibold">Hình ảnh : </label>
                                        <input
                                            type="file"

                                            onChange={(e) => convertBase64(e.target.files[0])}
                                            className="block w-3/5 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        />
                                    </div>
                                    <div className='w-50pc'>
                                        <img className='w-full' src={stateInfoProductDetailEdit.Hinh_anh} />
                                    </div>
                                </div>
                                <div className='px-2 w-full mb-5'>
                                    <Link onClick={handleActionEdit} to='#' className='w-full block text-center bg-gradient-dark-gray text-white py-1 rounded-2 hover:opacity-90'> Lưu</Link>
                                </div>
                            </div>
                        </div>
                    </div >
                </form >
            </div >

            {
                showAddSuccess && <div>
                    <AddSuccess show={handleHideModalAddSuccess} mesEditInfo={stateMesEdit} />
                </div>
            }
        </>
    )
}

export default ModalAddProductDetail