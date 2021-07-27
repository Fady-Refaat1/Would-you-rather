import { AUTHED_ID } from "../actions/authedUser";

export function authedUser(state=null,action){
    switch(action.type){
        case AUTHED_ID:
            return action.id
        default:
        return state
    }
}