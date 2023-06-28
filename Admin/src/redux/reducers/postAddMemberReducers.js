import { getType, postAddMemberAction } from "../actions/actions"
import { INIT_STATE_MES_ADD_MEMBER} from "redux/constants/constants";

export default function postAddMemberReducer(state = INIT_STATE_MES_ADD_MEMBER, action) {
    switch (action.type) {
        case getType(postAddMemberAction.postAddMemberRequest):
            return {
                ...state,
                isLoading: true,
            }
        case getType(postAddMemberAction.postAddMemberSuccess):
            return {
                ...state,
                isLoading: true,
                data: action.payload
            }
        case getType(postAddMemberAction.postAddMemberFailure):
            return {
                ...state,
                isLoading: true
            }
            break;
        default:
            return state
    }
}