import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as actions from '../actions/actions'
import * as api from '../../API/api'

function* handleGetListProductTypeAction() {
    try {
        const listProductType = yield call(api.apiGetListProductType)
        yield put(actions.getListProductTypeAction.getListProductTypeSuccess(listProductType.data))
    } catch (e) {
        yield put(actions.getListProductTypeAction.getListProductTypeFailure)
    }
}

function* handleGetListProductGroupAction() {
    try {
        const listProductGroup = yield call(api.apiGetListProductGroup)
        yield put(actions.getListProductGroupAction.getListProductGroupSuccess(listProductGroup.data))

    } catch (e) {
        yield put(actions.getListProductGroupAction.getListProductGroupFailure)
    }
}

function* handlePostCreateProductAction(action) {
    try {
        const messageAddProduct = yield call(api.apiPostCreateProduct, action.payload)
        yield put(actions.postCreateProductAction.postCreateProductSuccess(messageAddProduct.data))

    } catch (e) {
        yield put(actions.postCreateProductAction.postCreateProductFailure)
    }
}

function* handleGetProductAction(action) {
    try {
        const listProduct = yield call(api.apiGetProduct, action.payload)
        yield put(actions.getProductAction.getProductSuccess(listProduct.data))

    } catch (e) {
        yield put(actions.getProductAction.getProductFailure)
    }
}

function* handleGetInfoProductAction(action) {
    try {
        const infoProduct = yield call(api.apiGetInfoProduct, action.payload)
        yield put(actions.getInfoProductAction.getInfoProductSuccess(infoProduct.data.data))

    } catch (e) {
        yield put(actions.getInfoProductAction.getInfoProductFailure)
    }
}

function* handlePostEditInfoProductAction(action) {
    try {
        const messagePostEditProduct = yield call(api.apiPostEditInfoProduct, action.payload)
        console.log('message', messagePostEditProduct.data);
        yield put(actions.postEditInfoProductAction.postEditInfoProductSuccess(messagePostEditProduct.data))

    } catch (e) {
        yield put(actions.postEditInfoProductAction.postEditInfoProductFailure)
    }
}

function* handlePostAddProductDetail(action) {
    try {
        const mes = yield call(api.apiPostAddProductDetail, action.payload)
        yield put(actions.postAddProductDetailAction.postAddProductDetailSuccess(mes.data))

    } catch (e) {
        yield put(actions.postAddProductDetailAction.postAddProductDetailFailure)
    }
}

function* handleGetInfoProductDetail(action) {
    try {
        const infoProductDetail = yield call(api.apiGetInfoProductDetail, action.payload)
        console.log(infoProductDetail.data);
        yield put(actions.getInfoProductDetailAction.getInfoProductDetailSuccess(infoProductDetail.data))

    } catch (e) {
        yield put(actions.getInfoProductDetailAction.getInfoProductDetailFailure)
    }
}

function* handlePostEditInfoProductDetail(action) {
    try {
        const mes = yield call(api.apiPostEditInfoProductDetail, action.payload)
        yield put(actions.postEditInfoProductDetailAction.postEditInfoProductDetailSuccess(mes.data))

    } catch (e) {
        yield put(actions.postEditInfoProductDetailAction.postEditInfoProductDetailFailure)
    }
}

function* handleGetSearchProductAction(action) {
    try {
        const listProduct = yield call(api.apiGetSearchProduct, action.payload)
        yield put(actions.getSearchProductAction.getSearchProductSuccess(listProduct.data))

    } catch (e) {
        yield put(actions.getSearchProductAction.getSearchProductFailure)
    }
}

function* handleGetSearchMemberAction(action) {
    try {
        const listMember = yield call(api.apiGetSearchMember, action.payload)
        yield put(actions.getSearchMemberAction.getSearchMemberSuccess(listMember.data))

    } catch (e) {
        yield put(actions.getSearchMemberAction.getSearchMemberFailure)
    }
}

function* handlePostAddMemberAction(action) {
    try {
        const mes = yield call(api.apiPostAddMember, action.payload)
        yield put(actions.postAddMemberAction.postAddMemberSuccess(mes.data))

    } catch (e) {
        yield put(actions.postAddMemberAction.postAddMemberFailure)
    }
}

function* mySaga() {
    yield takeLatest(actions.getListProductTypeAction.getListProductTypeRequest, handleGetListProductTypeAction)
    yield takeLatest(actions.getListProductGroupAction.getListProductGroupRequest, handleGetListProductGroupAction)
    yield takeLatest(actions.postCreateProductAction.postCreateProductRequest, handlePostCreateProductAction)
    yield takeLatest(actions.getProductAction.getProductRequest, handleGetProductAction)
    yield takeLatest(actions.getInfoProductAction.getInfoProductRequest, handleGetInfoProductAction)
    yield takeLatest(actions.postEditInfoProductAction.postEditInfoProductRequest, handlePostEditInfoProductAction)
    yield takeLatest(actions.postAddProductDetailAction.postAddProductDetailRequest, handlePostAddProductDetail)
    yield takeLatest(actions.getInfoProductDetailAction.getInfoProductDetailRequest, handleGetInfoProductDetail)
    yield takeLatest(actions.postEditInfoProductDetailAction.postEditInfoProductDetailRequest, handlePostEditInfoProductDetail)
    yield takeLatest(actions.getSearchProductAction.getSearchProductRequest, handleGetSearchProductAction)
    yield takeLatest(actions.getSearchMemberAction.getSearchMemberRequest, handleGetSearchMemberAction)
    yield takeLatest(actions.postAddMemberAction.postAddMemberRequest, handlePostAddMemberAction)

}

export default mySaga