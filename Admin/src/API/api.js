import axios from 'axios';

const URL = 'http://localhost:7001'

export const apiGetListProductType = () => axios.get(`${URL}/api/get-list-product-type`)
export const apiGetListProductGroup = () => axios.get(`${URL}/api/get-list-product-group`)
export const apiPostCreateProduct = (payload) => axios.post(`${URL}/api/add-Product`, {
    Ten_san_pham: payload.Ten_san_pham,
    Hinh_anh: payload.Hinh_anh,
    Gia_san_pham: payload.Gia_san_pham,
    So_luong_SP: payload.So_luong_SP,
    Thong_tin_bao_hanh: payload.Thong_tin_bao_hanh,
    Ghi_chu: payload.Ghi_chu,
    Id_loai_SP: payload.Id_loai_SP,
    Id_nhom_SP: payload.Id_nhom_SP
})
export const apiGetProduct = (payload) => axios.get(`${URL}/api/get-list-product?limit=${payload}`)
export const apiGetInfoProduct = (payload) => axios.get(`${URL}/api/get-info-product?id=${payload}`)
export const apiPostEditInfoProduct = (payload) => axios.post(`${URL}/api/post-edit-info-product`, payload)
export const apiPostAddProductDetail = (payload) => axios.post(`${URL}/api/post-add-product-detail`, payload)
export const apiGetInfoProductDetail = (payload) => axios.get(`${URL}/api/get-info-product-detail?Id_san_pham=${payload}`)
export const apiPostEditInfoProductDetail = (payload) => axios.post(`${URL}/api/post-edit-info-product-detail`, payload)
export const apiGetSearchProduct = (payload) => axios.get(`${URL}/api/get-search-product?Ten_san_pham=${payload.Ten_san_pham}&limit=${payload.limit}`)
export const apiGetSearchMember = (payload) => axios.get(`${URL}/api/get-search-member?email=${payload}`)
export const apiPostAddMember = (payload) => axios.post(`${URL}/api/signUp`, payload)
