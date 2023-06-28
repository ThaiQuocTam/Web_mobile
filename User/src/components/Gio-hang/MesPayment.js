import { Link } from "react-router-dom"
import { useState, useEffect } from 'react'

const MesPayment = (props) => {

    const [stateProps, setStateProps] = useState()

    useEffect(() => {
        setStateProps(props.mesProps)
    }, [props])

    return (
        <>
            {
                stateProps ?
                    <div>
                        <div className={`rounded-2 p-2 border shadow-soft-xxs bg-slate-50 fixed bottom-5 animate-modalForm`} style={{ left: '580px' }}>
                            <div className='w-full overflow-hidden'>
                                <div className='float-right'>
                                    <i onClick={props.isClose} className=" bi bi-x-octagon-fill hover:text-red-800 cursor-pointer text-red-500 text-4 mr-2"></i>
                                </div>
                                <div className='mt-5 pl-5 flex'>
                                    <div>
                                        <i className={` bi bi-x-circle-fill text-8 text-red-500`} ></i>
                                    </div>
                                    <div className='leading-12 pl-2 '>
                                        <span className='text-3.5 font-semibold text-black'>{stateProps.message}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : ''
            }
        </>
    )
}

export default MesPayment