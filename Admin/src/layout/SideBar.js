import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
// import * as actions from '../../redux/actions/actions'

const SideBar = () => {

    const navClassName = ({ isActive }) => {
        return isActive ? 'block p-2 border-2 border-slate-50 pl-8 bg-slate-100 text-sky-500 font-semibold rounded-5' : 'block p-2 font-semibold text-gray-700 border-2 border-slate-50 rounded-5 pl-8 hover:border-gray-500 hover:text-sky-500'
    }

    return (
        <>
            <div className='w-20pc fixed z-20 h-full bg-slate-50 shadow-soft-lg'>
                <div className='w-full h-20 leading-20 text-center bg-blue-400'><i class="bi bi-menu-button-wide-fill text-6 text-white"></i><span className='text-6 text-white ml-2 font-semibold'>MENU</span></div>
                <div className=''>
                    <ul>
                        <li className='w-full border-b border-slate-100'>
                            <div className='p-2'>
                                <NavLink to='/home' className={navClassName}>
                                    <div className='inline-block p-1 bg-slate-50 font-semibold rounded-2 shadow-soft-2xl'>
                                        <i class="bi text-3 bi-grid-fill mx-1"></i>
                                    </div>
                                    <span className='text-4 ml-2'>Trang chủ</span>
                                </NavLink>
                            </div>
                        </li>

                        <li className='w-full border-b border-slate-100 relative block'>
                            <div className='p-2 relative'>
                                <NavLink to='/QlSanPham' className={navClassName}>
                                    <div className='inline-block p-1 bg-slate-50 font-semibold rounded-2 shadow-soft-2xl'>
                                        <i class="bi text-4 w-full mx-1 bi-command"></i>
                                    </div>
                                    <span className='text-4 ml-2'>Sản phẩm</span>
                                </NavLink>
                            </div>

                        </li>
                        <li className='w-full border-b border-slate-100'>
                            <div className='p-2'>
                                <NavLink to='/QlNhomSP' className={navClassName}>
                                    <div className='inline-block p-1 bg-slate-50 font-semibold rounded-2 shadow-soft-2xl'>
                                        <i class="bi text-4 w-full mx-1 bi-clipboard2-fill"></i>
                                    </div>
                                    <span className=' ml-2'>Nhóm sản phẩm</span>
                                </NavLink>
                            </div>
                        </li>

                        <li className='w-full border-b border-slate-100'>
                            <div className='p-2'>
                                <NavLink to='/QlLoaiSanPham' className={navClassName}>

                                    <div className='inline-block p-1 bg-slate-50 font-semibold rounded-2 shadow-soft-2xl'>
                                        <i class="bi text-4 w-full mx-1 bi-calendar2-event"></i>
                                    </div>
                                    <span className=' ml-2'>Loại sản phẩm</span>
                                </NavLink>
                            </div>
                        </li>


                        <li className='w-full border-b border-slate-100 block'>
                            <div className='p-2'>
                                <NavLink to='/QlHoaDon' className={navClassName}>
                                    <div className='inline-block p-1 bg-slate-50 font-semibold rounded-2 shadow-soft-2xl'>
                                        <i class="bi text-4 w-full bi-clipboard-data-fill mx-1"></i>
                                    </div>
                                    <span className='text-4 ml-2'>Hóa đơn</span>
                                </NavLink>
                            </div>
                        </li>

                        <li className='w-full border-b border-slate-100'>
                            <div className='p-2'>
                                <NavLink to='/QlThanhVien' className={navClassName}>
                                    <div className='inline-block p-1 bg-slate-50 font-semibold rounded-2 shadow-soft-2xl'>
                                        <i class="bi text-4 w-full mx-1 bi-person-lines-fill"></i>
                                    </div>
                                    <span className='text-4 ml-2'>Thành viên</span>
                                </NavLink>
                            </div>
                        </li>

                        <li className='w-full border-b border-slate-100'>
                            <div className='p-2'>
                                <NavLink to='/Slides' className={navClassName}>
                                    <div className='inline-block p-1 bg-slate-50 font-semibold rounded-2 shadow-soft-2xl'>
                                        <i class="bi text-4 w-full mx-1 bi-person-lines-fill"></i>
                                    </div>
                                    <span className='text-4 ml-2'>Slides</span>
                                </NavLink>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>
        </>
    )
}

export default SideBar