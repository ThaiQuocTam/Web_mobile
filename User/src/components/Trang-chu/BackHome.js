import React from 'react'
import { Link } from 'react-router-dom'

const BackHome = () => {
    return (
        <>
            <div className='overflow-auto w-full pl-32'>
                <Link className="relative float-left leading-9 h-9 mb-5 block text-green-900 hover:text-green-600" to="/">
                    <i className="bi bi-arrow-left-circle icon text-8  mr-2 " />
                    <strong className='text-4  '>Quay lại</strong>
                </Link  >
            </div>
        </>
    )
}

export default BackHome

