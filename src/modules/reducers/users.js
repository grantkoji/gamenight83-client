

const users = (state = [], action) => {
    switch(action.type){
        case 'FETCH_USERS': 
            return action.payload.value
        case 'ADD_USER':
            return [...state, action.payload.value]
        case 'ADD_FRIEND_REQUEST_RECEIVED'
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

let addFriendRequest = (frId, userReceive, userSent) => ({type: 'ADD_FRIEND_REQUEST', payload: {frId: frId, userReceive: userReceive, userSent: userSent}})
// let addFriendRequestSent = (frId, user) => ({type: 'ADD_FRIEND_REQUEST_SENT', payload: {frId: frId, user_id: user_id}})
// let removeFriendRequestReceived = (frId, user_id) => ({type: 'REMOVE_FRIEND_REQUEST_RECEIVED', payload: {frId: frId, user_id: user_id}})
let removeFriendRequest = (frId, userReceiveId, userSentId) => ({type: 'REMOVE_FRIEND_REQUEST', payload: {frId: frId, user_id: user_id}})
let addFriendshipTwoUsers = (user1, user2) => ({type: 'ADD_ACCEPTED_FRIENDSHIP', payload: {user1: user1, user2: user2}})
let removeFriendshipTwoUsers = (user1, user2) => ({type: 'REMOVE_FRIENDSHIP', payload: {user1: user1, user2: user2}})

export default users