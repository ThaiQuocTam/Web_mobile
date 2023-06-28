import { getType, getBillAction } from "redux/actions";
import { INIT_STATE_BILL } from "redux/constants/constants";

export default function getBillReducer(state = INIT_STATE_BILL, action) {
    switch (action.type) {
        case getType(getBillAction.getBillRequest):
            return {
                ...state,
                isLoading: true,
            }
        case getType(getBillAction.getBillSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        case getType(getBillAction.getBillFailure):
            return {
                ...state,
                isLoading: false
            }
            break;
        default:
            return state
    }
}