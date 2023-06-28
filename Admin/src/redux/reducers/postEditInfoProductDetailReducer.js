import { getType, postEditInfoProductDetailAction } from "../actions/actions"
import { INIT_STATE_MES_EDIT_INFO_PRODUCT_DETAIL } from "redux/constants/constants";

export default function postEditInfoProductDetailReducer(state = INIT_STATE_MES_EDIT_INFO_PRODUCT_DETAIL, action) {
    switch (action.type) {
        case getType(postEditInfoProductDetailAction.postEditInfoProductDetailRequest):
            return {
                ...state,
                isLoading: true,
            }
        case getType(postEditInfoProductDetailAction.postEditInfoProductDetailSuccess):
            return {
                ...state,
                isLoading: true,
                data: action.payload
            }
        case getType(postEditInfoProductDetailAction.postEditInfoProductDetailFailure):
            return {
                ...state,
                isLoading: true
            }
            break;
        default:
            return state
    }
}