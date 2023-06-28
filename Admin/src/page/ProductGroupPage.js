import React, { lazy, Suspense } from 'react'

const ProductGroup = React.lazy(() => import('../components/Ql-san-pham/ProductGroup'))

const ProductGroupPage = () => {
    return (
        <>
            <Suspense>
                <ProductGroup />
            </Suspense>
        </>
    )
}

export default ProductGroupPage