import React, { lazy, Suspense } from 'react'

const QlThanhVien = React.lazy(() => import('components/Ql-thanh-viên/QlThanhVien'))

const QlThanhVienPage = () => {
    return (
        <>
            <Suspense>
                <QlThanhVien />
            </Suspense>
        </>
    )
}

export default QlThanhVienPage