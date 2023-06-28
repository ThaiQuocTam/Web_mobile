import axios from 'axios'
import { useState, useEffect } from 'react'
import { set } from 'react-hook-form'
import { Link } from 'react-router-dom'
import AddSuccess from './AddSuccess'

const ModalEditVersionProduct = (props) => {

    const [stateVersionProduct, setStateVersionProduct] = useState({
        Id: 0,
        Id_SP: 0,
        Ten_phien_ban: '',
        Gia_phien_ban: 0,
        Anh_phien_ban: ''
    })
    const [stateMesEdtVersion, setStateMesEditVersion] = useState()
    const [showModalMesEdit, setShowModalMesEdit] = useState(false)

    useEffect(() => {
        if (props.versionProps) {
            setStateVersionProduct({
                ...stateVersionProduct,
                Id: props.versionProps.id,
                Id_SP: props.versionProps.Id_SP,
                Ten_phien_ban: props.versionProps.Ten_phien_ban,
                Gia_phien_ban: props.versionProps.Gia_phien_ban,
                Anh_phien_ban: props.versionProps.Anh_phien_ban
            })
        }
    }, [props.versionProps])

    const convertBase64 = (file) => {
        let fileString = ''
        const reader = new FileReader()
        reader.onloadend = () => {
            fileString = reader.result.toString()
            setStateVersionProduct({ ...stateVersionProduct, Anh_phien_ban: fileString })
        }
        reader.readAsDataURL(file)
    }

    const handleSubmitData = () => {
        setShowModalMesEdit(true)
        axios.put(`http://localhost:7001/api/put-edit-version-product`, stateVersionProduct)
            .then(message => setStateMesEditVersion(message.data))
            .catch(e => console.log(e))
    }

    const handleHideModalEdit = () => {
        setShowModalMesEdit(false)
    }

    useEffect(() => {
        if (showModalMesEdit) {
            const timer = setTimeout(() => {
                setShowModalMesEdit(false)
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showModalMesEdit]);

    return (
        <>
            <div className=''>
                <form>
                    <div className='bg-white w-180-em animate-modalForm'>
                        <div className='h-10 leading-10 bg-blue-450 border-b border-slate-200' >
                            <span className='text-5 font-semibold text-white ml-4'>{props.versionProps ? props.versionProps.Ten_phien_ban : ''}</span>
                            <div className='float-right '>
                                <span>
                                    <i onClick={props.closeModal} className="bi cursor-pointer bi-x-circle-fill text-slate-50 text-6 mr-5 hover:text-slate-900"></i>
                                </span>
                            </div>
                        </div >
                        <div className='p-3'>
                            <div className='pl-3 pt-2 rounded-5 border border-gray-300'>
                                <div className='px-2 pb-3 mt-1'>
                                    <input
                                        readOnly
                                        value={stateVersionProduct.Ten_phien_ban}
                                        onChange={(e) => setStateVersionProduct({ ...stateVersionProduct, Ten_phien_ban: e.target.value })}
                                        className='w-full bg-slate-50 placeholder:text-gray-500 text-3.5 border-2 rounded-2 focus:outline-none hover:border-slate-200 border-slate-100 focus:bg-white pl-5 py-2 text-slate-800 font-medium'
                                    />

                                </div>

                                <div className='px-2 pb-3 mt-1'>
                                    <input
                                        type='number'
                                        value={stateVersionProduct.Gia_phien_ban}
                                        onChange={(e) => setStateVersionProduct({ ...stateVersionProduct, Gia_phien_ban: e.target.value })}
                                        className='w-full placeholder:text-gray-500 text-3.5 border-2 rounded-2 focus:outline-none focus:border-red-200 hover:border-slate-200 border-slate-100 focus:bg-white pl-5 py-2 text-slate-800 font-medium'
                                    />

                                </div>

                                <div className='px-2 pb-3 flex'>
                                    <div className='w-50pc'>
                                        <label className="mb-2 text-gray-900 text-3.5 font-semibold">Hình ảnh : </label>
                                        <input
                                            type="file"
                                            onChange={(e) => convertBase64(e.target.files[0])}
                                            className="block w-3/5 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        />
                                    </div>
                                    <div className='w-50pc'>
                                        <img className='w-20' src={stateVersionProduct.Anh_phien_ban} />
                                    </div>
                                </div>
                                <div className='px-2 w-full mb-5'>
                                    <Link onClick={handleSubmitData} to='#' className='w-full block text-center bg-gradient-dark-gray text-white py-1 rounded-2 hover:opacity-90'> Lưu</Link>
                                </div>
                            </div>
                        </div>
                    </div >
                </form >
            </div >

            {
                showModalMesEdit && <div>
                    <AddSuccess show={handleHideModalEdit} mesEditInfo={stateMesEdtVersion ? stateMesEdtVersion : ''} />
                </div>
            }
        </>
    )
}

export default ModalEditVersionProduct