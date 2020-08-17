const scheduledGamePlayers = (state=[], action) => {
    switch(action.type){
        case 'FETCH_SCHEDULED_GAME_PLAYERS': 
            return action.payload.value
        case 'ADD_SCHEDULED_GAME_PLAYER':
            return [...state, action.payload.value]
        case 'REMOVE_SCHEDULED_GAME_PLAYER':
            let removedSGamePlayers= state.filter(schedGame => schedGame.id !== action.payload.value)
            return removedSGamePlayers
        default:
            return state
    }
}


export default scheduledGamePlayers