import axios from 'axios';
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import AddSuccess from './AddSuccess';

const ModalAddVersionProduct = (props) => {

    const [showSuccess, setShowSuccess] = useState(false)
    const [message, setMessage] = useState()
    const navigate = useNavigate()

    const idProduct = localStorage.getItem('id_add_product')

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onChange"
    });

    const dataSubmit = (data) => {
        let Ten_phien_ban = data.Ten_phien_ban
        let Gia_phien_ban = data.Gia_phien_ban
        let Anh_phien_ban = data.Anh_phien_ban
        if (!Ten_phien_ban || !Gia_phien_ban || !Anh_phien_ban) {
            setShowSuccess(true)
            setMessage('Vui lòng nhập đủ thông tin')
        }
        else {
            if (idProduct) {
                let image = ''
                const reader = new FileReader()
                reader.onloadend = () => {
                    image = reader.result.toString()
                    let returnData = {
                        Id_SP: idProduct,
                        Ten_phien_ban: Ten_phien_ban,
                        Gia_phien_ban: Gia_phien_ban,
                        Anh_phien_ban: image
                    }
                    axios.post(`http://localhost:7001/api/post-add-version-product`, returnData)
                        .then(mesData => { setMessage(mesData.data); setShowSuccess(true) })
                        .catch(e => console.log(e))
                }
                reader.readAsDataURL(data.Anh_phien_ban[0])

            }
        }
    }

    const showMessage = () => {
        setShowSuccess(false)
    }

    useEffect(() => {
        if (showMessage) {
            const timer = setTimeout(() => {
                setShowSuccess(false)
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showMessage])

    useEffect(() => {
        if (message) {
            console.log(message);
        }
    }, [message])

    return (
        <>
            <>
                <div className=''>
                    <form onSubmit={handleSubmit(dataSubmit)}>
                        <div className='bg-white w-180-em animate-modalForm'>
                            <div className='h-10 leading-10 bg-blue-450 border-b border-slate-200' >
                                <span className='text-5 font-semibold text-white ml-4'>Thêm phiên bản</span>
                                <div className='float-right '>
                                    <span>
                                        <i onClick={props.closeModal} className="bi cursor-pointer bi-x-circle-fill text-slate-50 text-6 mr-5 hover:text-slate-900"></i>
                                    </span>
                                </div>
                            </div >
                            <div className='p-3'>
                                <div className='pl-3 pt-2 rounded-5 border border-gray-300'>
                                    <div className='px-2 pb-3 mt-1'>
                                        <input
                                            className='w-full placeholder:text-gray-500 text-3.5 border-2 rounded-2 focus:outline-none focus:border-red-200 hover:border-slate-200 border-slate-100 focus:bg-white pl-5 py-2 text-slate-800 font-medium'
                                            {...register('Ten_phien_ban', { required: true })}
                                            placeholder='Nhập tên phiên bản...'
                                        />
                                        {
                                            errors.Ten_phien_ban && <span className="text-red-500 text-3 italic">Vui lòng nhập dữ liệu</span>
                                        }
                                    </div>
                                    <div className='px-2 pb-3 mt-1'>
                                        <input
                                            className='w-full placeholder:text-gray-500 text-3.5 border-2 rounded-2 focus:outline-none focus:border-red-200 hover:border-slate-200 border-slate-100 focus:bg-white pl-5 py-2 text-slate-800 font-medium'
                                            {...register('Gia_phien_ban', { required: true })}
                                            placeholder='Nhập giá phiên bản...'
                                        />
                                        {
                                            errors.Gia_phien_ban && <span className="text-red-500 text-3 italic">Vui lòng nhập dữ liệu</span>
                                        }
                                    </div>
                                    <div className='px-2 pb-3'>
                                        <label className="mb-2 text-gray-900 text-3.5 font-semibold">Hình ảnh : </label>
                                        <input
                                            type="file"
                                            className="block w-3/5 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                            {...register('Anh_phien_ban', { required: true })}
                                        />
                                        {
                                            errors.Anh_phien_ban && <span className="text-red-500 text-3 italic">Vui lòng nhập dữ liệu</span>
                                        }
                                    </div>
                                    <button className='w-full bg-gradient-dark-gray text-white py-1 rounded-2 hover:opacity-90'> Lưu</button>
                                </div>
                            </div>
                        </div >
                    </form >
                </div >

                {
                    showSuccess && <AddSuccess show={showMessage} mesAddVersion={message} />
                }
            </>
        </>
    )
}

export default ModalAddVersionProduct