import { getType, postEditInfoProductAction } from "../actions/actions"
import { INIT_STATE_MESSAGE_EDIT_PRODUCT } from "redux/constants/constants";

export default function postEditInfoProductReducer(state = INIT_STATE_MESSAGE_EDIT_PRODUCT, action) {
    switch (action.type) {
        case getType(postEditInfoProductAction.postEditInfoProductRequest):
            return {
                ...state,
                isLoading: true,
            }
        case getType(postEditInfoProductAction.postEditInfoProductSuccess):
            return {
                ...state,
                isLoading: true,
                data: action.payload
            }
        case getType(postEditInfoProductAction.postEditInfoProductFailure):
            return {
                ...state,
                isLoading: true
            }
            break;
        default:
            return state
    }
}