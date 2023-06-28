import BackHome from 'components/Trang-chu/BackHome'
import React from 'react'
import { useState, useEffect } from 'react'
import * as actions from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { infoBilSelector } from 'redux/selector'
import OrderDetail from 'components/Thong-tin-don-hang/OrderDetail'

const OrderLookup = () => {

    const [showOrderDetail, setShowOderDetail] = useState(false)
    const [state, setState] = useState(false)
    const [stateSmartphone, setStateSmartphone] = useState()
    const dispatch = useDispatch()
    const infoBill = useSelector(infoBilSelector)

    const [stateInfoBill, setStateInfoBill] = useState({
        Ho_ten: '',
        Dia_chi_nhan_hang: '',
        So_dien_thoai: '',
        Tong_tien: '',
        Email: '',
        Trang_thai: ''
    })

    const handleOnchange = (e) => {
        setStateSmartphone(e.target.value)
    }

    // useEffect(() => {
    //     try {
    //         if (infoBill) {
    //             if (infoBill.errCode === '0') {
    //                 setShowOderDetail(true)
    //                 setState(false)
    //                 setStateInfoBill({
    //                     ...stateInfoBill,
    //                     Ho_ten: infoBill.infoOderDetail.Ho_ten,
    //                     Dia_chi_nhan_hang: infoBill.infoOderDetail.Dia_chi_nhan_hang,
    //                     So_dien_thoai: infoBill.infoOderDetail.So_dien_thoai,
    //                     Tong_tien: infoBill.infoOderDetail.Tong_tien,
    //                     Email: infoBill.infoOderDetail.Email,
    //                     Trang_thai: infoBill.infoOderDetail.Trang_thai
    //                 })
    //             }
    //             else {
    //                 setState(true)
    //                 setShowOderDetail(false)
    //             }
    //         } else {
    //             console.log('Không tìm thấy');
    //         }
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }, [infoBill])

    return (
        <>
            <div>
                <BackHome />
            </div>

            <div class="flex flex-col mx-auto w-10/12 pb-10 border-b-2 border-gray-500 mb-5">
                <div className='text-center'>
                    <i class="bi bi-check2-circle text-16 leading-4-em block text-green-900"></i>
                </div>
                <div className="mt-4">
                    <span className='text-center block text-7 font-semibold text-black'>Kiểm tra đơn hàng của bạn </span>
                </div>
                <div className="w-2/2 flex justify-start items-center relative text-center w-1/3 mx-auto mt-3 ">
                    <i className="bi bi-search absolute ml-2 w-10"></i>
                    <input
                        value={stateSmartphone}
                        onChange={handleOnchange}
                        placeholder="Nhập số điện thoại của bạn"
                        class="border border-gray-500 rounded-lg focus:outline-none  p-4 w-full pl-10"
                    />
                </div>
                <div className='text-center mt-9'>
                    <button onClick={() => dispatch(actions.getBillAction.getBillRequest(stateSmartphone))} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 w-1/4 rounded'>Tra cứu</button>
                </div>
            </div>

            {/* <div className='mt-10'>
                {
                    showOrderDetail &&
                    <div>
                        <div class="flex flex-col mx-auto w-10/12">
                            <div className='text-center'>
                                <i class="bi bi-check2-circle text-16 cursor-pointer leading-4-em block text-green-900"></i>
                            </div>
                            <div className="mt-4">
                                <span className='text-center block text-7 font-semibold text-black'>THÔNG TIN ĐƠN HÀNG </span>
                            </div>
                            <div className="mt-4">
                                <label className='font-bold mb-3 text-5'>Thông tin người đặt hàng</label>
                                <div class="border border-gray-400 py-2 w-full rounded-3 pl-5" >
                                    <div class="divide-y divide-dashed ">
                                        <div className='grid grid-cols-3 divide-x mb-1' >
                                            <label className='text-4'>Họ và tên: </label>
                                            <div className='pl-2'>
                                                <label className='text-3.5'> {stateInfoBill.Ho_ten}</label>
                                            </div>
                                        </div>

                                        <div className='grid grid-cols-3 divide-x mb-1' >
                                            <label className='text-4'>Số điện thoại: </label>
                                            <div className='pl-2'>
                                                <label className='text-3.5'> {stateInfoBill.So_dien_thoai}</label>
                                            </div>
                                        </div>

                                        <div className='grid grid-cols-3 divide-x mb-1' >
                                            <label className='text-4'>Email: </label>
                                            <div className='pl-2'>
                                                <span className='text-3.5'>{stateInfoBill.Email}</span>
                                            </div>
                                        </div>

                                        <div className='grid grid-cols-3 divide-x mb-1' >
                                            <label className='text-4'>Địa chỉ: </label>
                                            <div className='pl-2'>
                                                <label className='text-3.5'> {stateInfoBill.Dia_chi_nhan_hang}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='mt-10'>
                                <label className='text-5 font-bold mb-3'>Danh sách sản phẩm</label>
                                <table class="table-auto w-full rounded-3 border border-slate-200 border-collapse">
                                    <thead className='bg-green-700 rounded-2 text-white leading-normal'>
                                        <tr className=''>
                                            <th className='text-3.5 py-1 text-center'>STT</th>
                                            <th className='text-3.5  text-center'>Tên sản phẩm</th>
                                            <th className='text-3.5  text-center'>Số lượng</th>
                                            <th className='text-3.5  text-center'>Giá</th>
                                            <th className='text-3.5  text-center'>Tổng (Số lượng x giá)</th>
                                        </tr>
                                    </thead>
                                    <tbody className=''>
                                        <tr className='bg-slate-50 hover:bg-slate-100'>
                                            <td className='text-3.5 p-2 text-center'>1</td>
                                            <td className='text-3.5 p-2 text-center'>Điện thoại Nokia</td>
                                            <td className='text-3.5 p-2 text-center'>2</td>
                                            <td className='text-3.5 p-2 text-center'>20000đ</td>
                                            <td className='text-3.5 p-2 text-center'>50000000đ</td>

                                        </tr>
                                        <tr className='bg-slate-50 hover:bg-slate-100'>
                                            <td className='text-3.5 p-2 text-center'>2</td>
                                            <td className='text-3.5 p-2  text-center'>Điện thoại samsung</td>
                                            <td className='text-3.5 p-2  text-center'>10</td>
                                            <td className='text-3.5 p-2  text-center'>25000đ</td>
                                            <td className='text-3.5 p-2  text-center'>25000000đ</td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div>
                {
                    state && <div className="mt-4">
                        <span className='text-center block text-7 italic font-semibold text-black'>Không tìm thấy đơn hàng...</span>
                    </div>
                }

            </div> */}
            {
                infoBill ?
                    infoBill.errCode !== '0' ?
                        <div className="mt-4">
                            <span className='text-center block text-7 italic font-semibold text-red-500 '>Không tìm thấy đơn hàng...</span>
                        </div>
                        :
                        <div>
                            <OrderDetail />
                        </div>
                    : ''

            }
        </>
    )
}

export default OrderLookup