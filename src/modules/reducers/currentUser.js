

const currentUser = (state=null, action) => {
    switch(action.type){
        case 'SET_CURRENT_USER': 
         return action.payload.value
        case 'LOGOUT_USER':
            return null
        default:
            return state
    }

}

export default currentUser





// case 'ADD_FRIEND_REQUEST':
//     let newFRUsers = state.map(user => {
//         if (user.id === action.payload.userReceiveId) {
//             let newUserFRReceived = user.friend_requests_received
//             newUserFRReceived.push(action.payload.userSent)
//             user.friend_requests_received = newUserFRReceived
//             return user
//         } else if (user.id === action.payload.userSent.id) {
//             let newUserFRSent = user.friend_requests_sent
//             newUserFRSent.push({
//                                 id: action.payload.frId, 
//                                 user_id: action.payload.userSent.id,
//                                 request_id: action.payload.userReceiveId})
//             user.friend_requests_sent = newUserFRSent
//             return user
//         } else {
//             return user
//         }
//     })
//     return newFRUsers
// case 'ADD_ACCEPTED_FRIENDSHIP':
//     let newFriendUsers = state.map(user => {
//         if (user.id === action.payload.user1.id) {
//             let newUser1Friends = user.total_friends
//             newUser1Friends.push(action.payload.user2)
//             user.total_friends = newUser1Friends 
//             return user
//         } else if (user.id === action.payload.user2.id) {
//             let newUser2Friends = user.total_friends
//             newUser2Friends.push(action.payload.user1)
//             user.total_friends = newUser2Friends
//             return user
//         } else {
//             return user
//         }
//     })
//     return newFriendUsers
// case 'REMOVE_FRIENDSHIP':
//     let removedFriendUsers = state.map(user => {
//         if (user.id === action.payload.user1Id) {
//             let removeFromUser1Friends = user.total_friends.filter(friend => friend.id !== action.payload.user2Id)
//             user.total_friends = removeFromUser1Friends
//             return user
//         } else if (user.id === action.payload.user2Id) {
//             let removeFromUser2Friends = user.total_friends.filter(friend => friend.id !== action.payload.user1Id)
//             user.total_friends = removeFromUser2Friends
//             return user
//         } else {
//             return user
//         }
//     })
//     return removedFriendUsers


// case 'REMOVE_FRIEND_REQUEST':
//     let removeFRUsers = state.map(user => {
//         if (user.id === action.payload.userReceiveId) {
//             let removeFromUserReceiveFR = user.friend_requests_received.filter(frUser => frUser.id !== action.payload.userSentId)
//             user.friend_requests_received = removeFromUserReceiveFR 
//             return user
//         } else if (user.id === action.payload.userSentId) {
//             let removeFromUserSentFR = user.friend_requests_sent.filter(frUser => frUser.request_id !== action.payload.userReceiveId)
//             user.friend_requests_sent = removeFromUserSentFR 
//             return user
//         } else { 
//             return user
//         }
//     })


// const currentUser = (state={}, action) => {
//     switch(action.type){
//         case 'SET_CURRENT_USER': 
//          return action.payload.value
//         case 'LOGOUT_USER':
//             return {}
//         case 'ADD_USER_SENT_FR':

//         case 'REMOVE_USER_SENT_FR':
       
//         case 'REMOVE_USER_RECEIVE_FR':

//         case 'ADD_USER_FRIENDSHIP':

//             let addUserFriendship = (userNewFriend) => ({type: 'REMOVE_USER_FRIENDSHIP', payload: {value: userNewFriend}})

//         case 'REMOVE_USER_FRIENDSHIP':
//             let newUserFriends = state.total_user_friends.filter(friend => friend.id !== action.payload.value)
//             return {...state, total_user_friends: newUserFriends}

//             let removeUserFriendship = (userRemoveId) => ({type: 'REMOVE_USER_FRIENDSHIP', payload: {value: userRemoveId}})
//         default:
//             return state
//     }

// }

// export default currentUser