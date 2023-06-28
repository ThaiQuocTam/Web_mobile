import React, { lazy, Suspense } from 'react'

const QlSanPham = React.lazy(() => import('components/Ql-san-pham/QlSanPham'))

const QlSanPhamPage = () => {
    return (
        <>
            <Suspense>
                <QlSanPham />
            </Suspense>
        </>
    )
}

export default QlSanPhamPage