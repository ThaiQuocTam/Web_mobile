import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/actions'
import { signUpSelector } from 'redux/selector';
import { useForm } from 'react-hook-form';
import imageSignUp from '../../Assets/images/dki.png'

const SignUp = (props) => {

  const [hidePass, setHidePass] = useState(true)
  const [hideRePass, setHideRePass] = useState(true)
  const [message, setMessage] = useState('')
  const [data, setData] = useState({
    errCode: '',
    message: ''
  })

  const dispatch = useDispatch()
  const signUpData = useSelector(signUpSelector)

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    mode: "onChange"
  });

  useEffect(() => {
    try {
      if (signUpData) {
        if (signUpData.errCode === '0') {
          setMessage('Đăng kí thành công')
          setValue('Dien_thoai', '')
          setValue('Email', '')
          setValue('Ho_ten', '')
          setValue('Mat_khau', '')
          setValue('Nl_mat_khau', '')
        }
        else {
          setMessage(signUpData.message)
        }
      }
    } catch (e) {
      console.log(e)
    }
  }, [signUpData])

  const handleShowPass = () => {
    setHidePass(() => !hidePass)
  }

  const handleShowRePass = () => {
    setHideRePass(() => !hideRePass)
  }

  const dataSubmit = (data) => {
    if (!data.Dien_thoai || !data.Email || !data.Ho_ten || !data.Mat_khau || !data.Nl_mat_khau) {

      setMessage('Vui lòng nhập đủ thông tin')
    }
    else {
      if (data.Mat_khau !== data.Nl_mat_khau) {
        setMessage('Mật khẩu không chính xác')
      }
      else {
        dispatch(actions.signUpAction.signUpRequest({
          Ho_ten: data.Ho_ten,
          Email: data.Email,
          Dien_thoai: data.Dien_thoai,
          Mat_khau: data.Mat_khau,
          Gioi_tinh: data.Gioi_tinh,
          Id_phan_quyen: 6
        }))
      }
    }
  }

  useEffect(() => {
    if (!message) {
      console.log('Rôngx');
    }
    else {
      let timerId = setTimeout(() => {
        setMessage('')
      }, 3000);

      return () => clearTimeout(timerId)
    }

  }, [message])

  return (
    <div className="flex bg-white rounded-3 relative animate-modalForm">
      <i onClick={props.isClose} className='bi bi-dash-circle-fill absolute top-2 right-2 text-6 hover:text-red-600 cursor-pointer mr-2 text-red-500 float-right'></i>
      <div className="mr-3 bg-blue-100 rounded-5 h-full pt-20 px-8">
        <img className='w-full' src={imageSignUp} />
      </div>
      <div className="w-60pc px-16 justify-center ">
        <form onSubmit={handleSubmit(dataSubmit)} className="  rounded-[12px]">
          <div className="">
            <h1 className="text-lg text-center text-black font-bold text-5 mt-3"> Đăng ký tài khoản</h1>

            <div className='border border-slate-100 py-4 px-8 rounded-3'>
              <div className='flex mb-2'>
                <div className="w-1/2 inline-block mr-5">
                  <label className='font font-semibold text-3.5'>Họ tên</label>
                  <input
                    type="text"
                    placeholder="Nhập họ tên..."
                    className="mt-1 p-2 placeholder:text-3.2 border-gray-500 placeholder:text-gray-500 border-t-slate-500 bg-slate-50 focus:outline-none  border-b w-full text-3.5"
                    {...register('Ho_ten', { required: false })}
                  />
                </div>
                <div className="w-1/2 inline-block">
                  <label className='font font-semibold text-3.5'>Email</label>
                  <input
                    type="email"
                    placeholder="Nhập Email..."
                    className="mt-1 p-2 placeholder:text-3.2 border-gray-500 placeholder:text-gray-500 border-t-slate-500 bg-slate-50 focus:outline-none  border-b w-full text-3.5"

                    {...register('Email', { required: false })}
                  />
                </div>
              </div>
              <div className='flex'>
                <div className="w-1/2 mr-5">
                  <label className='font font-semibold text-3.5'>Mật khẩu</label>
                  <input
                    type={hidePass ? 'password' : 'text'}
                    placeholder="Nhập mật khẩu..."
                    className="mt-1 p-2 placeholder:text-3.2 border-gray-500 placeholder:text-gray-500 border-t-slate-500 bg-slate-50 focus:outline-none  border-b w-full text-3.5"

                    {...register('Mat_khau', { required: false })}

                  />
                  {
                    hidePass ? <span className='relative right-4 float-right top-17px cursor-pointer' onClick={handleShowPass}><i class="bi bi-eye-slash-fill"></i></span> : <span className='relative right-4 float-right top-17px cursor-pointer line-through' onClick={handleShowPass}><i class="bi bi-eye-fill"></i></span>
                  }
                </div>
                <div className="w-1/2">
                  <label className='font font-semibold text-3.5'>Nhập lại mật khẩu</label>
                  <input
                    type={hideRePass ? 'password' : 'text'}
                    placeholder="Nhật lại mật khẩu..."
                    className="mt-1 p-2 placeholder:text-3.2 border-gray-500 placeholder:text-gray-500 border-t-slate-500 bg-slate-50 focus:outline-none  border-b w-full text-3.5"
                    {...register('Nl_mat_khau', { required: false })}

                  />
                  {
                    hideRePass ? <span className='relative right-4 float-right top-17px cursor-pointer' onClick={handleShowRePass}><i class="bi bi-eye-slash-fill"></i></span> : <span className='relative right-4 float-right top-17px cursor-pointer line-through' onClick={handleShowRePass}><i class="bi bi-eye-fill"></i></span>
                  }
                </div>
              </div>
              <div className='flex mb-2'>
                <div className="w-1/2 mr-5">
                  <label className='font font-semibold text-3.5'>Giới tính : </label><br />
                  <select className='p-2 mt-1 border-2 rounded border-black-500 w-full  outline-none'
                    {...register('Gioi_tinh', { required: false })}
                  >
                    <option value='1'>Nam</option>
                    <option value='0' >Nữ</option>
                  </select>
                </div>
                <div className="w-1/2">
                  <label className='font font-semibold text-3.5'>Số điện thoại</label>
                  <input
                    type="number"
                    placeholder="Nhập số điện thoại..."
                    className="mt-1 p-2 placeholder:text-3.2 border-gray-500 placeholder:text-gray-500 border-t-slate-500 bg-slate-50 focus:outline-none  border-b w-full text-3.5"
                    {...register('Dien_thoai', { required: false })}

                  />
                </div>
              </div>
              <div className="mt-5">
                <input
                  type="submit"
                  value="Đăng ký"
                  className="p-2 w-full hover:bg-green-950 border focus:outline-none border-gray-400 rounded cursor-pointer bg-green-900 text-white"
                />
              </div>
            </div>
            <div className='text-center pt-5'>
              <p className='text-3.5 text-red-500 italic'>{message}</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp