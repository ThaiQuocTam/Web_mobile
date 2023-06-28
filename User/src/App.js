import DetailProductPage from 'page/DetailProduct.page';
import SignInPage from 'page/SignIn.page';
import SignUpPage from 'page/SignUp.page';
import OrderLookupPage from 'page/OrderLookup.page';
import HomePage from 'page/Home.page';
import ListProductPage from 'page/ListProduct.page';
import CartPage from 'page/Cart.page';
import OrderDetailPage from 'page/OrderDetail.page';
import { Routes, Route } from 'react-router-dom'


function App() {
  return (
    <>
      <div className=''>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/SignIn' element={<SignInPage />} />
          <Route path='/SignUp' element={<SignUpPage />} />
          <Route path='/ListProduct' element={<ListProductPage />} />
          <Route path='/DetailProduct' element={<DetailProductPage />} />
          <Route path='/OrderLookup' element={<OrderLookupPage />} />
          <Route path='/Cart' element={<CartPage />} />
          <Route path='/OrderDetail' element={<OrderDetailPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
