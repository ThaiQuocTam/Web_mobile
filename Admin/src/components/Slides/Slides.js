import axios from 'axios'
import AddSuccess from 'components/Ql-san-pham/AddSuccess'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ModalAddSlide from './ModalAddSlide'

const Slides = () => {

    const [stateListSlides, setStateListSlides] = useState()
    const [showModalAddSlide, setShowModalAddSlide] = useState(false)
    const [showMessDelete, setShowMessDelete] = useState(false)
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:7001/api-get-list-slides`)
            .then(listData => setStateListSlides(listData.data))
            .catch(e => console.log(e))
    }, [])

    const handleCloseModal = () => {
        setShowModalAddSlide(false)
    }

    const handleHideMess = () => {
        navigate(0)
        setShowMessDelete(false)
    }

    useEffect(() => {
        if (showMessDelete) {
            let timerId = setTimeout(() => {
                if (message === 'Xóa thành công') {
                    navigate(0)
                }
                setShowMessDelete(false)
            }, 2500)

            return () => clearTimeout(timerId)
        }
    }, [showMessDelete])

    return (
        <>
            <>
                <div className='font-bold text-3xl text-gray-700 pb-3 border-b border-slate-200'>Danh sách Slides</div>
                <div
                    onClick={() => setShowModalAddSlide(true)}
                    className="leading-9 h-9 mb-5 inline-block mt-5" >
                    <strong className='text-3.5 text-black border-gray-500 border-2 px-3 py-3 ml-2 rounded-2 cursor-pointer hover:bg-slate-600 hover:text-white'> + &ensp; Thêm hình ảnh</strong>
                </div>
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
                                                Ảnh
                                            </th>
                                            <th scope="col" className="text-sm  bg-gray-400  px-2 font-semibold text-black text-4 text-center">

                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <>
                                            {
                                                stateListSlides && stateListSlides.length !== 0 &&
                                                stateListSlides.map((item, index) => (
                                                    <tr className="bg-white border-b border-gray-700 transition duration-300 ease-in-out hover:bg-gray-100">
                                                        <td className="  text-center text-3.5 text-sm font-medium text-gray-900 px-2 py-2">
                                                            {index += 1}
                                                        </td>
                                                        <td className="text-center  text-sm text-3.5 font-medium text-gray-900 px-2 py-2">
                                                            <div className='w-40  mx-auto py-2'>
                                                                <img className='w-full' src={item.Hinh_anh} />
                                                            </div>
                                                        </td>
                                                        <td className="text-center text-sm text-3.5 font-medium text-gray-900 px-2 py-2" style={{ height: '164' }}>
                                                            <button
                                                                className='py-1 mx-auto rounded-2 shadow-soft-xxs px-10 bg-white border-2 border-green-950 text-green-950 text-3.5 hover:bg-green-950 hover:text-white'
                                                                onClick={() => {
                                                                    axios.post(`http://localhost:7001/api-post-delete-slides`, { idSlide: item.id })
                                                                        .then(mes => {
                                                                            setShowMessDelete(true)
                                                                            mes.data.errCode === 0 ? setMessage('Xóa thành công') : ''
                                                                        })
                                                                        .catch(e => { })
                                                                }}
                                                            >Xóa</button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    showModalAddSlide && <div className='fixed flex z-sticky  items-center bg-slate-250 justify-center left-0 top-0 right-0 bottom-0'>
                        <ModalAddSlide closeModal={handleCloseModal} />
                    </div>
                }

                {
                    showMessDelete && (<AddSuccess show={handleHideMess} Mes={message} />)
                }
            </>
        </>
    )
}

export default Slides