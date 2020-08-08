const currentToken = (state=null, action) => {
    switch(action.type){
        case 'SET_CURRENT_TOKEN': 
         return action.payload.value
        case 'REMOVE_CURRENT_TOKEN': 
         return null
        default:
            return state
    }

}

export default currentToken