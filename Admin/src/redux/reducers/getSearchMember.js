import { getType, getSearchMemberAction } from "../actions/actions";
import { INIT_STATE_SEARCH_MEMBER } from "redux/constants/constants";

export default function getSearchMemberReducer(state = INIT_STATE_SEARCH_MEMBER, action) {
    switch (action.type) {
        case getType(getSearchMemberAction.getSearchMemberRequest):
            return {
                ...state,
                isLoading: true,
            }
        case getType(getSearchMemberAction.getSearchMemberSuccess):
            return {
                ...state,
                isLoading: true,
                data: action.payload
            }
        case getType(getSearchMemberAction.getSearchMemberFailure):
            return {
                ...state,
                isLoading: true
            }
            break;
        default:
            return state
    }
}