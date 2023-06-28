import React, { lazy, Suspense } from 'react'

const Cart = React.lazy(() => import('components/Gio-hang/Cart'))

const CartPage = () => {
    return (
        <>
            <Suspense>
                <Cart />
            </Suspense>
        </>
    )
}

export default CartPage