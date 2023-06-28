import { getType, getShowReviewAdminAction } from "redux/actions";
import { INIT_STATE_REVIEW_ADMIN } from "redux/constants/constants";

export default function getShowReviewAdminReducer(state = INIT_STATE_REVIEW_ADMIN, action) {
    switch (action.type) {
        case getType(getShowReviewAdminAction.getShowReviewAdminRequest):
            return {
                ...state,
                isLoading: true,
            }
        case getType(getShowReviewAdminAction.getShowReviewAdminSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            }
        case getType(getShowReviewAdminAction.getShowReviewAdminFailure):
            return {
                ...state,
                isLoading: false
            }
            break;
        default:
            return state
    }
}