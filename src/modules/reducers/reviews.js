

const reviews = (state=[], action) => {
    switch(action.type){
        case 'FETCH_REVIEWS': 
            return action.payload.value
        case 'ADD_REVIEW':
            return [...state, action.payload.value]
        default:
            return state
    }
}

export default reviews