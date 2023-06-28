import React, { lazy, Suspense } from 'react'
const OrderDetail = React.lazy(() => import('components/Ql-hoa-don/OrderDetail'))


const OrderDetailPage = () => {
    return (
        <>
            <Suspense>
                <OrderDetail />
            </Suspense>
        </>
    )
}

export default OrderDetailPage