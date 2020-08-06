const initialState = {
    reviews: [],
    users: [],
    games: [],
    gamePhotos: []
}

const fetchIndexesReducer = (prevState=initialState, action) => {
    switch(action.type){
        case 'FETCH_REVIEWS': 
            return {...prevState, reviews: action.payload.value};
        case 'FETCH_USERS': 
            return {...prevState, users: action.payload.value};
        case 'FETCH_GAMES': 
            return {...prevState, games: action.payload.value};
        case 'FETCH_GAME_PHOTOS':
            return {...prevState, gamePhotos: action.payload.value};
        default:
            return prevState
    }
}

export default fetchIndexesReducer

