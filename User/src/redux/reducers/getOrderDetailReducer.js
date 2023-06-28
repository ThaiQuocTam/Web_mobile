import { getType, getOrderDetailAction } from "redux/actions";
import { INIT_STATE_ODER_DETAIL } from "redux/constants/constants";

export default function getOrderDetailReducer(state = INIT_STATE_ODER_DETAIL, action) {
    switch (action.type) {
        case getType(getOrderDetailAction.getOrderDetailRequest):
            return {
                ...state,
                isLoading: true,
            }
        case getType(getOrderDetailAction.getOrderDetailSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        case getType(getOrderDetailAction.getOrderDetailFailure):
            return {
                ...state,
                isLoading: false
            }
            break;
        default:
            return state
    }
}