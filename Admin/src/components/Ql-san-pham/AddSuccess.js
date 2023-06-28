import React, { useState, useEffect } from 'react'

const AddSuccess = (props) => {

    const [background, setBackground] = useState('')
    const [text, setTex] = useState('')
    const [mesEditInfoProductDetail, setMesEditInfoProductDetail] = useState()

    useEffect(() => {
        if (props.Mes === 'Thêm thành công' || props.Mes === 'Cập nhật thành công' || props.Mes === 'Xóa thành công') {
            setBackground('bg-green-600 w-60')
            setTex('bi bi-check-circle')
        }
        else {
            setBackground(`bg-red-500 w-80`)
            setTex('bi bi-x-octagon-fill')
        }
        if (props.mesEditInfo) {
            if (props.mesEditInfo.errCode === '0' || props.mesEditInfo.errCode === 0) {
                setMesEditInfoProductDetail(props.mesEditInfo)
                setBackground('bg-green-600 w-60')
                setTex('bi bi-check-circle')
            }
            else {
                setMesEditInfoProductDetail(props.mesEditInfo)
                setBackground(`bg-red-500 w-80`)
                setTex('bi bi-x-octagon-fill')
            }
        }
        if (props.mesAddVersion) {
            if (props.mesAddVersion.errCode === 0) {
                setMesEditInfoProductDetail(props.mesAddVersion)
                setBackground('bg-green-600 w-60')
                setTex('bi bi-check-circle')
            }
            else {
                setMesEditInfoProductDetail(props.mesAddVersion)
                setBackground(`bg-red-500 w-80`)
                setTex('bi bi-x-octagon-fill')
            }
        }
    }, [props])

    return (
        <>
            <div>
                <div className={`rounded-2 p-2 ${background} fixed top-120 animate-modalForm`} style={{ left: '640px' }}>
                    <div className='w-full overflow-hidden'>
                        <div className='float-right'>
                            <i onClick={props.show} className=" bi bi-x-octagon-fill hover:text-slate-700 cursor-pointer text-white text-4 mr-2"></i>
                        </div>
                        <div className='mt-2 pl-5 flex'>
                            <div>
                                <i className={` ${text} text-8 text-white`} ></i>
                            </div>
                            <div className='leading-12 pl-2'>
                                {
                                    mesEditInfoProductDetail ?
                                        <span className='text-3.5 font-semibold text-white'>{mesEditInfoProductDetail ? mesEditInfoProductDetail.message : ''}</span> : <span className='text-3.5 font-semibold text-white'>{props.Mes || ''}</span>
                                }
                                {/* {
                                    <span className='text-3.5 font-semibold text-white'>{props.Mes || ''}</span>
                                } */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddSuccess