import { ADD_QUESTION, ANSWER_QUESTION, REMOVE_ANSWER_QUESTION } from "../actions/questions";
import { RECEIVE_USERS } from "../actions/users";


export function users (state={},action){
    switch(action.type){
        case RECEIVE_USERS :
            return {...state,...action.users}
        case ANSWER_QUESTION:{
            const {authedUser, qid, answer} = action
            return {
                ...state,
            [authedUser]: {
                ...state[authedUser],
                answers: {
                ...state[authedUser].answers,
                [qid]: answer
                }
            }
            }
        }
        // function updateVeryNestedField(state, action) {
        //     return {
        //       ...state,
        //       first: {
        //         ...state.first,
        //         second: {
        //           ...state.first.second,
        //           [action.someId]: {
        //             ...state.first.second[action.someId],
        //             fourth: action.someValue
        //           }
        //         }
        //       }
        //     }
        //   }
        case REMOVE_ANSWER_QUESTION :{
            const {authedUser, qid} = action
            return  {
                ...state,
                [authedUser] :{
                    ...state[authedUser],
                    answers: {
                        ...state[authedUser].answers,
                        [qid]: undefined
                    }
                }
            }
        }
        case ADD_QUESTION :
            const{question}= action
            return{
                ...state,
                [question.author]:{
                    ...state[question.author],
                    questions : state[question.author].questions.concat([question.id])
                }
            }
        default :
            return state
    }
}

