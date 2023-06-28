import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import * as actions from '../../redux/actions'
import { listTopSmartphoneSelector } from 'redux/selector';
import LimitProduct from './LimitProduct';
import ShowButton from 'components/List-san-pham/ShowButton';

const FlashSale = () => {

    const dispatch = useDispatch(useDispatch)
    const listTopSmartphone = useSelector(listTopSmartphoneSelector)
    const [listSmartphone, setListSmartphone] = useState([])
    const navigate = useNavigate()

    const settings = {
        className: "center",
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 5,
        swipeToSlide: true,
        afterChange: function (index) {

        }
    };

    useEffect(() => {
        dispatch(actions.topSmartphoneAction.topSmartphoneRequest(1))
    }, [])

    useEffect(() => {
        try {
            setListSmartphone(listTopSmartphone)
        } catch (e) { }
    }, [listTopSmartphone])

    return (
        <>
            <div className='px-24 shadow-soft-xxs bg-green-150'>
                <Slider {...settings}>
                    {
                        listSmartphone && listSmartphone.length !== 0 &&
                        listSmartphone.map((item) => (
                            <div className='p-5 mx-5 h-96 box-shadow relative rounded-2 bg-white'>
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
                                <div className=''>
                                    <div className='w-full '>
                                        <img className='zoom-image hover:zoom-image-hover' src={item.Hinh_anh} />
                                    </div>
                                </div>
                                <div className='text-center h-20 mb-2'>
                                    <div className='pt-2 pb-1  max-h-16 h-16 overflow-hidden'>
                                        <span className='text-3.5 font-semibold text-black'>{item.Ten_san_pham} - Chính hãng</span>
                                    </div>
                                    <div className='pb-2'>
                                        <span className='text-red-600 text-3.5 mr-5 font-semibold'>{item.Gia_san_pham.toLocaleString()} ₫</span>
                                        <span className='line-through text-3'>{(item.Gia_san_pham + (item.Gia_san_pham * (10 / 100))).toLocaleString()}  ₫</span>
                                    </div>
                                </div>
                                <div className='mt-8'>
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
export default FlashSale