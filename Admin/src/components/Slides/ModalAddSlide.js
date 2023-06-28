import axios from 'axios';
import AddSuccess from 'components/Ql-san-pham/AddSuccess';
import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';

const ModalAddSlide = (props) => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onChange"
    });
    const [showSuccess, setShowSuccess] = useState(false)
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    const dataSubmit = (data) => {
        if (data) {
            let image = ''
            const reader = new FileReader()
            reader.onloadend = () => {
                image = reader.result.toString()
                let dataReturn = {
                    Hinh_anh: image,
                }
                axios.post(`http://localhost:7001/api-post-add-slides`, { Hinh_anh: dataReturn.Hinh_anh })
                    .then(mes => {
                        if (mes.data.errCode === 0) {
                            setShowSuccess(true)
                            setMessage('Thêm thành công')
                        }
                        else {
                            setShowSuccess(true)
                            setMessage(mes.data.message)
                        }
                    })
                    .catch(e => { console.log(e) })
            }
            reader.readAsDataURL(data.Hinh_anh[0])
        }

    }

    const showMessage = () => {
        if (message === 'Thêm thành công') {
            navigate(0)
        }
        setShowSuccess(false)
    }

    useEffect(() => {
        if (showMessage) {
            let timerId = setTimeout(() => {
                if (message === 'Thêm thành công') {
                    navigate(0)
                }
                setShowSuccess(false)
            }, 3000)

            return () => clearTimeout(timerId)
        }
    }, [showMessage])

    return (
        <>

            <div className=''>
                <form onSubmit={handleSubmit(dataSubmit)}>
                    <div className='bg-white w-180-em animate-modalForm'>
                        <div className='h-10 leading-10 bg-blue-450 border-b border-slate-200' >
                            <span className='text-5 font-semibold text-white ml-4'>Thêm slide</span>
                            <div className='float-right '>
                                <span>
                                    <i onClick={props.closeModal} className="bi cursor-pointer bi-x-circle-fill text-slate-50 text-6 mr-5 hover:text-slate-900"></i>
                                </span>
                            </div>
                        </div >
                        <div className='p-3'>
                            <div className='pl-3 pt-2 rounded-5 border border-gray-300'>
                                <div className='px-2 pb-3'>
                                    <label className="mb-2 text-gray-900 text-3.5 font-semibold">Hình ảnh : </label>
                                    <input
                                        type="file"
                                        className="block w-3/5 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        {...register('Hinh_anh', { required: true })}
                                    />
                                    {
                                        errors.Hinh_anh && <span className="text-red-500 text-3 italic">Vui lòng nhập dữ liệu </span>
                                    }
                                </div>
                                <div className='px-2 w-full mb-5'>
                                    <button className='w-full bg-gradient-dark-gray text-white py-1 rounded-2 hover:opacity-90'>Thêm</button>
                                </div>
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

export default ModalAddSlide