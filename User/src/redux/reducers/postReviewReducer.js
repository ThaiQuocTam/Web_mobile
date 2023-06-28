import { getType, postReviewAction } from "redux/actions";
import { INIT_STATE_MESSAGE_REVIEW } from "redux/constants/constants";

export default function postReviewReducer(state = INIT_STATE_MESSAGE_REVIEW, action) {
    switch (action.type) {
        case getType(postReviewAction.postReviewRequest):
            return {
                ...state,
                isLoading: true,
            }
        case getType(postReviewAction.postReviewSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        case getType(postReviewAction.postReviewFailure):
            return {
                ...state,
                isLoading: false
            }
            break;
        default:
            return state
    }
}