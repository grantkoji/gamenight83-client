const currentGame = (state=null, action) => {
    switch(action.type){
        case 'SET_CURRENT_GAME': 
         return action.payload.value
        default:
            return state
    }

}

export default currentGame