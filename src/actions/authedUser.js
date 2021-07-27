export const AUTHED_ID ='AUTHED_ID'

export function setAuthedUser (id){
    return{
        type:AUTHED_ID,
        id,
    }
}