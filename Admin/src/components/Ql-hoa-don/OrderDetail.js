import axios from 'axios'
import React, { useEffect, useState } from 'react'

const OrderDetail = () => {
    //const [showDetailOder, setShowDetailOder] = useState(false)
    const [stateInfoOderDetail, setStateInfoOderDetail] = useState([])
    const id_HD = localStorage.getItem('idHD')

    useEffect(() => {
        if (id_HD) {
            console.log('có', id_HD);
            axios.get(`http://localhost:7001/api/get-info-oder-detail?Id_HD=${id_HD}`)
                .then(listInfoOderDetail => listInfoOderDetail.data.length !== 0 ? setStateInfoOderDetail(listInfoOderDetail.data) : '')
                .catch(e => console.log(e))
        }
        else {
            console.log('khong có');
        }
    }, [id_HD])

    return (
        <>
            <div className='font-bold text-3xl text-gray-700 pb-3 border-b border-slate-200'>Chi tiết hóa đơn</div>
            <div className="flex flex-col">
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
                                            Tên sản phẩm
                                        </th>
                                        <th scope="col" className="text-sm  bg-gray-400  px-2 font-semibold text-black text-4 text-center">
                                            Số lượng
                                        </th>
                                        <th scope="col" className="text-sm  bg-gray-400  px-2 font-semibold text-black text-4 text-center">
                                            Giá
                                        </th>
                                        <th scope="col" className="text-sm  bg-gray-400  px-2 font-semibold text-black text-4 text-center">
                                            Tổng (Số lượng x giá)
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        stateInfoOderDetail ?
                                            stateInfoOderDetail.map((item, index) => (
                                                <>
                                                    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                                        <td className="whitespace-nowrap text-center text-3.5 text-sm font-medium text-gray-900 px-2 py-2">
                                                            {index + 1}
                                                        </td>
                                                        <td className="whitespace-nowrap text-center text-sm text-3.5 font-medium text-gray-900 px-2 py-2">
                                                            {item.Ten_san_pham}
                                                        </td>
                                                        <td className="text-sm text-gray-900 text-center text-3.5 font-light px-2 py-2 whitespace-nowrap">
                                                            {item.So_luong}
                                                        </td>
                                                        <td className="text-sm text-gray-900 text-center text-3.5 font-light px-2 py-2 whitespace-nowrap">
                                                            {item.Gia_san_pham.toLocaleString()} ₫
                                                        </td>
                                                        <td className="text-sm text-center text-gray-900 text-3.5 font-light px-2 py-2 whitespace-nowrap">
                                                            {(item.Gia_san_pham * item.So_luong).toLocaleString()} ₫
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
        </>
    )
}

export default OrderDetail