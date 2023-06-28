import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/actions/actions'
import { useEffect, useState } from 'react'
import {
    listProductTypeSelector,
} from 'redux/selector/selector';
import axios from 'axios';
import AddSuccess from './AddSuccess';

const ProductType = () => {
    const dispatch = useDispatch()
    const listProductType = useSelector(listProductTypeSelector)

    const [stateListProductType, setStateListProductType] = useState()
    const [stateValue, setStateValue] = useState('')
    const [stateValueEdit, setStateValueEdit] = useState({
        id_loai_SP: 0,
        Ten_loai_SP: ''
    })
    const [message, setMessage] = useState()
    const [showSuccess, setShowSuccess] = useState(false)
    const [stateMes, setStateMes] = useState('')
    const [showButtonEdit, setShowButtonEdit] = useState(false)

    useEffect(() => {
        dispatch(actions.getListProductTypeAction.getListProductTypeRequest())
    }, [message])

    useEffect(() => {
        if (listProductType) {
            console.log(listProductType);
            setStateListProductType(listProductType)
        }
    }, [listProductType])

    const handleSubmit = () => {
        axios.post(`http://localhost:7001/api/post-add-product-type`, { Ten_loai_SP: stateValue })
            .then(messSuccess => setMessage(messSuccess.data))
            .catch(messErr => console.log(messErr))
    }

    useEffect(() => {
        if (message) {
            setShowSuccess(true)
            if (message.errCode === '0') {
                setStateMes(message.message)
                setShowButtonEdit(false)
                setStateValue('')
            }
            else {
                setStateMes(message.message)
            }
        }
    }, [message])

    const showMessage = () => {
        setShowSuccess(false)
    }

    const handleSubmitEdit = () => {
        if (stateValueEdit) {
            axios.put(`http://localhost:7001/api/put-edit-info-product-type`, stateValueEdit)
                .then(mes => { setMessage(mes.data) })
                .catch(e => console.log(e))
        }
    }

    useEffect(() => {
        if (showSuccess) {
            let timerId = setTimeout(() => {
                setShowSuccess(false)
            }, 3000);

            return () => clearTimeout(timerId)
        }
    }, [showSuccess])

    return (
        <>
            <div>
                <div>
                    <div className='mb-5 border-b borer-gray-500'>
                        <h4>Danh sách loại sản phẩm</h4>
                    </div>

                    <div className='mb-10 overflow-hidden'>
                        <form>
                            <div className='flex'>
                                <div className='w-30pc leading-10'>
                                    <span> Tên loại sản phẩm</span>
                                </div>
                                <div className='w-70pc pr-10pc  '>
                                    <input
                                        value={stateValue}
                                        onChange={(e) => { setStateValue(e.target.value); setStateValueEdit({ ...stateValueEdit, Ten_loai_SP: e.target.value }) }}
                                        placeholder='Nhap tên loại sản pham'
                                        className='w-full border rounded-2 placeholder:text-3 placeholder:text-gray-500 text-3.5 text-gray-600 border-gray-400 p-2 pl-5 outline-none focus:border-sky-500 hover:border-sky-500' />
                                </div>
                            </div>
                            {
                                showButtonEdit ?
                                    <div onClick={handleSubmitEdit} className='float-right pr-30 mt-2 cursor-pointer'>
                                        <span className='p-2 text-3.5 block bg-slate-400 text-white px-10 hover:bg-slate-600 rounded-2'>Sửa</span>
                                    </div> :
                                    <div onClick={handleSubmit} className='float-right pr-30 mt-2 cursor-pointer'>
                                        <span className='p-2 text-3.5 block bg-slate-400 text-white px-10 hover:bg-slate-600 rounded-2'>Thêm</span>
                                    </div>
                            }

                        </form>
                    </div>

                    <div className='w-full mt-10'>
                        <table className="w-full border-b border-gray-500">
                            <thead className=" border-b w-full">
                                <tr>
                                    <th scope="col" className="text-sm sticky top-0 bg-gray-400 font-semibold py-2 px-2 text-4 text-black  text-center">
                                        STT
                                    </th>
                                    <th scope="col" className="text-sm sticky w-full top-0 bg-gray-400 font-semibold py-2 px-2 text-4 text-black  text-center">
                                        Tên nhóm sản phẩm
                                    </th>
                                    <th scope="col" className="text-sm sticky w-full top-0 bg-gray-400 font-semibold py-2 px-2 text-4 text-black  text-center">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    stateListProductType ?
                                        stateListProductType.map((item, index) => (
                                            <>
                                                <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                                    <td className="whitespace-nowrap text-center text-3.5 text-sm font-medium text-gray-900 px-2 py-2">
                                                        {index + 1}
                                                    </td>
                                                    <td className="whitespace-nowrap text-center text-3.5 text-sm font-medium text-gray-900 px-2 py-2">
                                                        {item.Ten_loai_SP}
                                                    </td>

                                                    <td className="text-sm text-gray-900 font-light px-2 py-2 whitespace-nowrap text-center">
                                                        <button onClick={() => { setStateValueEdit({ ...stateValueEdit, id_loai_SP: item.id, Ten_loai_SP: item.Ten_loai_SP }); setShowButtonEdit(true); setStateValue(item.Ten_loai_SP) }} className="px-4 py-1 text-sm text-black border-black font-semibold hover:bg-slate-600 hover:text-white hover:border-white border-2 rounded">Sửa</button>
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

            {
                showSuccess && (<AddSuccess show={showMessage} Mes={stateMes} />)
            }
        </>
    )
}

export default ProductType