import { getType, getSearchProductAction } from "../actions/actions"
import { INIT_STATE_SEARCH_PRODUCT } from "redux/constants/constants";

export default function getSearchProductReducer(state = INIT_STATE_SEARCH_PRODUCT, action) {
    switch (action.type) {
        case getType(getSearchProductAction.getSearchProductRequest):
            return {
                ...state,
                isLoading: true,
            }
        case getType(getSearchProductAction.getSearchProductSuccess):
            return {
                ...state,
                isLoading: true,
                data: action.payload
            }
        case getType(getSearchProductAction.getSearchProductFailure):
            return {
                ...state,
                isLoading: true
            }
            break;
        default:
            return state
    }
}