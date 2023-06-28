import { getType, getListProductTypeAction } from "../actions/actions"
import { INIT_STATE_LIST_PRODUCT_TYPE } from "redux/constants/constants";

export default function getListProductTypeReducer(state = INIT_STATE_LIST_PRODUCT_TYPE, action) {
    switch (action.type) {
        case getType(getListProductTypeAction.getListProductTypeRequest):
            return {
                ...state,
                isLoading: true,
            }
        case getType(getListProductTypeAction.getListProductTypeSuccess):
            return {
                ...state,
                isLoading: true,
                data: action.payload
            }
        case getType(getListProductTypeAction.getListProductTypeFailure):
            return {
                ...state,
                isLoading: true
            }
            break;
        default:
            return state
    }
}