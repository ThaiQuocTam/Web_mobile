import FlashSale from "components/Trang-chu/FlashSale"
import { Products } from "models/DetailProduct.model"
import { useEffect, useState } from "react"
import { infoProductSelector, infoProductDetailSelector } from '../../redux/selector'
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../redux/actions'
import { Link, useNavigate } from "react-router-dom"
import ReviewProduct from "components/Review-product/ReviewProduct";
import ShowReviewProduct from "components/Review-product/ShowReviewProduct";
import AddCartMes from "./AddCartMes";
import SignIn from "components/Sign-in/SignIn";
import ModalBuyNow from "./ModalBuyNow";
import axios from "axios";
import FormVersionProduct from "./FormVersionProduct";
import ListAvatar from "./ListAvatar";

const DetailProduct = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const infoProductDetail = useSelector(infoProductDetailSelector)

  const [hideAddCartMes, setHideAddCartMes] = useState(false)
  const [showModalSignIn, setShowModalSignIn] = useState(false)
  const [modalBuyNow, setModalBuyNow] = useState(false)
  const infoProduct = useSelector(infoProductSelector)
  const [stateInfoProduct, setStateInfoProduct] = useState({
    Ten_san_pham: '',
    Gia_san_pham: '',
    Thong_tin_khuyen_mai: '',
    Ten_phien_ban: '',
    Hinh_anh: '',
    email: '',
    id_Product: ''
  })
  const [stateValueVersion, setStateValueVersion] = useState({
    id_Product: 0,
    Ten_san_pham: '',
    Ten_phien_ban: '',
    Gia_san_pham: 0,
    Hinh_anh: '',
    email: ''
  })
  const [stateIndex, setStateIndex] = useState(0)

  let email = localStorage.getItem("User")
  const idProductStore = localStorage.getItem('idProduct')

  useEffect(() => {
    if (hideAddCartMes) {
      const timerId = setTimeout(() => {
        setHideAddCartMes(false)
      }, 2000)
      return () => clearTimeout(timerId)
    }
  }, [hideAddCartMes])

  const handleGetValueVersion = (value, index) => {
    if (value) {
      setStateIndex(index)
      setStateValueVersion({
        ...stateValueVersion,
        Ten_phien_ban: value.Ten_phien_ban,
        Gia_san_pham: value.Gia_phien_ban,
        Hinh_anh: value.Anh_phien_ban,
      })

      setStateInfoProduct({
        ...stateInfoProduct,
        Ten_phien_ban: value.Ten_phien_ban,
        Gia_san_pham: value.Gia_phien_ban,
        Hinh_anh: value.Anh_phien_ban
      })
    }
  }

  useEffect(() => {
    try {
      if (idProductStore) {
        dispatch(actions.getInfoProductAction.getInfoProductRequest(idProductStore))
        dispatch(actions.getInfoProductDetailAction.getInfoProductDetailRequest(idProductStore))
      }
    } catch (e) {
    }
  }, [])

  useEffect(() => {
    try {
      if (infoProduct) {
        setStateValueVersion({
          ...stateValueVersion,
          id_Product: infoProduct.data.id,
          Ten_san_pham: infoProduct.data.Ten_san_pham,
          Ten_phien_ban: 'Bản chínhh',
          Gia_san_pham: infoProduct.data.Gia_san_pham,
          Hinh_anh: infoProduct.data.Hinh_anh,
          email: email
        })
        setStateInfoProduct({
          ...stateInfoProduct,
          id_Product: infoProduct.data.id,
          Ten_san_pham: infoProduct.data.Ten_san_pham,
          Ten_phien_ban: 'Bản chính',
          Gia_san_pham: infoProduct.data.Gia_san_pham,
          Thong_tin_bao_hanh: infoProduct.data.Thong_tin_bao_hanh,
          Hinh_anh: infoProduct.data.Hinh_anh,
          email: email
        })
      } else {
      }
    } catch (e) {

    }
  }, [infoProduct])

  const addProduct = (product) => {
    let arr
    let storage = localStorage.getItem('arrProduct')
    arr = JSON.parse(storage)
    if (storage && arr.length !== 0) {
      let arrNew = []
      let checkIdProduct = arr.find(item => item.id_Product === product.id_Product)
      if (checkIdProduct) {
        let checkVersion = arr.find(item => item.Ten_phien_ban === product.Ten_phien_ban)
        if (checkVersion) {
          arr.map((item) => {
            if (item.id_Product === product.id_Product && item.Ten_phien_ban === product.Ten_phien_ban) {
              item.So_luong += 1
            }
            arrNew.push(item)
          })
          localStorage.setItem('arrProduct', JSON.stringify([...arrNew]))
        }
        else {
          product.So_luong = 1
          localStorage.setItem('arrProduct', JSON.stringify([...arr, product]))

        }
      }
      else {
        product.So_luong = 1
        localStorage.setItem('arrProduct', JSON.stringify([...arr, product]))
      }
    }
    else {
      product.So_luong = 1
      localStorage.setItem('arrProduct', JSON.stringify([product]))
    }
  }

  const handleOnclickAddCart = () => {
    setHideAddCartMes(false)
    setHideAddCartMes(true)
    navigate(`/DetailProduct?Ten_san_pham=${stateInfoProduct.Ten_san_pham}`)
    if (stateInfoProduct) {
      addProduct(stateInfoProduct)
    } else {
    }
  }



  const handleCloseMes = () => {
    setHideAddCartMes(false)
  }

  const handleCloseModal = () => {
    setShowModalSignIn(false)
    navigate(0)
  }

  const handleCloseModalBuyNow = () => {
    setModalBuyNow(false)
  }

  const handlePostValueProduct = () => {
    if (infoProduct) {
      setModalBuyNow(true)
    }
  }

  return (
    <>
      <div className="bg-gray-100" style={{ 'padding': '0 70px' }}>
        <div className="bg-white">
          <div className="">
            <div>
              <div className='overflow-auto w-full pl-20 '>
                <Link className="relative float-left leading-9 h-9 mb-5 block text-green-900 hover:text-green-600" to="/ListProduct">
                  <i className="bi bi-arrow-left-circle icon text-8  mr-2 " />
                  <strong className='text-4  '>Quay lại</strong>
                </Link  >
              </div>
            </div>
            <div className='mr-20' style={{ 'margin-left': '4.8rem' }}>
              <div className='w-full border-b-2 border-gray-400 pb-2'>
                <span className='text-5 text-gray-700 font-semibold ' style={{ 'font-family': 'sans-serif' }}>{stateInfoProduct.Ten_san_pham} - Chính hãng</span>
              </div>
              <div className="flex w-full">
                <ListAvatar indexVersion={stateIndex} />
                <div className="w-45pc pt-8 pr-5">
                  <div className="flex p-5">
                    <div><span className="text-5 text-red-600 font-extrabold mr-5 ml-5">{stateInfoProduct.Gia_san_pham.toLocaleString()} ₫</span></div>
                    <div className="leading-9"><span className="text-3.5 line-through italic pr-5 border-r border-r-black">{(stateInfoProduct.Gia_san_pham + (stateInfoProduct.Gia_san_pham * (10 / 100))).toLocaleString()} ₫</span></div>
                    <div className="pl-5 leading-9"><span className="italic text-3.5 font-normal">Giá đã bao gồm 10% VAT</span></div>
                  </div>
                  <div className="pl-10">
                    <span className="text-4 font-semibold">{stateInfoProduct.Ten_san_pham} - Chính hãng</span>
                  </div>
                  <div className="pl-10 mt-2">
                    <div className="bg-green-950 pt-1 w-full text-center rounded-3">
                      <i className="bi bi-truck-front-fill text-5 text-white"></i>
                      <span className="text-white ml-3 mb-2 text-3.5">MIỄN PHÍ VẬN CHUYỂN TOÀN QUỐC</span>
                    </div>
                  </div>
                  <div className="pl-10 mt-5">
                    <div className="mb-2">
                      <span className="text-3 uppercase font-semibold  text-green-950" style={{ 'font-family': 'sans-serif' }}><i className='bi bi-check2-circle text-4 font-semibold text-green-950 mr-1 '></i> Sản phẩm chính hãng</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-3 uppercase font-semibold text-green-950" style={{ 'font-family': 'sans-serif' }}> <i className='bi bi-box2 text-4 font-semibold text-green-950  mr-1'></i> Được chứng nhận từ các cơ sở </span>
                    </div>
                    <div className="mb-2">
                      <span className="text-3 uppercase font-semibold text-green-950" style={{ 'font-family': 'sans-serif' }}><i className='bi bi-headset text-4 font-semibold text-green-950  mr-1'></i> HOTLINE HỔ TRỢ 09896.5565 </span>
                    </div>
                    <div className="mb-2">
                      <span className="text-3 uppercase font-semibold text-green-950" style={{ 'font-family': 'sans-serif' }}><i className='bi bi-arrow-repeat text-4 font-semibold text-green-950  mr-1'></i> Thủ tục đổi trả dễ dàng</span>
                    </div>

                    <div>
                      <FormVersionProduct getValueVersion={handleGetValueVersion} />
                    </div>
                  </div>
                  <div>
                  </div>
                  <div className="flex pl-10 mt-7">
                    <div onClick={handlePostValueProduct} className="w-2/3 bg-red-600 hover:bg-red-800 text-center py-1 rounded-3 cursor-pointer  ">
                      <button className="text-white text-3 font-bold">MUA NGAY</button>
                    </div>
                    <div className="w-1/3 pl-2">
                      {
                        email ?
                          <div onClick={handleOnclickAddCart} className="bg-yellow-600 rounded-3 text-center cursor-pointer hover:bg-yellow-800">
                            <i class="bi bi-cart-plus-fill text-6 text-white"></i>
                            <button className=" ml-2 text-3 text-white font-bold">THÊM GIỎ HÀNG</button>
                          </div>
                          :
                          <div onClick={() => setShowModalSignIn(true)} className="bg-yellow-600 rounded-3 text-center cursor-pointer hover:bg-yellow-800">
                            <i class="bi bi-cart-plus-fill text-6 text-white"></i>
                            <button className=" ml-2 text-3 text-white font-bold">THÊM GIỎ HÀNG</button>
                          </div>
                      }

                    </div>
                  </div>
                </div>
                <div className="p-2 mt-2 bg-slate-50" style={{ 'width': '22.5%' }}>
                  <div className="w-full h-full pt-10">
                    <span className="font-semibold text-gray-800 shadow-soft-xxs block w-full bg-white text-center p-2">Thông tin bảo hành</span>
                    <div className="p-4">
                      <span className="text-4 text-gray-800"><i class="bi bi-clipboard-check text-5 text-green-600 rounded-8 leading-10  mr-2 font-semibold"></i>{stateInfoProduct.Thong_tin_bao_hanh}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {
            infoProductDetail ?
              infoProductDetail.errCode === '0' ?
                <div className="mt-20">
                  <div className="flex mx-20 border rounded-2 shadow-soft-xxs">
                    <div className="w-1/2 p-5">
                      <div className="w-full">
                        <img className="w-full rounded-2" src={infoProductDetail.info.Hinh_anh} />
                      </div>
                    </div>
                    <div className="w-/2 p-5">
                      <div>
                        <span className="font-bold text-4">THÔNG SỐ KĨ THUẬT</span>
                      </div>
                      <div className="my-2">
                        <label className="font-bold text-3.5">Công nghệ màn hình : &nbsp;&nbsp;</label>
                        <span className="text-3.5">{infoProductDetail.info.Cong_nghe_man_hinh}</span>
                      </div>
                      <div className="my-2">
                        <label className="font-bold text-3.5">Độ phân giải: &nbsp;&nbsp;</label>
                        <span className="text-3.5">{infoProductDetail.info.Do_phan_giai}</span>
                      </div>
                      <div className="my-2">
                        <label className="font-bold text-3.5">Hệ điều hành : &nbsp;&nbsp;</label>
                        <span className="text-3.5">{infoProductDetail.info.He_dieu_hanh}</span>
                      </div>
                      <div className="my-2">
                        <label className="font-bold text-3.5">Chíp xử lý (CPU) : &nbsp;&nbsp;</label>
                        <span className="text-3.5">{infoProductDetail.info.Chip_xu_ly}</span>
                      </div>
                      <div className="my-2">
                        <label className="font-bold text-3.5">Bộ nhớ ROM : &nbsp;&nbsp;</label>
                        <span className="text-3.5">{infoProductDetail.info.Bo_nho_ROM}</span>
                      </div>
                      <div className="my-2">
                        <label className="font-bold text-3.5">RAM : &nbsp;&nbsp;</label>
                        <span className="text-3.5">{infoProductDetail.info.RAM}</span>
                      </div>
                      <div className="my-2">
                        <label className="font-bold text-3.5">Dung lượng pin : &nbsp;&nbsp;</label>
                        <span className="text-3.5">{infoProductDetail.info.Dung_luong_PIN}</span>
                      </div>
                    </div>
                  </div>
                </div> : ''
              : ''
          }
        </div>

      </div>

      <div className="mt-5">
        <div className="mt-2 text-center w-80 pr-5 ml-20 border-l-25 border-green-200 p-2 bg-green-950 mb-5">
          <span className='text-3.5 font-semibold text-white'> GỢI Ý CHO BẠN</span>
        </div>
        <div>
          <FlashSale />
        </div>
      </div>
      <div id='Review' className='px-32 bg-slate-50'>
        <div className='bg-white w-full p-8 px-20 rounded-5'>
          <ReviewProduct product={stateInfoProduct} />
          <ShowReviewProduct product={stateInfoProduct} />
        </div>
      </div>
      <div>
        {
          hideAddCartMes && <AddCartMes isClose={handleCloseMes} />
        }
      </div>
      <div>
        {showModalSignIn && <div className='fixed flex z-sticky items-center bg-slate-950 justify-center left-0 top-0 right-0 bottom-0'>
          <SignIn isClose={handleCloseModal} mes={'Vui lòng đăng nhập để thêm giỏ hàng'} />
        </div>}
      </div>

      <div>
        {modalBuyNow && <div className='fixed flex z-sticky items-center bg-slate-950 justify-center left-0 top-0 right-0 bottom-0'>
          <ModalBuyNow isClose={handleCloseModalBuyNow} product={stateValueVersion} />
        </div>}
      </div>

    </>
  )
}

export default DetailProduct
