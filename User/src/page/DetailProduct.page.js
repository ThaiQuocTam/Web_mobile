// import DetailProduct from 'components/Chi-tiet-san-pham/DetailProduct'
import BackHome from 'components/Trang-chu/BackHome'
import React, { lazy, Suspense } from 'react'

const DetailProduct = React.lazy(() => import('components/Chi-tiet-san-pham/DetailProduct'))

const DetailProductPage = () => {
  return (
    <>
      <Suspense>
        <DetailProduct />
      </Suspense>
    </>
  )
}

export default DetailProductPage