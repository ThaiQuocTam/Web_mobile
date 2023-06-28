import SignInAdmin from 'components/SignIn/SignInAdmin';
import SideBar from 'layout/SideBar';
import HomeAdminPage from 'page/HomeAdminPage';
import OrderDetailPage from 'page/OrderDetailPage';
import ProductDetailPage from 'page/ProductDetailPage';
import ProductGroupPage from 'page/ProductGroupPage';
import ProductTypePage from 'page/ProductTypePage';
import QlHoaDonPage from 'page/QlHoaDonPage';
import QlSanPhamPage from 'page/QlSanPhamPage';
import QlThanhVienPage from 'page/QlThanhVienPage';
import VersionProductPage from 'page/VersionProductPage';
import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SlidesPage from 'page/SlidesPage';


function App() {

  const [stateEmail, setStateEmail] = useState()
  const [showButton, setShowButton] = useState(false)

  let EmailAdmin = localStorage.getItem('EmailAdmin')
  const navigate = useNavigate()

  useEffect(() => {
    if (EmailAdmin) {
      setStateEmail(EmailAdmin)
    }
  }, [EmailAdmin])

  return (
    <>
      {
        stateEmail ? '' :
          <SignInAdmin />
      }
      <div className='flex'>
        <SideBar />
        <div className='w-80pc absolute right-0 pl-8 mr-2 py-10'>
          {
            stateEmail ?
              <div
                onMouseEnter={() => setShowButton(true)}
                onMouseLeave={() => setShowButton(false)}
                className='absolute right-5 top-5 cursor-pointer'>
                <div
                  className='relative'>
                  <i class="bi bi-person-circle text-green-950 mr-2"></i>
                  <span className='text-3.5 text-gray-700'>{stateEmail ? stateEmail : ''}</span>
                </div>
                {
                  showButton && <button
                    onClick={() => {
                      localStorage.removeItem("EmailAdmin");
                      navigate(0)
                    }}
                    className='py-1 top-6 left-8 absolute animate-modalForm px-5 border border-gray-700 text text-3.5 text-gray-700 bg-white hover:bg-gray-700 hover:text-white rounded-2'>Đăng xuất</button>
                }
              </div> : ''
          }
          <Routes>
            <Route path='/' element={<HomeAdminPage />} />
            <Route path='/OrderDetail' element={<OrderDetailPage />} />
            <Route path='/QlNhomSP' element={<ProductGroupPage />} />
            <Route path='/QlLoaiSanPham' element={<ProductTypePage />} />
            <Route path='/Home' element={<HomeAdminPage />} />
            <Route path='/QlHoaDon' element={<QlHoaDonPage />} />
            <Route path='/QlSanPham' element={<QlSanPhamPage />} />
            <Route path='/QlThanhVien' element={<QlThanhVienPage />} />
            <Route path='/ProductDetail' element={<ProductDetailPage />} />
            <Route path='/VersionProduct' element={<VersionProductPage />} />
            <Route path='/Slides' element={<SlidesPage />} />
          </Routes>
        </div >
      </div>
    </>
  );
}

export default App;
