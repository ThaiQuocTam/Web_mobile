import { useEffect, useState } from "react"
import { infoProductSelector } from '../../redux/selector'
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../redux/actions'
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { useForm } from "react-hook-form";

const FormVersionProduct = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const infoProduct = useSelector(infoProductSelector)
    const [stateVersionProduct, setStateVersionProduct] = useState([])
    const [stateValue, setStateValue] = useState({
        Ten_phien_ban: 'Bản chính'
    })
    const [stateChecked, setStateChecked] = useState(true)

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        mode: "onChange"
    });

    let email = localStorage.getItem("User")
    const idProductStore = localStorage.getItem('idProduct')

    useEffect(() => {
        try {
            if (idProductStore) {
                dispatch(actions.getInfoProductAction.getInfoProductRequest(idProductStore))
                dispatch(actions.getInfoProductDetailAction.getInfoProductDetailRequest(idProductStore))

            }
        } catch (e) {
        }
    }, [])

    useEffect(() => {
        try {
            if (infoProduct) {
                axios.get(`http://localhost:7001/api/get-info-version-product?Id_SP=${idProductStore}`)
                    .then(dataVersion => {
                        let arrVS = []
                        let versionOrg = {
                            Id_SP: infoProduct.data.id,
                            Ten_phien_ban: 'Bản chính',
                            Gia_phien_ban: infoProduct.data.Gia_san_pham,
                            Anh_phien_ban: infoProduct.data.Hinh_anh
                        }
                        arrVS.push(versionOrg)
                        dataVersion.data.map((item) => {
                            arrVS.includes(item) ? '' : arrVS.push(item)
                        })
                        setStateVersionProduct([...arrVS])
                    })
                    .catch(e => console.log(e))

            } else {
            }
        } catch (e) {

        }
    }, [infoProduct])

    const handleOnClick = (item, index) => {
        props.getValueVersion(item, index)
    }

    return (
        <>
            <form className="overflow-hidden">
                {
                    stateVersionProduct && stateVersionProduct.length !== 0 ?
                        stateVersionProduct.map((item, index) => (
                            <div className="border-2 mb-2 hover:border-green-500 border-gray-500 w-32 p-2 rounded-2 text-center float-left mr-5 relative cursor-pointer">
                                <input
                                    onClick={() => handleOnClick(item, index)}
                                    value={item.Ten_phien_ban}
                                    onChange={(e) => setStateValue({ Ten_phien_ban: e.target.value })}
                                    checked={item.Ten_phien_ban === stateValue.Ten_phien_ban}
                                    className="absolute left-5 top-7 cursor-pointer" type='radio' name='Phien_bang' />
                                <div className="w-10 h-10 mb-1 mx-auto">
                                    <img className="w-full" src={item.Anh_phien_ban} />
                                </div>
                                <span className="text-3 text-gray-700 font-semibold" style={{ 'font-family': 'sans-serif' }}>{item.Ten_phien_ban}</span>
                                <br />
                                <span className="text-3 text-red-500 font-semibold" style={{ 'font-family': 'sans-serif' }}>{item.Gia_phien_ban.toLocaleString()} ₫</span>
                            </div>
                        ))
                        : ''
                }
            </form>
        </>
    )
}

export default FormVersionProduct