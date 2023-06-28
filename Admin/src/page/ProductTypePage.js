import React, { lazy, Suspense } from 'react'

const ProductType = React.lazy(() => import('components/Ql-san-pham/ProductType'))

const ProductTypePage = () => {
    return (
        <>
            <Suspense>
                <ProductType />
            </Suspense>
        </>
    )
}

export default ProductTypePage