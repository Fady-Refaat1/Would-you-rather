export const tracker = (store)=>(next)=>(action)=>{
    console.group(action.type)
    console.log('Action : ',action)
    const toNext = next(action)
    console.log('New state is : ' , store.getState())
    console.groupEnd()

    return toNext;
}