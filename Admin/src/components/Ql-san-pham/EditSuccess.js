import React, { useState, useEffect } from 'react'

const EditSuccess = (props) => {


    const [background, setBackground] = useState('')
    const [text, setTex] = useState('')

    useEffect(() => {
        if (props.mes === 'Chỉnh sửa thành công') {
            console.log('hhi');
            setBackground('bg-green-600 w-60')
            setTex('bi bi-check-circle')
        }
        else {
            console.log('hahah');
            setBackground(`bg-red-500 w-80`)
            setTex('bi bi-x-octagon-fill')
        }
        console.log(props.mes);
    }, [props])

    return (
        <>
            <div>
                <div className={`rounded-2 p-2 ${background} fixed top-120 animate-modalForm`} style={{ left: '640px' }}>
                    <div className='w-full overflow-hidden'>
                        <div className='float-right'>
                            <i onClick={props.isClose} className=" bi bi-x-octagon-fill hover:text-slate-700 cursor-pointer text-white text-4 mr-2"></i>
                        </div>
                        <div className='mt-2 pl-5 flex'>
                            <div>
                                <i className={` ${text} text-8 text-white`} ></i>
                            </div>
                            <div className='leading-12 pl-2'>
                                <span className='text-3.5 font-semibold text-white'>{props.mes}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditSuccess