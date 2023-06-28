import { getType, getInfoUserAction } from "redux/actions";
import { INIT_STATE_INFO_USER } from "redux/constants/constants";

export default function getInfoUserReducer(state = INIT_STATE_INFO_USER, action) {
    switch (action.type) {
        case getType(getInfoUserAction.getInfoUserRequest):
            return {
                ...state,
                isLoading: true,
            }
        case getType(getInfoUserAction.getInfoUserSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        case getType(getInfoUserAction.getInfoUserFailure):
            return {
                ...state,
                isLoading: false
            }
            break;
        default:
            return state
    }
}