import React, { lazy, Suspense } from 'react'

const VersionProduct = React.lazy(() => import('../components/Ql-san-pham/VersionProduct'))

const VersionProductPage = () => {
    return (
        <>
            <Suspense>
                <VersionProduct />
            </Suspense>
        </>
    )
}

export default VersionProductPage