
const friendshipRequests = (state=[], action) => {
    switch(action.type){
        case 'FETCH_FRIENDSHIP_REQUESTS': 
            return action.payload.value
            case 'ADD_FRIENDSHIP_REQUEST':
                return [...state, action.payload.value]
        default:
            return state
    }
}

export default friendshipRequests

