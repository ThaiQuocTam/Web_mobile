import { getType, getInfoProductAction } from "redux/actions";
import { INIT_STATE_INFO_PRODUCT } from "redux/constants/constants";

export default function getInfoProductReducer(state = INIT_STATE_INFO_PRODUCT, action) {
    switch (action.type) {
        case getType(getInfoProductAction.getInfoProductRequest):
            return {
                ...state,
                isLoading: true,
            }
        case getType(getInfoProductAction.getInfoProductSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        case getType(getInfoProductAction.getInfoProductFailure):
            return {
                ...state,
                isLoading: false
            }
            break;
        default:
            return state
    }
}