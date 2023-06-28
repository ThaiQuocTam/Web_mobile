import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import images from '../../Assets/images/dki.png'

const SignInAdmin = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onChange"
    });
    const navigate = useNavigate()

    const [message, setMessage] = useState('')

    const dataSubmit = (data) => {
        if (data.Email === '' || data.Mat_khau === '') {
            setMessage('Vui lòng nhập đầy đủ thông tin')
        }
        else {
            axios.post(`http://localhost:7001/api/signIn`, {
                Email: data.Email,
                Mat_khau: data.Mat_khau,
                phanQuyen: 7
            })
                .then(mesData => {
                    if (mesData.data.errCode === 0) {
                        localStorage.setItem('EmailAdmin', mesData.data.info.Email)
                        navigate(0)
                    }
                    else {
                        setMessage(mesData.data.message)
                    }
                })
                .catch(e => console.log(e))
        }
    }

    useEffect(() => {
        if (message) {
            let timerId = setTimeout(() => {
                setMessage('')
            }, 3000)
            return () => clearTimeout(timerId)
        }
    }, [message])

    return (
        <>
            <div className='fixed flex z-sticky  items-center bg-slate-250 justify-center left-0 top-0 right-0 bottom-0'>
                <div className={`flex items-center bg-white w-70pc h-70pc rounded-5  animate-modalForm`}>
                    <div className=" bg-blue-100 h-full rounded-5 w-30pc pt-20 px-8">
                        <img className='w-full' src={images} />
                    </div>
                    <div className="p-3 w-70pc px-16 justify-center">
                        <form onSubmit={handleSubmit(dataSubmit)} className=" rounded-[12px]">
                            <div className="">
                                <h1 className="text-green-950 text-center font-semibold text-9"> Đăng nhập</h1>
                                <div className="mt-4">
                                    <label className='font-semibold text-4'>Email</label>
                                    <input
                                        {...register('Email', { required: false })}
                                        type="text"
                                        placeholder='Nhập Email...'
                                        pattern="[A-Za-z]{1-15}"
                                        className="mt-1 p-2 pr-12 bg-slate-50 placeholder:text-gray-500 placeholder:text-3.2 text-3.5 focus:outline-none rounded border-b-2 border-gray-500 w-full"
                                    />
                                </div>
                                <div className="mt-4">
                                    <label className='text-4 font-semibold'>Mật khẩu</label>
                                    <input
                                        {...register('Mat_khau', { required: false })}
                                        type='password'
                                        placeholder='Nhập mật khẩu...'
                                        className="mt-1 p-2 pr-12 bg-slate-50 placeholder:text-gray-500 placeholder:text-3.2 focus:outline-none rounded border-b-2 border-gray-500 w-full"
                                    />


                                </div>
                                <div className='mt-3'>

                                    <div className=''>
                                        <div className="w-full">
                                            <input
                                                type="submit"
                                                value="ĐĂNG NHẬP"
                                                className="mt-1 p-2 hover:opacity-90 border w-full  border-gray-400 rounded cursor-pointer bg-green-950 text-white"
                                            />
                                        </div>

                                    </div>
                                </div>
                                <div className='pt-5'>
                                    <p className='text-3.5 text-red-500 text-center italic'>{message}</p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}

export default SignInAdmin