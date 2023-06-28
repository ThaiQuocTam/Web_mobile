import { getType, postAddProductDetailAction } from "../actions/actions"
import { INIT_STATE_MES_ADD_PRODUCT_DETAIL } from "redux/constants/constants";

export default function postAddProductDetailReducer(state = INIT_STATE_MES_ADD_PRODUCT_DETAIL, action) {
    switch (action.type) {
        case getType(postAddProductDetailAction.postAddProductDetailRequest):
            return {
                ...state,
                isLoading: true,
            }
        case getType(postAddProductDetailAction.postAddProductDetailSuccess):
            return {
                ...state,
                isLoading: true,
                data: action.payload
            }
        case getType(postAddProductDetailAction.postAddProductDetailFailure):
            return {
                ...state,
                isLoading: true
            }
            break;
        default:
            return state
    }
}