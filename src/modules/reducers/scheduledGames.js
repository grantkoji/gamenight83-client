const scheduledGames = (state=[], action) => {
    switch(action.type){
        case 'FETCH_SCHEDULED_GAMES': 
            return action.payload.value
        case 'ADD_SCHEDULED_GAME':
            return [...state, action.payload.value]
        case 'UPDATE_SCHEDULED_GAME':
            let updatedGames = state.map(schedGame => {
                if (schedGame.id === action.payload.value.id) {
                    return action.payload.value
                } else {
                    return schedGame
                }
            })
            return updatedGames
        case 'REMOVE_SCHEDULED_GAME':
            let removedSGames= state.filter(schedGame => schedGame.id !== action.payload.value)
            return removedSGames
        default:
            return state
    }
}


export default scheduledGames