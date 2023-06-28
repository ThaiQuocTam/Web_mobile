import React, { lazy, Suspense } from 'react'

const QlHoaDon = React.lazy(() => import('components/Ql-hoa-don/QlHoaDon'))

const QlHoaDonPage = () => {
    return (
        <>
            <Suspense>
                <QlHoaDon />
            </Suspense>
        </>
    )
}

export default QlHoaDonPage