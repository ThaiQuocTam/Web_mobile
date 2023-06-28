import { combineReducers } from 'redux'
import getListProductTypeReducer from './listProductTypeReducer'
import getListProductGroupReducer from './listProductGroupReducer'
import postCreateProductReducer from './createProductReducer'
import getProductReducer from "./getProductReducer"
import getInfoProductReducer from './getInfoProductReducer'
import postEditInfoProductReducer from './postEditInfoProductReducer'
import postAddProductDetailReducer from './postAddProductDetailReducer'
import getInfoProductDetailReducer from './getInfoProductDetail'
import postEditInfoProductDetailReducer from './postEditInfoProductDetailReducer'
import getSearchProductReducer from './getSearchProduct'
import getSearchMemberReducer from './getSearchMember'
import postAddMemberReducer from './postAddMemberReducers'

export default combineReducers({
    getListProductTypeReducer,
    getListProductGroupReducer,
    postCreateProductReducer,
    getProductReducer,
    getInfoProductReducer,
    postEditInfoProductReducer,
    postAddProductDetailReducer,
    getInfoProductDetailReducer,
    postEditInfoProductDetailReducer,
    getSearchProductReducer,
    getSearchMemberReducer,
    postAddMemberReducer
})  
