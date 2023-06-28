
const LimitProduct = (props) => {

    return (
        <>

            {
                props.soLuong === 0 ?
                    <div className='h-12 z-20 leading-12 text-white font-semibold bottom-36 text-center absolute left-0 right-0 ' style={{ 'background-color': '#141613b3' }}>
                        <span> Đã hết</span>
                    </div>
                    :
                    <div className='h-12 z-20 leading-12 text-white font-semibold bottom-36 text-center absolute left-0 right-0 ' style={{ 'background-color': '#141613b3' }}>
                        <span className="text-3.5 "> Số lượng có hạn</span>
                    </div>

            }

            {/* // <div className='h-12 z-20 leading-12 text-white font-semibold bottom-36 text-center absolute left-0 right-0 ' style={{ 'background-color': '#141613b3' }}>
            //     <span> {props.soLuong === 0 ? 'Đẫ hết' : 'Sắp hết'}</span>
            // </div> */}
        </>
    )
}

export default LimitProduct