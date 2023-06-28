import { getType, getListProductGroupAction } from "../actions"
import { INIT_STATE_LIST_PRODUCT_GROUP } from "../constants/constants";

export default function getListProductGroupReducer(state = INIT_STATE_LIST_PRODUCT_GROUP, action) {
    switch (action.type) {
        case getType(getListProductGroupAction.getListProductGroupRequest):
            return {
                ...state,
                isLoading: true,
            }
        case getType(getListProductGroupAction.getListProductGroupSuccess):
            return {
                ...state,
                isLoading: true,
                data: action.payload
            }
        case getType(getListProductGroupAction.getListProductGroupFailure):
            return {
                ...state,
                isLoading: true
            }
            break;
        default:
            return state
    }
}