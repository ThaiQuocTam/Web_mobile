import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AddSuccess from './AddSuccess'
import ModalAddVersionProduct from './ModalAddVersionProduct'
import ModalEditVersionProduct from './ModalEditVersionProduct'

const VersionProduct = () => {

    const [showModalAddVersion, setShowModalAddVersion] = useState(false)
    const [showModalEditVersion, setShowModalEditInfoProduct] = useState(false)
    const [stateDataVersion, setStateDataVersion] = useState()
    const [stateVersionProps, setStateVersionProps] = useState()
    const navigate = useNavigate()
    const [showModalMesDelete, setShowModalMesDelete] = useState(false)
    const [stateMesDeleteVersion, setStateMesDeleteVersion] = useState()

    const idProduct = localStorage.getItem('id_add_product')

    const handleCloseModalAddVersion = () => {
        navigate(0)
        setShowModalAddVersion(false)
    }

    const handleCloseModalEditVersion = () => {
        navigate(0)
        setShowModalEditInfoProduct(false)
    }

    useEffect(() => {
        if (idProduct) {
            axios.get(`http://localhost:7001/api/get-info-version-product?Id_SP=${idProduct}`)
                .then(dataVersion => setStateDataVersion(dataVersion.data))
                .catch(e => console.log(e))
        }
    }, [idProduct])

    const handleHideModalDelete = () => {
        if (stateMesDeleteVersion) {
            stateMesDeleteVersion.errCode === 0 ? navigate(0) : ''
        }
        setShowModalMesDelete(false)
    }

    useEffect(() => {
        if (showModalMesDelete) {
            const timer = setTimeout(() => {
                navigate(0)
                setShowModalMesDelete(false)
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showModalMesDelete]);

    return (
        <>
            <div className='w-full border-b pb-2 mb-4 border-gray-700'>
                <Link className=" leading-9 h-9 block text-green-900 hover:text-green-600" to="/QlSanPham">
                    <i className="bi bi-arrow-left-circle text-8  mr-2 " />
                    <strong className='text-4  '>Quay lại</strong>
                </Link  >
            </div>
            <div className='font-bold text-3xl pb-3'>Phiên bản sản phẩm</div>
            <div>
                <button onClick={() => setShowModalAddVersion(true)} className='text-3.5 text-black border-gray-500 border-2 px-3 pr-5 py-3 font-semibold rounded-2 cursor-pointer hover:bg-slate-600 hover:text-white' >Thêm phiên bản</button>
            </div>
            <div className='mt-5'>
                <table className="w-full overflow-auto block h-36-rem ">
                    <thead className=" border-b">
                        <tr className=''>
                            <th scope="col" className=" w-80 text-sm sticky top-0 bg-gray-400 font-semibold py-2 px-2 text-4 text-black  text-center">
                                STT
                            </th>
                            <th scope="col" className=" w-80 text-sm sticky top-0 bg-gray-400  px-2 font-semibold text-black text-4 text-center">
                                Tên phiên bản
                            </th>
                            <th scope="col" className=" w-80 text-sm sticky top-0 bg-gray-400  px-2 font-semibold text-black text-4 text-center">
                                Hình ảnh
                            </th>

                            <th scope="col" className=" w-80 text-sm sticky top-0 bg-gray-400  px-2 font-semibold text-black text-4 text-center">
                                Giá
                            </th>
                            <th scope="col" className=" w-80 text-sm sticky top-0 bg-gray-400  px-2 font-semibold text-black text-4 text-center">

                            </th>
                            <th scope="col" className=" w-80 text-sm sticky top-0 bg-gray-400  px-2 font-semibold text-black text-4 text-center">

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            stateDataVersion && stateDataVersion.length !== 0 ?
                                stateDataVersion.map((item, index) => (
                                    <tr className="bg-slate-50 transition duration-300 ease-in-out hover:bg-gray-100">
                                        <td className="whitespace-nowrap text-center text-3.5 text-sm font-medium text-gray-900 px-2 py-2">
                                            {index += 1}
                                        </td>
                                        <td className="whitespace-nowrap text-center text-3.5 text-sm font-medium text-gray-900 px-2 py-2">
                                            {item.Ten_phien_ban}
                                        </td>
                                        <td className="whitespace-nowrap text-center text-3.5 text-sm font-medium text-gray-900 px-2 py-2">
                                            <img className='mx-auto my-2 w-24' src={item.Anh_phien_ban} />

                                        </td>
                                        <td className="whitespace-nowrap text-center text-3.5 text-sm font-medium text-gray-900 px-2 py-2">
                                            {item.Gia_phien_ban.toLocaleString()} ₫
                                        </td>
                                        <td className="whitespace-nowrap text-center text-3.5 text-sm font-medium text-gray-900 px-2 py-2">
                                            <button onClick={() => { setStateVersionProps(item); setShowModalEditInfoProduct(true) }} className="px-4 py-1 text-sm text-black border-black font-semibold hover:bg-slate-600 hover:text-white hover:border-white border-2 rounded">Sửa</button>
                                        </td>
                                        <td className="whitespace-nowrap text-center text-3.5 text-sm font-medium text-gray-900 px-2 py-2">
                                            <button onClick={() => { axios.post(`http://localhost:7001/api/post-delete-version-product`, { id: item.id }).then(mes => { setShowModalMesDelete(true); setStateMesDeleteVersion(mes.data) }) }} className="px-4 py-1 text-sm text-black border-black font-semibold hover:bg-slate-600 hover:text-white hover:border-white border-2 rounded">xóa</button>
                                        </td>
                                    </tr>
                                ))
                                : ''
                        }

                    </tbody>
                </table>
            </div>

            <div>
                {
                    showModalAddVersion && <div className='fixed flex z-sticky  items-center bg-slate-250 justify-center left-0 top-0 right-0 bottom-0'>
                        <ModalAddVersionProduct closeModal={handleCloseModalAddVersion} />
                    </div>
                }
            </div>

            <div>
                {
                    showModalEditVersion && <div className='fixed flex z-sticky  items-center bg-slate-250 justify-center left-0 top-0 right-0 bottom-0'>
                        <ModalEditVersionProduct closeModal={handleCloseModalEditVersion} versionProps={stateVersionProps ? stateVersionProps : ''} />
                    </div>
                }
            </div>

            {
                showModalMesDelete && <div>
                    <AddSuccess show={handleHideModalDelete} mesEditInfo={stateMesDeleteVersion ? stateMesDeleteVersion : ''} />
                </div>
            }

        </>
    )
}

export default VersionProduct