import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
// import { images } from '../../models/Home.model'
import FlashSale from "./FlashSale";
import axios from "axios";

const Home = () => {

    const [positionX, setPositionX] = useState(0)
    const [indexItem, setIndex] = useState(1)
    const [sliderItems, setSlideItems] = useState()
    const [images, setImages] = useState()

    useEffect(() => {
        axios.get(`http://localhost:7001/api-get-list-slides`)
            .then(list => setImages(list.data))
            .catch(e => { })
    }, [])

    useEffect(() => {
        if (images && images.length !== 0) {
            let totalItem = images.length
            setSlideItems(totalItem)
            let index = indexItem + 1
            const timerId = setTimeout(() => {
                if (positionX <= 0 && index <= totalItem) {
                    setPositionX(pre => pre - 1000)
                    setIndex(pre => pre + 1)
                }
                else {
                    setPositionX(0)
                    setIndex(1)
                }

            }, 3000)

            return () => clearTimeout(timerId)
        }
    }, [positionX || images])

    const handleClickNext = () => {
        if (indexItem < sliderItems) {
            setIndex(pre => pre + 1)
            setPositionX(pre => pre - 1000)
        }
        else {
            setIndex(1)
            setPositionX(0)
        }
    }

    const handleClickPrevious = () => {
        if (indexItem > 1) {
            setIndex(pre => pre - 1)
            setPositionX(pre => pre + 1000)
        }
    }

    return (
        <>
            <div className="slider">
                <i className="bi bi-caret-left-fill slider-prev border-2 border-gray-200 hover:bg-slate-100" onClick={handleClickPrevious}></i>
                <ul className="slider-dots" >
                    {
                        images && images.length !== 0 &&
                        images.map((item, index) => (
                            <li className="slider-dot-item" style={{ background: `${indexItem === (index + 1) ? 'gray' : '#fff'}` }} data-index={index} ></li>
                        ))}
                </ul>
                <div className="slider-wrapper">
                    <div className="slider-main" style={{ transform: `translateX(${positionX}px)` }}>
                        {
                            images && images.length !== 0 &&
                            images.map((item, index) => (
                                <div className="slider-item">
                                    <img
                                        className="block max-w-full"
                                        src={item.Hinh_anh}
                                        alt=""
                                    />
                                </div>
                            ))}
                    </div>
                </div>
                <i className="bi bi-caret-right-fill slider-next border-2 border-gray-200 hover:bg-slate-100" onClick={handleClickNext}></i>
            </div>
            <div>
                <div className='pl-24 mt-8 w-96 mb-5'>
                    <div className=" text-center w-auto pr-5 ml-20 border-l-25 border-green-200 p-2 bg-green-950">
                        <span className='text-3.5 font-semibold text-white'>Tóp điện thoại bán chạy</span>
                    </div>
                </div>
                <FlashSale />
            </div>
        </>
    )
}

export default Home