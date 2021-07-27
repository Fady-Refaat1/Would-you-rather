import { setAuthedUser } from "./authedUser"
import { receiveQuestions } from "./questions"
import { receiveUsers } from "./users"
import { hideLoading, showLoading } from "react-redux-loading";
import { getInitialData } from "../utils/api";
const AUTHED_ID = null
export function handleIntilData (){
    return (dispatch) =>{
        dispatch(showLoading())
        getInitialData()
        .then(({users,questions})=>{
            dispatch(receiveUsers(users))
            dispatch(receiveQuestions(questions))
            dispatch(setAuthedUser(AUTHED_ID))
            dispatch(hideLoading())
        })
    }
}