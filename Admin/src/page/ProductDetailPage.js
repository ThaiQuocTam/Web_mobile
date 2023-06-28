import React, { lazy, Suspense } from 'react'

const ProductDetail = React.lazy(() => import('components/Ql-san-pham/ProductDetail'))

const ProductDetailPage = () => {
    return (
        <>
            <Suspense>
                <ProductDetail />
            </Suspense>
        </>
    )
}

export default ProductDetailPage