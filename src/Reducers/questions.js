import { ADD_QUESTION, ANSWER_QUESTION, RECEIVE_QUESTIONS, REMOVE_ANSWER_QUESTION } from "../actions/questions";

export function questions(state={},action){
    switch(action.type){
        case RECEIVE_QUESTIONS :
            return {...state,...action.questions}
        case ANSWER_QUESTION : 
            return {
                ...state,
                [action.qid]:{
                    ...state[action.qid] , //question
                    [action.answer]:{ 
                        ...state[action.qid][action.answer],
                        votes : state[action.qid][action.answer].votes.concat([action.authedUser])
                    }
                }
            };
        
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
            const {authedUser, qid, answer} = action
            return {
                ...state,
                [qid]:{
                    ...state[qid] , //question
                    [answer]:{ 
                        ...state[qid][answer],
                        votes : state[qid][answer].votes.filter((user)=>{user === authedUser})
                    }
                }
            }
        }
        case ADD_QUESTION :
            const {question} = action
            return {
                ...state ,
                [question.id]: question
            }
        default :
        return state
    }
}