import React, { lazy, Suspense } from 'react'

const HomeAdmin = React.lazy(() => import('components/HomeAdmin/HomeAdmin'))


const HomeAdminPage = () => {
    return (
        <>
            <Suspense>
                <HomeAdmin />
            </Suspense>
        </>
    )
}

export default HomeAdminPage