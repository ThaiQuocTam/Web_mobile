import React from 'react'
import { Link } from 'react-router-dom'

const AddCartMes = (props) => {
    return (
        <>
            <div className='border border-gray-700'>
                <div className={`rounded-2 p-2 bg-slate-50 shadow-soft-xs fixed bottom-3 animate-modalForm`} style={{ left: '640px' }}>
                    <div className='w-full overflow-hidden'>
                        <div className='float-right'>
                            <i onClick={props.isClose} className=" bi bi-x-octagon-fill hover:text-slate-700 cursor-pointer text-red-500 text-4 mr-2"></i>
                        </div>
                        <div className='mt-5 pl-5 flex'>
                            <div>
                                <i className={` bi bi-check-circle-fill text-8 text-green-500`} ></i>
                            </div>
                            <div className='leading-12 pl-2 '>
                                <span className='text-3.5 font-semibold text-black'>Thêm giỏ hàng thành công</span>
                            </div>
                        </div>
                        <Link to='/Cart'>
                            <div className='my-2 text-center p-1 rounded-3 bg-green-950'>
                                <span className='text-white text-3.5 font-semibold'>Xem giỏ hàng và thanh toán</span>
                            </div>
                        </Link>

                    </div>
                </div>
            </div>
        </>
    )
}

export default AddCartMes