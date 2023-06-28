import { getType, topSmartphoneAction } from "redux/actions";
import { INIT_STATE_TOP_SMARTPHONE } from "redux/constants/constants";

export default function topSmartphoneReducer(state = INIT_STATE_TOP_SMARTPHONE, action) {
    switch (action.type) {
        case getType(topSmartphoneAction.topSmartphoneRequest):
            return {
                ...state,
                isLoading: true,
            }
        case getType(topSmartphoneAction.topSmartphoneSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        case getType(topSmartphoneAction.topSmartphoneFailure):
            return {
                ...state,
                isLoading: false
            }
            break;
        default:
            return state
    }
}