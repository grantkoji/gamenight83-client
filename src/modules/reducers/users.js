

const users = (state = [], action) => {
    switch(action.type){
        case 'FETCH_USERS': 
            return action.payload.value
        case 'ADD_USER':
            return [...state, action.payload.value]
        // case 'ADD_FRIENDSHIP_REQUEST':
        //     let newUsers = state.map(user => {
        //         if (user.) {
        //             user.friend_requests_received.push(action.value.payload)
        //         } else if () {

        //         } else {
        //             return user
        //         }
        //     })
        //     return [...state, action.payload.value]
        // case 'REMOVE_FRIENDSHIP_REQUEST':
        //     let newFR = state.filter(fr => fr.id !== action.payload.value)
        //     return newFR
        default:
            return state
    }
}

export default users