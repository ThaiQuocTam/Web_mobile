import BackHome from 'components/Trang-chu/BackHome'
import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { infoBilSelector, listInfoOderDetailSelector, mesHasReceivedSelector } from 'redux/selector'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../redux/actions'
import OrderLookup from 'components/Tra-cuu-don-hang/OrderLookup'

const OrderDetail = () => {

    const listBill = useSelector(infoBilSelector)
    const listInfoOrderDetail = useSelector(listInfoOderDetailSelector)
    const mesHasReceived = useSelector(mesHasReceivedSelector)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [stateListBill, setStateListBill] = useState()
    const [stateListBillHasReceived, setStateListBillHasReceived] = useState()
    const [stateListInfoOrderDetail, setStateListInfoOrderDetail] = useState()
    const [quantity, setQuantity] = useState(0)

    const convertDate = (date) => {
        date = new Date(date)
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        let seconds = date.getSeconds()
        let minutes = date.getMinutes()
        let hours = date.getHours()
        return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`
    }

    useEffect(() => {
        if (mesHasReceived) {
            console.log(mesHasReceived);
        }
    }, [mesHasReceived])

    useEffect(() => {
        try {
            if (listBill) {
                let arrIdOrder = []
                let arrListBill = []
                let arrListBillHasReceived = []
                listBill.infoOderDetail.map((item) => {
                    item.Trang_thai !== 8 ? arrListBill.push(item) : arrListBillHasReceived.push(item)
                })
                setStateListBill(arrListBill)
                setStateListBillHasReceived(arrListBillHasReceived)
                listBill.infoOderDetail.map((item) => {
                    {
                        arrIdOrder.push(item.id)
                    }
                })
                arrIdOrder.length !== 0 ? dispatch(actions.getOrderDetailAction.getOrderDetailRequest(arrIdOrder)) : ''
            }
        } catch (e) { }
    }, [mesHasReceived || listBill])

    useEffect(() => {
        try {
            if (listInfoOrderDetail) {
                setStateListInfoOrderDetail(listInfoOrderDetail)
            }
        } catch (e) { }
    }, [listInfoOrderDetail])

    return (
        <>
            {
                stateListBill ?
                    <>
                        <div >
                            <div class="flex flex-col mx-auto w-10/12">
                                <div className='text-center'>
                                    <i class="bi bi-check2-circle text-16 cursor-pointer leading-4-em block text-green-900"></i>
                                </div>
                                <div className="mt-4">
                                    <span className='text-center block text-7 font-semibold text-green-500'>Tất cả đơn hàng của bạn</span>
                                </div>
                                <div className="mt-4">
                                    {
                                        stateListBill.map((item, index) => (
                                            <>
                                                <div className='border border-slate-50 p-5 mb-10 rounded-4 shadow-soft-xxs overflow-hidden'>
                                                    <div>
                                                        <div className='my-2'>
                                                            <span className='text-gray-700 text-4 font-semibold'>Đơn hàng thứ {index += 1}</span>
                                                            <span className='text-3.5 text-gray-600 ml-20'>{convertDate(item.createdAt)}</span>
                                                        </div>
                                                        <div class="border border-gray-400 py-2 w-full rounded-3 pl-5" >
                                                            <div class="divide-y divide-dashed ">
                                                                <div className='grid grid-cols-2 divide-x mb-1' >
                                                                    <label className='text-4'>Họ và tên: </label>
                                                                    <div className='pl-2'>
                                                                        <label className='text-3.5'> {item.Ho_ten}</label>
                                                                    </div>
                                                                </div>

                                                                <div className='grid grid-cols-2 divide-x mb-1' >
                                                                    <label className='text-4'>Số điện thoại: </label>
                                                                    <div className='pl-2'>
                                                                        <label className='text-3.5'> {item.So_dien_thoai}</label>
                                                                    </div>
                                                                </div>

                                                                <div className='grid grid-cols-2 divide-x mb-1' >
                                                                    <label className='text-4'>Email: </label>
                                                                    <div className='pl-2'>
                                                                        <label className='text-3.5'> {item.Email}</label>
                                                                    </div>
                                                                </div>

                                                                <div className='grid grid-cols-2 divide-x mb-1' >
                                                                    <label className='text-4'>Địa chỉ nhận hàng: </label>
                                                                    <div className='pl-2'>
                                                                        <label className='text-3.5'> {item.Dia_chi_nhan_hang}</label>
                                                                    </div>
                                                                </div>

                                                                <div className='grid grid-cols-2 divide-x mb-1' >
                                                                    <label className='text-4'>Tổng hóa đơn: </label>
                                                                    <div className='pl-2'>
                                                                        <label className='text-3.5'> {item.Tong_tien.toLocaleString()} ₫</label>
                                                                    </div>
                                                                </div>

                                                                <div className='grid grid-cols-2 divide-x mb-1' >
                                                                    <label className='text-4 italic'>Tình trạng: </label>
                                                                    <div className='pl-2'>
                                                                        <label className='text-3.5 italic'> {item.Trang_thai === 4 ? 'Chưa xác nhận' : 'Đã xác nhận'}</label>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='mt-10'>
                                                        <label className='text-gray-700 text-4 font-semibold'>Danh sách sản phẩm</label>
                                                        <table class="table-auto w-full rounded-3 border border-slate-200 border-collapse">
                                                            <thead className='bg-green-700 rounded-2 text-white leading-normal'>
                                                                <tr className=''>
                                                                    <th className='text-3.5  text-center'>Tên sản phẩm</th>
                                                                    <th className='text-3.5  text-center'>Số lượng</th>
                                                                    <th className='text-3.5  text-center'>Giá</th>
                                                                    <th className='text-3.5  text-center'>Tổng (Số lượng x giá)</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className=''>
                                                                {
                                                                    stateListInfoOrderDetail ?
                                                                        stateListInfoOrderDetail.map((itemOrderDetail) => (
                                                                            itemOrderDetail.Id_HD === item.id ?
                                                                                <tr className='bg-slate-50 hover:bg-slate-100'>
                                                                                    <td className='text-3.5 p-2 text-center'>{itemOrderDetail.Ten_san_pham}</td>
                                                                                    <td className='text-3.5 p-2 text-center'>{itemOrderDetail.So_luong}</td>
                                                                                    <td className='text-3.5 p-2 text-center'>{itemOrderDetail.Gia_san_pham.toLocaleString()} ₫</td>
                                                                                    <td className='text-3.5 p-2 text-center'>{(itemOrderDetail.So_luong * itemOrderDetail.Gia_san_pham).toLocaleString()} ₫</td>
                                                                                </tr> : ''
                                                                        )) : ''
                                                                }

                                                            </tbody>
                                                        </table>
                                                    </div>

                                                    {
                                                        item.Trang_thai === 5 ? <div className='mt-5 float-right '>
                                                            {/* <span className='font-semibold text-3.5 text-red-700'>Xác nhận nếu đã nhận được hàng</span> */}
                                                            <button onClick={() => { navigate(0); dispatch(actions.putHasReceivedAction.putHasReceivedRequest(item.id)); }} className='ml-5 text-3.5 border text-green-950 border-green-950 font-semibold hover:bg-green-950 hover:text-white p-2 rounded-2'>Đã nhận được hàng</button>
                                                        </div> : ''
                                                    }
                                                </div>
                                            </>
                                        ))
                                    }

                                </div>
                            </div>
                            <div className='mx-auto w-10/12'>
                                <div className='mb-5'>
                                    <span className='mb-5 text-5 font-semibold text-gray-800'>Đơn hàng đã nhận</span>
                                </div>
                                <div>
                                    <table class="table-auto w-full rounded-3 border border-slate-200 border-collapse">
                                        <thead className='bg-blue-500 rounded-2 text-white leading-normal'>
                                            <tr className=''>
                                                <th className='text-3.5  text-center'>Thời gian đặt hàng</th>
                                                <th className='text-3.5  text-center'>Địa chỉ nhận hàng</th>
                                                <th className='text-3.5  text-center'>Tổng hóa đơn</th>
                                                <th className='text-3.5  text-center'>Trạng thái</th>
                                            </tr>
                                        </thead>
                                        <tbody className=''>
                                            {
                                                stateListBillHasReceived ?
                                                    stateListBillHasReceived.map((item) => (
                                                        <tr className='bg-slate-50 hover:bg-slate-100'>
                                                            <td className='text-3.5 p-2 text-center'>{convertDate(item.createdAt)}</td>
                                                            <td className='text-3.5 p-2 text-center'>{item.Dia_chi_nhan_hang}</td>
                                                            <td className='text-3.5 p-2 text-center'>{item.Tong_tien.toLocaleString()} ₫</td>
                                                            <td className='text-3.5 p-2 text-center'>Đã nhận hàng</td>
                                                        </tr>
                                                    )) : ''
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </>
                    :
                    <div className='text-center p-5'>
                        <BackHome />
                        <Link className=' w-1/2 mx-auto text-7 border-2  hover:bg-slate-50 border-gray-500 py-2 text-gray-700 block  font-semibold rounded-2 font' to='/OrderLookup'><i class="bi bi-search mr-2"></i>Tra cứu đơn hàng của bạn</Link>
                    </div>
            }

        </>
    )
}

export default OrderDetail