const images = [
    "https://cdn.hoanghamobile.com/i/home/Uploads/2022/08/29/web-oppo-reno8-series_637973822849702214.jpg",
    "https://cdn.hoanghamobile.com/i/home/Uploads/2022/09/21/banner-may-loc-kk-03.jpg",
    "https://cdn.hoanghamobile.com/i/home/Uploads/2022/09/12/webbbbb.jpg",
    "https://cdn.hoanghamobile.com/i/home/Uploads/2022/09/20/web-1200.jpg",
    "https://cdn.hoanghamobile.com/i/home/Uploads/2022/09/13/web-g11-plus-01.jpg",
    "https://cdn.hoanghamobile.com/i/home/Uploads/2022/09/12/web-lap-amd-03.jpg",
    "https://cdn.hoanghamobile.com/i/home/Uploads/2022/09/17/1200x382-wweb.jpg",
    "https://cdn.hoanghamobile.com/i/home/Uploads/2022/09/15/anh-landing-page-dat-truoc-bo-suu-tap-gioi-han-z-flip4-04_637988303148073415.jpg",
]

const listSmartphone = [
    {
        id: "1",
        name: "Xiaomi 12 lite 5G - chính hãng",
        image: "https://cdn.hoanghamobile.com/i/productlist/ts/Uploads/2022/09/08/thumb-xiaomi-12.jpg",
        price: '3,590,000 ₫',
        discount: '5,920,000 ₫'
    },
    {
        id: "2",
        name: "OPPO Reno6 Z 5G- chính hãng",
        image: "https://cdn.hoanghamobile.com/i/productlist/ts/Uploads/2022/08/02/combo-product-reno8-4g-black.png",
        price: '8,790,000 ₫',
        discount: '10,590,000 ₫'
    },
    {
        id: "3",
        name: "Samsung Galaxy A73 5G - chính hãng",
        image: "https://cdn.hoanghamobile.com/i/productlist/ts/Uploads/2022/08/02/combo-product-reno8-z-gold.png",
        price: '4,600,000 ₫',
        discount: '5,827,000 ₫'
    },
    {
        id: "4",
        name: "Xiaomi Redmi 9C - chính hãng",
        image: "https://cdn.hoanghamobile.com/i/productlist/ts/Uploads/2022/07/04/image-removebg-preview-10.png",
        price: '9,100,000 ₫',
        discount: '12,500,000 ₫'
    },
    {
        id: "5",
        name: "Redmi Note 11 - chính hãng",
        image: "https://cdn.hoanghamobile.com/i/productlist/ts/Uploads/2022/08/04/image-removebg-preview-2_637952077804801502.png",
        price: '4,270,000 ₫',
        discount: '5,129,000 ₫'
    },
    {
        id: "6",
        name: "Xiaomi Redmi Note 10 Pro - chính hãng",
        image: "https://cdn.hoanghamobile.com/i/productlist/ts/Uploads/2022/08/10/z-flip-4.jpg",
        price: '4,710,000 ₫',
        discount: '5,220,000 ₫'
    },
    {
        id: "7",
        name: "Samsung Galaxy S22 Ultra - 8GB/128GB - chính hãng",
        image: "https://cdn.hoanghamobile.com/i/productlist/ts/Uploads/2022/04/08/image-removebg-preview-2.png",
        price: '5,712,000 ₫',
        discount: '7,350,000 ₫'
    },
    {
        id: "8",
        name: "Samsung Galaxy S22 Ultra - 12GB/524GB - chính hãng",
        image: "https://cdn.hoanghamobile.com/i/productlist/ts/Uploads/2021/03/16/image-removebg-preview-3.png",
        price: '8,312,000 ₫',
        discount: '9,990,000 ₫'
    },
    {
        id: "9",
        name: "Samsung Galaxy S22 Plus - 8GB/128GB - chính hãng",
        image: "https://cdn.hoanghamobile.com/i/productlist/ts/Uploads/2022/04/18/image-removebg-preview-7.png",
        price: '3,777,000 ₫',
        discount: '4,777,000 ₫'
    },
    {
        id: "10",
        name: "Samsung Galaxy S22 Ultra - 12GB/524GB - chính hãng",
        image: "https://cdn.hoanghamobile.com/i/productlist/ts/Uploads/2022/03/21/redmi-10c-9.png",
        price: '5,666,000 ₫',
        discount: '6,755,000 ₫'
    },
    {
        id: "11",
        name: "Apple iPhone 13 - chính hãng",
        image: "https://cdn.hoanghamobile.com/i/productlist/ts/Uploads/2021/10/26/image-removebg-preview.png",
        price: '9,420,000 ₫',
        discount: '10,550,000 ₫'
    },
    {
        id: "12",
        name: "apple iPhone 14 Pro Max - chính hãng",
        image: "https://cdn.hoanghamobile.com/i/productlist/ts/Uploads/2022/02/09/image-removebg-preview-19.png",
        price: '1,550,000 ₫',
        discount: '6,790,000 ₫'
    },
    {
        id: "13",
        name: "Oppo Note 10 Pro - chính hãng",
        image: "https://cdn.hoanghamobile.com/i/productlist/ts/Uploads/2022/08/10/z-flip-4.jpg",
        price: '4,710,000 ₫',
        discount: '5,220,000 ₫'
    },
    {
        id: "14",
        name: "Samsung Galaxy S10 CC - chính hãng",
        image: "https://cdn.hoanghamobile.com/i/productlist/ts/Uploads/2022/07/04/image-removebg-preview-10.png",
        price: '9,100,000 ₫',
        discount: '12,500,000 ₫'
    },
    {
        id: "15",
        name: "VIVO Note 10 Plus - 8GB/128GB - chính hãng",
        image: "https://cdn.hoanghamobile.com/i/productlist/ts/Uploads/2022/04/18/image-removebg-preview-7.png",
        price: '3,777,000 ₫',
        discount: '4,777,000 ₫'
    }

]

const listTable = [
    {
        id: 1,
        name: "Laptop HUAWEI MATEBOOK D 15 - BoD-WDH9 (i5-1135G7/8GB/256GB/15.6 FHD/WIN11/BẠC - Chính hãng)",
        image: "https://cdn.hoanghamobile.com/i/productlist/dsp/Uploads/2022/02/21/laptop-huawei-matebook-d15-bod-wdh9-6.png",
        price: "12,990,000",
        discount: "14,990,000"
    },
    {
        id: 2,
        name: "Laptop HUAWEI MateBook D14 -6941487256952 - i3-1115G4 /8GB/256GSSD/14.0FHD/W11SL - Chính hãng",
        image: "https://cdn.hoanghamobile.com/i/productlist/dsp/Uploads/2022/06/22/huawei-d-14-5.png    ",
        price: "10,990,000",
        discount: "13,990,000"
    },
    {
        id: 3,
        name: "Laptop ASUS Gaming Rog Strix G153 G513IE-HN246W, R7-4800H/8GB/512GB/RTX3050Ti/15 - Chính hãng",
        image: "https://cdn.hoanghamobile.com/i/productlist/dsp/Uploads/2022/09/05/image-removebg-preview-31.png",
        price: "21,390,000",
        discount: "23,990,000"
    },
    {
        id: 4,
        name: "Laptop ASUS Gaming Rog Strix G153 G513IE-HN246W, R7-4800H/8GB/512GB/RTX3050Ti - Chính hãng",
        image: "https://cdn.hoanghamobile.com/i/productlist/dsp/Uploads/2022/09/05/image-removebg-preview-31.png",
        price: "21,390,000 ",
        discount: "123,990,000"
    },
    {
        id: 5,
        name: "Laptop Gaming Lenovo Legion 5 15ARH7 - 82RE002VVN - R5 6600H/8GB/512GB/RTX - Chính hãng",
        image: "https://cdn.hoanghamobile.com/i/productlist/dsp/Uploads/2022/07/28/image-removebg-preview-4_637946022325170031.png",
        price: "27,890,000",
        discount: "32,190,000"
    },
    {
        id: 6,
        name: "Laptop Lenovo Legion 5 15ACH6 - 82JW00JPVN - R5 5600H/8GB/256GB/GTX1650/15.6 FHD/W11H - Chính hãng",
        image: "https://cdn.hoanghamobile.com/i/productlist/dsp/Uploads/2022/07/27/image-removebg-preview-20.png",
        price: "20,490,000",
        discount: "25,990,000"
    },
    {
        id: 7,
        name: "Macbook Pro M2 13 2022 - 256GB - Chính hãng Apple Việt Nam",
        image: "https://cdn.hoanghamobile.com/i/productlist/dsp/Uploads/2022/06/07/macbook-pro-m2-silver-3.png",
        price: "12,990,000",
        discount: "14,990,000"
    },
    {
        id: 8,
        name: "Laptop Macbook Pro M2 13 2022 - 16GB/256GB - Chính hãng Apple Việt Nam",
        image: "https://cdn.hoanghamobile.com/i/productlist/dsp/Uploads/2022/06/07/macbook-pro-m2-silver-3.png",
        price: "36,990,000",
        discount: "14,990,000"
    },
    {
        id: 9,
        name: "Laptop HP VICTUS 16-d0294TX 5Z9R5PA - i5-11400H/8GB/512GB/ RTX 3050Ti 11/Đen- Chính hãng",
        image: "https://cdn.hoanghamobile.com/i/productlist/dsp/Uploads/2022/08/01/image-removebg-preview.png   ",
        price: "18,990,000",
        discount: "25,990,000"
    },
    {
        id: 10,
        name: "Laptop HP Gaming VICTUS 16 - d0198TX - 4R0U0PA (i7-11800H/8GB 4GB/16.1 FHD/Win 11) - Chính hãng",
        image: "https://cdn.hoanghamobile.com/i/productlist/dsp/Uploads/2021/11/11/laptop-hp-gaming-victus-16-d0197tx-2.png",
        price: "26,890,000",
        discount: " 32,490,000"
    },
    {
        id: 11,
        name: "Laptop gaming MSI GF63 Thin 11SC 662VN - Chính hãng - I7-11800H/8GB/512GB  144HZ/WIN11/ĐEN",
        image: "https://cdn.hoanghamobile.com/i/productlist/dsp/Uploads/2022/06/18/msi-gaming-gf63-12.png",
        price: "17,990,000",
        discount: "23,990,000"
    },
    {
        id: 12,
        name: "Laptop ASUS Gaming TUF Dash F15 FX517ZE-HN045W (i5-12450H/8GB/512GB/3050Ti FHD/Win11 - Chính hãng",
        image: "https://cdn.hoanghamobile.com/i/productlist/dsp/Uploads/2022/07/05/gaming-tuf-dash-f15-fx517ze-hn045w-1.png",
        price: "22,990,000",
        discount: "28,990,000"
    },

]

export { images, listSmartphone, listTable }

