import React from 'react'

const Footer = () => {
    return (
        <>
            <div className='mt-6'>
                <div className='px-60'>
                    <div className='mb-5'>
                        <div className='flex justify-around py-5'>
                            <div className='text-center mr-5'>
                                <span>
                                    <i className='bi bi-check2-circle text-16 text-green-900'></i>
                                </span>
                                <div className=''>
                                    <span className='font-semibold text-4'>SẢN PHẨM CHÍNH HÃNG</span>
                                </div>
                            </div>
                            <div className='text-center mr-5'>
                                <span>
                                    <i className='bi bi-box2 text-16 text-green-900'></i>
                                </span>
                                <div>
                                    <span className='font-semibold text-4'>MIỄN PHÍ VẤN CHUYỂN TOÀN QUỐC</span>
                                </div>
                            </div>
                            <div className='text-center mr-5'>
                                <span>
                                    <i className='bi bi-headset text-16 text-green-900'></i>
                                </span>
                                <div>
                                    <span className='font-semibold text-4'>HOTLINE HỔ TRỢ 09896.5565 </span>
                                </div>
                            </div>
                            <div className='text-center mr-5'>
                                <span>
                                    <i className='bi bi-arrow-repeat text-16 text-green-900'></i>
                                </span>
                                <div>
                                    <span className='font-semibold text-4'>THỦ TỤC ĐỔI TRẢ DỄ DÀNG</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className='px-60'>
                    <div className='bg-green-100 rounded-3 p-5'>
                        <div className='overflow-hidden'>
                            <div className="float-left mr-20">
                                <h4><a className='font-semibold'>Hỗ Trợ - Dịch Vụ</a></h4>
                                <ul className='inline-block'>
                                    <li className='mb-2'><a href="#">Mua hàng trả góp</a></li>
                                    <li className='mb-2'><a href="#">Hướng dẫn đặt hàng và thanh toán</a></li>
                                    <li className='mb-2'><a href="#">Tra cứu đơn hàng</a></li>
                                    <li className='mb-2'><a href="#">Chính sách bảo hành</a></li>
                                    <li className='mb-2'><a href="#">Phạm vi, điều khoản gói bảo hành mở rộng</a></li>
                                    <li className='mb-2'><a href="#">Chính sách bảo mật</a></li>
                                    <li className='mb-2'><a href="#">Chính sách giải quyết khiếu nại</a></li>
                                    <li className='mb-2'><a href="#">Điều khoản mua bán hàng hóa</a></li>
                                    <li className='mb-2'><a href="#">Câu hỏi thường gặp</a></li>
                                </ul>
                            </div>
                            <div className="float-left mr-20">
                                <h4><a className='font-semibold'>Thông Tin Liên Hệ</a></h4>
                                <ul>
                                    <li className='mb-2'><a href="#">Bán hàng Online</a></li>
                                    <li className='mb-2'><a>Chăm sóc Khách Hàng</a></li>
                                    <li className='mb-2'><a>Hỗ Trợ Kỹ thuật</a></li>
                                    <li className='mb-2'><a>Hỗ trợ Bảo hành &amp; Sửa chữa</a></li>
                                    <li className='mb-2'><a>Liên hệ khối văn phòng</a></li>
                                </ul>
                            </div>
                            <div className="float-left mr-20">
                                <h4><a className='font-semibold' href="#">Hệ thống 110 siêu thị trên toàn quốc</a></h4>
                                <ul>
                                    <li className='mb-2'><a href="#">Danh sách 110 siêu thị trên toàn quốc</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>

        </>
    )
}

export default Footer