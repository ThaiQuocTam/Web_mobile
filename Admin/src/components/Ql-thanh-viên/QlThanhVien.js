import React, { useState, useEffect } from 'react'
import ModalAddTV from './ModalAddTV';
import axios from 'axios';
import AddSuccess from 'components/Ql-san-pham/AddSuccess';
import { useNavigate } from 'react-router-dom';
import { mesAddMemberSelector, infoMemberSearchedSelector } from 'redux/selector/selector';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../redux/actions/actions'

const QlThanhVien = () => {

    const dispatch = useDispatch()
    const listInfoUser = useSelector(infoMemberSearchedSelector)
    const [stateListInfoUser, setStateListAllInfoUser] = useState()
    const [stateShowModal, setStateModal] = useState(false)
    const navigate = useNavigate()
    const mesAddMember = useSelector(mesAddMemberSelector)
    const [stateValueSearchMember, setStateValueSearchMember] = useState({
        Ho_ten: ''
    })
    const [showSuccess, setShowSuccess] = useState(false)
    const [message, setMessage] = useState()

    useEffect(() => {
        if (stateValueSearchMember.Ho_ten !== '') {
            dispatch(actions.getSearchMemberAction.getSearchMemberRequest(stateValueSearchMember.Ho_ten))
        }
        else {
            axios.get('http://localhost:7001/api/get-all-info-user')
                .then(listAllInfoUser => listAllInfoUser.data.length !== 0 ? setStateListAllInfoUser(listAllInfoUser.data) : '')
                .catch(e => console.log(e))
        }
    }, [stateValueSearchMember])

    useEffect(() => {
        if (listInfoUser) {
            if (listInfoUser) {
                setStateListAllInfoUser(listInfoUser)
            }
        }
    }, [listInfoUser])

    const handleHideModalAddTV = () => {
        navigate(0)
        setStateModal(false)

    }

    const showMessage = () => {
        if (message && message.errCode === 0) {
            navigate(0)
        }
        setShowSuccess(false)
    }

    useEffect(() => {
        if (showSuccess) {
            const timerId = setTimeout(() => {
                if (message && message.errCode === 0) {
                    navigate(0)
                }
                setShowSuccess(false)
            }, 3000)

            return () => clearTimeout(timerId)
        }
    }, [showSuccess])

    return (
        <>
            <div className='font-bold text-3xl mb-3'>Danh sách thành viên</div>
            <div className='w-full mt-4'>
                <div className='inline-block'>
                    <input
                        value={stateValueSearchMember.Ho_ten}
                        onChange={(e) => { setStateValueSearchMember({ ...stateValueSearchMember, Ho_ten: e.target.value }) }
                        }
                        className='border focus:outline-none border-green-700 text-3.5 hover:border-green-900 focus:border placeholder:text-3 placeholder:text-slate-500 focus:border-green-900 rounded-5 h-10 w-96 mr-3 px-5' type={'text'} placeholder='Nhập email cần tìm...' />
                    <a className='inline-block h-10 leading-10' href='#'><i className="bi bi-search text-gray-600 h-10 inline-block hover:text-black text-5 cursor-pointer leading-10"></i></a>
                </div>
                <div className="leading-9 h-9 mb-5 inline-block ml-30rem" onClick={() => setStateModal(true)}>
                    <strong className='text-3.5 text-black border-gray-500 border-2 px-3 pr-5 py-3 ml-2 rounded-2 cursor-pointer hover:bg-slate-600 hover:text-white'> + &ensp; Thêm thành viên</strong>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full">
                                <thead className="bg-gray-400 border-b">
                                    <tr>
                                        <th scope="col" className="font-semibold text-sm text-gray-900 px-6 py-4 text-left" style={{ 'font-family': 'sans-serif' }}>
                                            STT
                                        </th>
                                        <th scope="col" className="font-semibold text-sm text-gray-900 px-6 py-4 text-left" style={{ 'font-family': 'sans-serif' }}>
                                            Họ và tên
                                        </th>
                                        <th scope="col" className="font-semibold text-sm text-gray-900 px-6 py-4 text-left" style={{ 'font-family': 'sans-serif' }}>
                                            Email
                                        </th>
                                        <th scope="col" className="font-semibold text-sm text-gray-900 px-6 py-4 text-left" style={{ 'font-family': 'sans-serif' }}>
                                            Số điện thoại
                                        </th>
                                        <th scope="col" className="font-semibold text-sm text-gray-900 px-6 py-4 text-left" style={{ 'font-family': 'sans-serif' }}>
                                            Giới tính
                                        </th>
                                        <th scope="col" className="font-semibold text-sm text-gray-900 px-6 py-4 text-left" style={{ 'font-family': 'sans-serif' }}>
                                            Quyền
                                        </th>

                                        <th scope="col" className="font-semibold text-sm text-gray-900 px-6 py-4 text-left" style={{ 'font-family': 'sans-serif' }}>

                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        stateListInfoUser ?
                                            stateListInfoUser.map((item, index) => (
                                                <tr className="bg-sky-50 border-b transition duration-300 ease-in-out hover:bg-sky-100">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {index + 1}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {item.Ho_ten}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {item.Email}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {item.Dien_thoai}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {item.Gioi_tinh === 1 ? 'Nam' : 'Nữ'}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {item.Id_phan_quyen === 6 ? 'User' : 'Admin'}
                                                    </td>
                                                    <td className="text-sm text-gray-900 text-center     font-light px-6 py-4 whitespace-nowrap ">
                                                        <i
                                                            onClick={() => {
                                                                setShowSuccess(true);
                                                                axios.post(`http://localhost:7001/api/post-delete-member-admin`, { id: item.id })
                                                                    .then(mess => setMessage(mess.data))
                                                                    .catch(e => console.log(e));
                                                            }}
                                                            className="bi bi-dash-circle text-5 text-red-900 hover:text-red-500 cursor-pointer"></i>
                                                    </td>
                                                </tr>
                                            )) : ''
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {
                stateShowModal &&
                <div className='fixed flex z-sticky  items-center bg-slate-250 justify-center left-0 top-0 right-0 bottom-0'>
                    <ModalAddTV isClose={handleHideModalAddTV} />
                </div>

            }
            {
                showSuccess && <AddSuccess show={showMessage} mesAddVersion={message} />
            }
        </>
    )
}

export default QlThanhVien