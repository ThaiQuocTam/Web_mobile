import { getType, getListSmartphoneAction } from "redux/actions";
import { INIT_STATE_LIST_SMARTPHONE } from "redux/constants/constants";

export default function getListSmartphoneReducer(state = INIT_STATE_LIST_SMARTPHONE, action) {
    switch (action.type) {
        case getType(getListSmartphoneAction.getListSmartphoneRequest):
            return {
                ...state,
                isLoading: true,
            }
        case getType(getListSmartphoneAction.getListSmartphoneSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        case getType(getListSmartphoneAction.getListSmartphoneFailure):
            return {
                ...state,
                isLoading: false
            }
            break;
        default:
            return state
    }
}