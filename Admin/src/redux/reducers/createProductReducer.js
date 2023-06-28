import { getType, postCreateProductAction } from "../actions/actions"
import { INIT_STATE_MESSAGE } from "redux/constants/constants";

export default function postCreateProductReducer(state = INIT_STATE_MESSAGE, action) {
    switch (action.type) {
        case getType(postCreateProductAction.postCreateProductRequest):
            return {
                ...state,
                isLoading: true,
            }
        case getType(postCreateProductAction.postCreateProductSuccess):
            return {
                ...state,
                isLoading: true,
                data: action.payload
            }
        case getType(postCreateProductAction.postCreateProductFailure):
            return {
                ...state,
                isLoading: true
            }
            break;
        default:
            return state
    }
}