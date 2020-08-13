
const friendshipRequests = (state=[], action) => {
    switch(action.type){
        case 'FETCH_FRIENDSHIP_REQUESTS': 
            return action.payload.value
            case 'ADD_FRIENDSHIP_REQUEST':
                return [...state, action.payload.value]
            case 'REMOVE_FRIENDSHIP_REQUEST':
                let newFR = [...state].filter(fr => fr !== action.payload.value)
                return newFR
        default:
            return state
    }
}

export default friendshipRequests

