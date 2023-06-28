import { getType, getInfoProductDetailAction } from "../actions"
import { INIT_STATE_INFO_PRODUCT_DETAIL } from "../constants/constants";

export default function getInfoProductDetailReducer(state = INIT_STATE_INFO_PRODUCT_DETAIL, action) {
    switch (action.type) {
        case getType(getInfoProductDetailAction.getInfoProductDetailRequest):
            return {
                ...state,
                isLoading: true,
            }
        case getType(getInfoProductDetailAction.getInfoProductDetailSuccess):
            return {
                ...state,
                isLoading: true,
                data: action.payload
            }
        case getType(getInfoProductDetailAction.getInfoProductDetailFailure):
            return {
                ...state,
                isLoading: true
            }
            break;
        default:
            return state
    }
}