

const gamePhotos = (state=[], action) => {
    switch(action.type){
        case 'FETCH_GAME_PHOTOS':
            return action.payload.value
        case 'ADD_GAME_PHOTO':
            return [...state, action.payload.value]
        case 'ADD_PHOTO_LIKE':
            let newPhotos = state.map(photo => {
                if (photo.id === action.payload.value) {
                    photo.likes = parseInt(photo.likes) + 1
                    return photo
                } else {
                    return photo
                }
            })
            return newPhotos
        default:
            return state
    }
}

export default gamePhotos
