import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Home.css'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import * as actions from '../../redux/actions'
import { listTopTabletReducer } from 'redux/selector';
import LimitProduct from './LimitProduct';
import ShowButton from 'components/List-san-pham/ShowButton';

const TopTablet = () => {

    const dispatch = useDispatch(useDispatch)
    const listTablet = useSelector(listTopTabletReducer)
    const [stateListTablet, setStateListTablet] = useState()
    const navigate = useNavigate()

    const settings = {
        className: "center",
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 5,
        swipeToSlide: true,

    };

    useEffect(() => {
        dispatch(actions.getListTopTabletAction.getListTopTabletRequest(3))
    }, [])

    useEffect(() => {
        try {
            setStateListTablet(listTablet)
        } catch (e) {

        }
    }, [listTablet])

    return (
        <>
            <div className='pl-24 mt-8 w-96 mb-5'>
                <div className=" text-center w-auto pr-5 ml-20 border-l-25 border-green-200 p-2 bg-green-950">
                    <span className='text-3.5 font-semibold text-white'>Tóp Laptop bán chạy</span>
                </div>
            </div>
            <div className='px-24 shadow-soft-xxs bg-green-150'>
                <Slider {...settings}>
                    {
                        stateListTablet && stateListTablet.length !== 0 &&
                        stateListTablet.map((item, index) => (
                            <div className='p-5 mx-5 h-27em box-shadow relative rounded-2 bg-white'>
                                {
                                    item.So_luong_SP <= 5 ? <LimitProduct soLuong={item.So_luong_SP} /> : ''
                                }
                                {
                                    item.So_luong_SP <= 5 && item.So_luong_SP > 0 ?
                                        <div className="absolute animate-bounce w-10 top-0 left-0">
                                            <img className="w-full" src='https://hoanghamobile.com/Content/web/sticker/hot.png' />
                                        </div> : ''
                                }
                                {
                                    item.So_luong_SP === 0 ?
                                        <div className="absolute bg-green-950 p-1 rounded-2 px-2 top-0 right-0">
                                            <span className="text-3 text-white font-">Vui lòng đợi vài ngày</span>
                                        </div> : ''

                                }
                                <div className='mb-10 shadow-soft-xxs text-center'>
                                    <div className=''>
                                        <img className='zoom-image hover:zoom-image-hover mx-auto' src={item.Hinh_anh} />
                                    </div>
                                </div>
                                <div className='text-center h-24 mb-2'>
                                    <div className='pt-2 mb-1 max-h-20 h-20 overflow-hidden'>
                                        <span className='text-3.5 font-semibold text-black'>{item.Ten_san_pham}</span>
                                    </div>
                                    <div className='pb-2'>
                                        <span className='text-red-600 text-3.5 mr-5 font-semibold'>{item.Gia_san_pham.toLocaleString()}<span className='ml-1'>₫</span></span>
                                        <span className='line-through text-3'>{(item.Gia_san_pham + (item.Gia_san_pham * (10 / 100))).toLocaleString()}<span className='ml-1'>₫</span></span>
                                    </div>
                                </div>
                                <div className='mt-5'>
                                    <ShowButton Id={item.id} nameProduct={item.Ten_san_pham} />
                                </div>
                            </div>
                        ))
                    }
                </Slider>
            </div>
        </>
    )
}

export default TopTablet