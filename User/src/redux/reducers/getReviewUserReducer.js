import { getType, getShowReviewUserAction } from "redux/actions";
import { INIT_STATE_REVIEW_USER } from "redux/constants/constants";

export default function getShowReviewUserReducer(state = INIT_STATE_REVIEW_USER, action) {
    switch (action.type) {
        case getType(getShowReviewUserAction.getShowReviewUserRequest):
            return {
                ...state,
                isLoading: true,
            }
        case getType(getShowReviewUserAction.getShowReviewUserSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            }
        case getType(getShowReviewUserAction.getShowReviewUserFailure):
            return {
                ...state,
                isLoading: false
            }
            break;
        default:
            return state
    }
}