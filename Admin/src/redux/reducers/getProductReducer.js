import { getType, getProductAction } from "../actions/actions"
import { INIT_STATE_PRODUCT } from "redux/constants/constants";

export default function getProductReducer(state = INIT_STATE_PRODUCT, action) {
    switch (action.type) {
        case getType(getProductAction.getProductRequest):
            return {
                ...state,
                isLoading: true,
            }
        case getType(getProductAction.getProductSuccess):
            return {
                ...state,
                isLoading: true,
                data: action.payload
            }
        case getType(getProductAction.getProductFailure):
            return {
                ...state,
                isLoading: true
            }
            break;
        default:
            return state
    }
}