import React from "react";
import { Link, useNavigate } from "react-router-dom"
import * as actions from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux';

const ShowButton = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleOnClick = () => {
        if (props.Id) {
            localStorage.setItem("idProduct", props.Id)
        }
    }
    return (
        <>
            <a href={`/DetailProduct?Ten_san_pham=${props.nameProduct}`} onClick={handleOnClick}>
                <div className='bg-red-600 text-center p-1 rounded-1 shadow-soft-2xl hover:bg-red-800 animate-modalForm'>
                    <div>
                        <button className='text-3.5 font-semibold text-white'>Xem chi tiết</button>
                    </div>
                </div>
            </a>

        </>
    )
}

export default ShowButton