import { getType, postPaymentAction } from "redux/actions";
import { INIT_STATE_PAYMENT } from "redux/constants/constants";

export default function postPaymentReducer(state = INIT_STATE_PAYMENT, action) {
    switch (action.type) {
        case getType(postPaymentAction.postPaymentRequest):
            return {
                ...state,
                isLoading: true,
            }
        case getType(postPaymentAction.postPaymentSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        case getType(postPaymentAction.postPaymentFailure):
            return {
                ...state,
                isLoading: false
            }
            break;
        default:
            return state
    }
}

