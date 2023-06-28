import { getType, signUpAction } from "redux/actions";
import { INIT_STATE_SIGN_UP } from "redux/constants/constants";

export default function signUpReducer(state = INIT_STATE_SIGN_UP, action) {
    switch (action.type) {
        case getType(signUpAction.signUpRequest):
            return {
                ...state,
                isLoading: true,
            }
        case getType(signUpAction.signUpSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        case getType(signUpAction.signUpFailure):
            return {
                ...state,
                isLoading: false
            }
            break;
        default:
            return state
    }
}