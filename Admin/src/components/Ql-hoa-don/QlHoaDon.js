import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ModalMesOrder from './ModalMesOrder'

const QlHoaDon = () => {
    //const [showDetailOder, setShowDetailOder] = useState(false)
    const [stateInfoOder, setInfoOder] = useState([])
    const [stateStatus, setStateStatus] = useState([])
    const [mesDeleteOrder, setMesDeleteOrder] = useState()
    const [hideModalMes, setHideModalMes] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:7001/api/get-info-oder`)
            .then(listInfoOder => listInfoOder.data.length !== 0 ? setInfoOder(listInfoOder.data) : '')
            .catch(e => console.log(e))

        axios.get(`http://localhost:7001/api/get-status-order`)
            .then(listInfoStatusOrder => listInfoStatusOrder.data.length !== 0 ? setStateStatus(listInfoStatusOrder.data) : '')
            .catch(e => console.log(e))
    }, [])

    const handleCloseModalMes = () => {
        setHideModalMes(false)
        if (mesDeleteOrder && mesDeleteOrder.errCode === 0) {
            navigate(0)
        }
    }

    useEffect(() => {
        if (hideModalMes) {
            const timer = setTimeout(() => {
                setHideModalMes(false)
                if (mesDeleteOrder && mesDeleteOrder.errCode === 0) {
                    navigate(0)
                }
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [hideModalMes]);

    return (
        <>
            <div className='font-bold text-3xl text-gray-700 pb-3 border-b border-slate-200'>Danh sách hóa đơn</div>

            <div className="flex flex-col mt-10">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className=" inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="w-full">
                                <thead className=" border-b">
                                    <tr>
                                        <th scope="col" className="text-sm  bg-gray-400 font-semibold py-2 px-2 text-4 text-black  text-center">
                                            STT
                                        </th>
                                        <th scope="col" className="text-sm  bg-gray-400  px-2 font-semibold text-black text-4 text-center">
                                            Tên người dùng
                                        </th>
                                        <th scope="col" className="text-sm  bg-gray-400  px-2 font-semibold text-black text-4 text-center">
                                            Email
                                        </th>
                                        <th scope="col" className="text-sm  bg-gray-400  px-2 font-semibold text-black text-4 text-center">
                                            Địa chỉ nhận hàng
                                        </th>
                                        <th scope="col" className="text-sm  bg-gray-400  px-2 font-semibold text-black text-4 text-center">
                                            Số điện thoại
                                        </th>
                                        <th scope="col" className="text-sm  bg-gray-400  px-2 font-semibold text-black text-4 text-center">
                                            Ghi chú
                                        </th>
                                        <th scope="col" className="text-sm  bg-gray-400  px-2 font-semibold text-black text-4 text-center">
                                            Tổng tiền
                                        </th>
                                        <th scope="col" className="text-sm  bg-gray-400  px-2 font-semibold text-black text-4 text-center">
                                            Trạng thái
                                        </th>
                                        <th scope="col" className="text-sm  bg-gray-400  px-2 font-semibold text-black text-4 text-center">

                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        stateInfoOder ?
                                            stateInfoOder.map((item, index) => (
                                                <>
                                                    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                                        <td className="whitespace-nowrap  text-center text-3.5 text-sm font-medium text-gray-900 px-2 py-2">
                                                            {index + 1}
                                                        </td>
                                                        <td className="whitespace-nowrap w-28 block overflow-hidden text-ellipsis text-center text-sm text-3.5 font-medium text-gray-900 px-2 py-2">
                                                            {item.Ho_ten}
                                                        </td>
                                                        <td className="text-sm text-gray-900 text-center text-3.5 font-light px-2 py-2 whitespace-nowrap">
                                                            {item.Email}
                                                        </td>
                                                        <td className="text-sm w-52 inline-block text-ellipsis overflow-hidden text-gray-900 text-center text-3.5 font-light px-2 py-2 whitespace-nowrap">
                                                            {item.Dia_chi_nhan_hang}
                                                        </td>
                                                        <td className="text-sm text-center text-gray-900 text-3.5 font-light px-2 py-2 whitespace-nowrap">
                                                            {item.So_dien_thoai}
                                                        </td>
                                                        <td className="text-sm text-center block w-48 hover:overflow-auto hover:text-clip overflow-hidden text-ellipsis text-gray-900 text-3.5 font-light px-2 py-2 whitespace-nowrap">
                                                            {item.Ghi_chu}
                                                        </td>
                                                        <td className="text-sm text-center  text-gray-900 text-3.5 font-light px-2 py-2 whitespace-nowrap">
                                                            {item.Tong_tien.toLocaleString()} ₫
                                                        </td>
                                                        <td className="text-sm text-center  text-gray-900 text-3.5 font-light px-2 py-2 whitespace-nowrap">
                                                            {stateStatus ? stateStatus.map((itemStatus) => (
                                                                itemStatus.id === item.Trang_thai ? itemStatus.Ten_trang_thai : ''
                                                            )) : ''}
                                                        </td>
                                                        <td className="text-sm inline-block text-gray-900 font-light px-2 py-2 whitespace-nowrap text-center">
                                                            <i onClick={() => { localStorage.setItem('idHD', item.id); navigate('/OrderDetail') }} class="bi bi-ticket-detailed-fill mx-5 text-5 text-red-800 hover:text-red-500 cursor-pointer"></i>
                                                            <i onClick={() => { setHideModalMes(true); axios.post(`http://localhost:7001/api/post-delete-order`, { id: item.id }).then(mes => { setMesDeleteOrder(mes.data); }) }} class="bi bi-x-octagon-fill text-5 text-blue-900 hover:text-blue-450 cursor-pointer"></i>
                                                        </td>
                                                    </tr>
                                                </>
                                            )) : ''

                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {
                    hideModalMes &&
                    <ModalMesOrder isClose={handleCloseModalMes} Mes={mesDeleteOrder} />
                }
            </div>
        </>
    )
}

export default QlHoaDon