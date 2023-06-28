import { combineReducers } from 'redux'
import signInReducer from './signInReducer'
import signUpReducer from './signUpReducer'
import topSmartphoneReducer from './topSmartphoneReducer'
import getInfoProductReducer from './getInfoProductReducer'
import getListSmartphoneReducer from './getListSmartphoneReducer'
import getListTopTabletReducer from './getListTopTabletReducer'
import getInfoUserReducer from './getInfoUserReducer'
import getBillReducer from './getBillReducer'
import getOrderDetailReducer from './getOrderDetailReducer'
import getListProductGroupReducer from './getListProductGroupReducer'
import postPaymentReducer from './postPaymentReducer'
import postReviewReducer from './postReviewReducer'
import getShowReviewUserReducer from './getReviewUserReducer'
import getShowReviewAdminReducer from './getReviewAdminReducer'
import getInfoProductDetailReducer from './getInfoProductDetailReducer'
import putHasReceivedReducer from './putHasReceivedReducer'

export default combineReducers({
    signInReducer,
    signUpReducer,
    topSmartphoneReducer,
    getInfoProductReducer,
    getListSmartphoneReducer,
    getListTopTabletReducer,
    getInfoUserReducer,
    getBillReducer,
    getOrderDetailReducer,
    getListProductGroupReducer,
    postPaymentReducer,
    postReviewReducer,
    getShowReviewUserReducer,
    getShowReviewAdminReducer,
    getInfoProductDetailReducer,
    putHasReceivedReducer
})