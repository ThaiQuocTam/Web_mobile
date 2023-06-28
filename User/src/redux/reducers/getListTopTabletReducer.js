import { getType, getListTopTabletAction } from "redux/actions";
import { INIT_STATE_LIST_TOP_TABLET } from "redux/constants/constants";

export default function getListTopTabletReducer(state = INIT_STATE_LIST_TOP_TABLET, action) {
    switch (action.type) {
        case getType(getListTopTabletAction.getListTopTabletRequest):
            return {
                ...state,
                isLoading: true,
            }
        case getType(getListTopTabletAction.getListTopTabletSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        case getType(getListTopTabletAction.getListTopTabletFailure):
            return {
                ...state,
                isLoading: false
            }
            break;
        default:
            return state
    }
}