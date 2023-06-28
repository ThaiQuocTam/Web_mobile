import { createActions } from 'redux-actions';

export const getType = (reduxAction) => {
    return reduxAction().type
}

export const signInAction = createActions({
    signInRequest: (payload) => payload,
    signInSuccess: (payload) => payload,
    signInFailure: (err) => err
})

export const signUpAction = createActions({
    signUpRequest: (payload) => payload,
    signUpSuccess: (payload) => payload,
    signUpFailure: (err) => err
})

export const topSmartphoneAction = createActions({
    topSmartphoneRequest: (payload) => payload,
    topSmartphoneSuccess: (payload) => payload,
    topSmartphoneFailure: (err) => err
})

export const getInfoProductAction = createActions({
    getInfoProductRequest: (payload) => payload,
    getInfoProductSuccess: (payload) => payload,
    getInfoProductFailure: (err) => err
})

export const getListSmartphoneAction = createActions({
    getListSmartphoneRequest: (payload) => payload,
    getListSmartphoneSuccess: (payload) => payload,
    getListSmartphoneFailure: (err) => err
})

export const getListTopTabletAction = createActions({
    getListTopTabletRequest: (payload) => payload,
    getListTopTabletSuccess: (payload) => payload,
    getListTopTabletFailure: (err) => err
})

export const getInfoUserAction = createActions({
    getInfoUserRequest: (payload) => payload,
    getInfoUserSuccess: (payload) => payload,
    getInfoUserFailure: (err) => err
})

export const getOrderDetailAction = createActions({
    getOrderDetailRequest: (payload) => payload,
    getOrderDetailSuccess: (payload) => payload,
    getOrderDetailFailure: (err) => err
})

export const getBillAction = createActions({
    getBillRequest: (payload) => payload,
    getBillSuccess: (payload) => payload,
    getBillFailure: (err) => err
})

export const getListProductGroupAction = createActions({
    getListProductGroupRequest: (payload) => payload,
    getListProductGroupSuccess: (payload) => payload,
    getListProductGroupFailure: (err) => err
})

export const postPaymentAction = createActions({
    postPaymentRequest: (payload) => payload,
    postPaymentSuccess: (payload) => payload,
    postPaymentFailure: (err) => err
})

export const postReviewAction = createActions({
    postReviewRequest: (payload) => payload,
    postReviewSuccess: (payload) => payload,
    postReviewFailure: (err) => err
})

export const getShowReviewUserAction = createActions({
    getShowReviewUserRequest: (payload) => payload,
    getShowReviewUserSuccess: (payload) => payload,
    getShowReviewUserFailure: (err) => err
})

export const getShowReviewAdminAction = createActions({
    getShowReviewAdminRequest: (payload) => payload,
    getShowReviewAdminSuccess: (payload) => payload,
    getShowReviewAdminFailure: (err) => err
})

export const getInfoProductDetailAction = createActions({
    getInfoProductDetailRequest: (payload) => payload,
    getInfoProductDetailSuccess: (payload) => payload,
    getInfoProductDetailFailure: (err) => err
})

export const putHasReceivedAction = createActions({
    putHasReceivedRequest: (payload) => payload,
    putHasReceivedSuccess: (payload) => payload,
    putHasReceivedFailure: (err) => err
})