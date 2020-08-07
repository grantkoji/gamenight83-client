const currentToken = (state=null, action) => {
    switch(action.type){
        case 'SET_CURRENT_TOKEN': 
         return action.payload.value
        default:
            return state
    }

}

export default currentToken