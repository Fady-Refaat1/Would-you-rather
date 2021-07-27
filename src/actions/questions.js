import { hideLoading, showLoading } from "react-redux-loading"
import { saveQuestion, saveQuestionAnswer } from "../utils/api"
export const RECEIVE_QUESTIONS='RECEIVE_QUESTIONS'
export const ANSWER_QUESTION ='ANSWER_QUESTION'
export const REMOVE_ANSWER_QUESTION='REMOVE_ANSWER_QUESTION'
export const ADD_QUESTION='ADD_QUESTION'
export function receiveQuestions ( questions){
    return{
        type:RECEIVE_QUESTIONS,
        questions,
    }
}


const answerQuestion =({ authedUser, qid, answer })=>{
    return{
        type : ANSWER_QUESTION,
        authedUser,
        qid, 
        answer,
    }
}

const removeAnswer=({ authedUser, qid, answer })=>{
    return{
        type : REMOVE_ANSWER_QUESTION,
        authedUser,
        qid, 
        answer,
    }
}

export function handleAnswerQuestion (info){
    return (dispatch)=>{
        dispatch(answerQuestion(info))
        saveQuestionAnswer(info)
        .catch((e)=>{
            console.warn('error in handle answer question')
            dispatch(removeAnswer(info))
            alert('try to answer again')
        })
    }
}

const addQuestion =(question)=>{
    return{
        type:ADD_QUESTION,
        question
    }
}

export function handleAddQuestion (optionOneText,optionTwoText){
    return(dispatch,getState)=>{ 
        const {authedUser} = getState();
        dispatch(showLoading())
        saveQuestion({
            optionOneText,
            optionTwoText,
            author : authedUser,
        })
        .then((question)=>dispatch(addQuestion(question)))
        .then(()=>dispatch(hideLoading()))
    }
}