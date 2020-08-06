

const gamePhotos = (state=[], action) => {
    switch(action.type){
        case 'FETCH_GAME_PHOTOS':
            return action.payload.value
        default:
            return state
    }
}

export default gamePhotos