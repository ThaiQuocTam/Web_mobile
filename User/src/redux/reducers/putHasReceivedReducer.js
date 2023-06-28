import { getType, putHasReceivedAction } from "redux/actions";
import { INIT_STATE_MES_HAS_RECEIVED } from "redux/constants/constants";

export default function putHasReceivedReducer(state = INIT_STATE_MES_HAS_RECEIVED, action) {
    switch (action.type) {
        case getType(putHasReceivedAction.putHasReceivedRequest):
            return {
                ...state,
                isLoading: true,
            }
        case getType(putHasReceivedAction.putHasReceivedSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        case getType(putHasReceivedAction.putHasReceivedFailure):
            return {
                ...state,
                isLoading: false
            }
            break;
        default:
            return state
    }
}