import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/actions/actions'
import { mesAddMemberSelector } from 'redux/selector/selector';
import AddSuccess from '../Ql-san-pham/AddSuccess';
import { useNavigate } from 'react-router-dom';

const ModalAddTV = (props) => {
    const dispatch = useDispatch();
    const mesAddMember = useSelector(mesAddMemberSelector)
    const navigate = useNavigate()
    const [message, setMessage] = useState('')
    const [showAddSuccess, setShowAddSuccess] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onChange"
    });

    const dataSubmit = (data) => {
        if (!data.Email || !data.Ho_ten || !data.Mat_khau || !data.Nhap_lai_mat_khau || !data.Gioi_tinh || !data.So_dien_thoai) {
            setShowAddSuccess(true)
            setMessage("Vui lòng điền đầy đủ thông tin!");
        }
        else {
            if (data.Mat_khau === data.Nhap_lai_mat_khau) {
                dispatch(actions.postAddMemberAction.postAddMemberRequest({
                    Email: data.Email,
                    Ho_ten: data.Ho_ten,
                    Mat_khau: data.Mat_khau,
                    Gioi_tinh: data.Gioi_tinh,
                    Dien_thoai: data.So_dien_thoai,
                    Id_phan_quyen: 7
                }))
            } else {
                setShowAddSuccess(true)
                setMessage("Mật khẩu không chính xác");
            }
        }
    }

    const handleHideModalAddSuccess = () => {
        setShowAddSuccess(false)
    }

    useEffect(() => {
        if (mesAddMember) {
            if (mesAddMember.errCode === '0') {
                setShowAddSuccess(true)
                setMessage('Thêm thành công')
            }
            else {
                setShowAddSuccess(true)
                setMessage(mesAddMember.message)
            }
        }
    }, [mesAddMember])

    useEffect(() => {
        if (showAddSuccess) {
            let timerId = setTimeout(() => {
                setShowAddSuccess(false)
            }, 2500)

            return () => clearTimeout(timerId)
        }
    }, [showAddSuccess])


    return (
        <>

            <div className=''>
                <form onSubmit={handleSubmit(dataSubmit)}>
                    <div className='bg-white w-180-em animate-modalForm'>
                        <div className='h-10 leading-10 bg-blue-450 border-b border-slate-200' >
                            <span className='text-5 font-semibold text-white ml-4'>Thêm thành viên</span>
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
                                        placeholder='Email'
                                        type='email'
                                        {...register('Email', { required: false })}
                                    />

                                </div>
                                <div className='px-2'>
                                    <div className=" pb-3">
                                        <input
                                            type='text'
                                            className='w-full placeholder:text-gray-500  text-3.5 border-2 rounded-2  focus:outline-none focus:border-red-200 hover:border-slate-200 border-slate-100 pl-5 py-2 text-slate-800 font-medium'
                                            placeholder='Họ tên'
                                            {...register('Ho_ten', { required: false })}
                                        />

                                    </div>
                                </div>

                                <div className='px-2 pb-3 mt-1'>
                                    <input
                                        type='password'
                                        placeholder='Mật khẩu'
                                        className='w-full shadow-soft-xxs placeholder:text-gray-500 text-3.5 border-2 rounded-2  focus:outline-none focus:border-red-200 hover:border-slate-200 border-slate-100 pl-5 py-2 text-slate-800 font-medium'
                                        {...register('Mat_khau', { required: false })}
                                    />

                                </div>
                                <div className='px-2 pb-3 mt-1'>
                                    <input
                                        type='password'
                                        placeholder='Nhập lại mật khẩu'
                                        className='w-full shadow-soft-xxs placeholder:text-gray-500 text-3.5 border-2 rounded-2  focus:outline-none focus:border-red-200 hover:border-slate-200 border-slate-100 pl-5 py-2 text-slate-800 font-medium'
                                        {...register('Nhap_lai_mat_khau', { required: false })}
                                    />

                                </div>


                                <div className='px-2 pb-3 mt-1'>

                                    <label className='font font-semibold text-3.5'>Giới tính : </label><br />
                                    <select className='p-2 mt-1 border-2 rounded border-black-500 w-full  outline-none'
                                        {...register('Gioi_tinh', { required: false })}
                                    >
                                        <option value='1'>Nam</option>
                                        <option value='0' >Nữ</option>
                                    </select>
                                </div>

                                <div className='px-2 pb-3 mt-1'>
                                    <input
                                        type='text'
                                        placeholder='Số điện thoại'
                                        className='w-full shadow-soft-xxs placeholder:text-gray-500 text-3.5 border-2 rounded-2  focus:outline-none focus:border-red-200 hover:border-slate-200 border-slate-100 pl-5 py-2 text-slate-800 font-medium'
                                        {...register('So_dien_thoai', { required: false })}
                                    />

                                </div>



                                <div className='px-2 w-full mb-5'>
                                    <button className='w-full bg-gradient-dark-gray text-white py-1 rounded-2 hover:opacity-90'>Đăng ký tài khoản</button>
                                </div>
                            </div>

                        </div>
                    </div >
                </form >
            </div >

            {
                showAddSuccess && <div>
                    <AddSuccess show={handleHideModalAddSuccess} Mes={message} />
                </div>
            }
        </>
    )
}

export default ModalAddTV