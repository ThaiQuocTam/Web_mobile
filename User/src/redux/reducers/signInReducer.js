import { getType, signInAction } from "redux/actions";
import { INIT_STATE_SIGN_IN } from "redux/constants/constants";

export default function signInReducer(state = INIT_STATE_SIGN_IN, action) {
    switch (action.type) {
        case getType(signInAction.signInRequest):
            return {
                ...state,
                isLoading: true,
            }
        case getType(signInAction.signInSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        case getType(signInAction.signInFailure):
            return {
                ...state,
                isLoading: false
            }
            break;
        default:
            return state
    }
}