import Banner from 'components/Trang-chu/Banner'
import React, { lazy, Suspense } from 'react'

const Home = React.lazy(() => import('components/Trang-chu/Home'))
const FlashSale = React.lazy(() => import('components/Trang-chu/FlashSale'))
const TopTablet = React.lazy(() => import('components/Trang-chu/TopTablet'))

const HomePage = () => {
    return (
        <>
            <Suspense>
                <Home />
                <Banner />
                <TopTablet />
            </Suspense>
        </>
    )
}

export default HomePage