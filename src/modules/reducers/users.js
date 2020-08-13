
// "friend_requests_received": [
//     {
//     "id": 53,
//     "name": "Bob",
//     "username": "QueenOfSheep",
//     "password_digest": "$2a$12$FmMRmP2hY.hQk1o7UT1R9OkPd.WgJGem4LxqUFLGjWEyVYkeQwh3K",
//     "age": 30,
//     "fav_games": "Catan, Poker",
//     "profile_url": "https://www.sportsmednorth.com/sites/sportsmednorthV2/files/styles/profile_photo/public/physicians/robert-c-spang-iii-md.jpg?itok=3oSiiE9D"
//     }
//     ]
//     },
//     "friend_requests_sent": [
//         {
//         "id": 2,
//         "user_id": 53,
//         "request_id": 66
//         },
//user_id is same as the person who sent it
//request_id is id of person who is receving
const users = (state = [], action) => {
    switch(action.type){
        case 'FETCH_USERS': 
            return action.payload.value
        case 'ADD_USER':
            return [...state, action.payload.value]
        case 'ADD_FRIEND_REQUEST':
            let newFRUsers = state.map(user => {
                if (user.id === action.payload.userSentId || user.id === action.payload.userReceiveId) {
                    let newUserFRSent = user.friend_requests_sent
                    newUserFRSent.push({
                                        id: action.payload.frId, 
                                        user_id: action.payload.userSentId,
                                        request_id: action.payload.userReceiveId})
                    user.friend_requests_sent = newUserFRSent
                    return user
                } else {
                    return user
                }
            })
            return newFRUsers
        case 'ADD_ACCEPTED_FRIENDSHIP':
            let newFriendUsers = state.map(user => {
                if (user.id === action.payload.user1.id) {
                    let newUser1Friends = user.total_friends
                    newUser1Friends.push(action.payload.user2)
                    user.total_friends = newUser1Friends 
                    return user
                } else if (user.id === action.payload.user2.id) {
                    let newUser2Friends = user.total_friends
                    newUser2Friends.push(action.payload.user1)
                    user.total_friends = newUser2Friends
                    return user
                } else {
                    return user
                }
            })
            return newFriendUsers
        case 'REMOVE_FRIENDSHIP':
            let removedFriendUsers = state.map(user => {
                if (user.id === action.payload.user1Id) {
                    let removeFromUser1Friends = user.total_friends.filter(friend => friend.id !== action.payload.user2Id)
                    user.total_friends = removeFromUser1Friends
                    return user
                } else if (user.id === action.payload.user2Id) {
                    let removeFromUser2Friends = user.total_friends.filter(friend => friend.id !== action.payload.user1Id)
                    user.total_friends = removeFromUser2Friends
                    return user
                } else {
                    return user
                }
            })
            return removedFriendUsers

    
        case 'REMOVE_FRIEND_REQUEST':
            let removeFRUsers = state.map(user => {
                if (user.id === action.payload.userReceiveId) {
                    let removeFromUserReceiveFR = user.friend_requests_received.filter(frUser => frUser.id !== action.payload.userSentId)
                    user.friend_requests_received = removeFromUserReceiveFR 
                    return user
                } else if (user.id === action.payload.userSentId) {
                    let removeFromUserSentFR = user.friend_requests_sent.filter(frUser => frUser.request_id !== action.payload.userReceiveId)
                    user.friend_requests_sent = removeFromUserSentFR 
                    return user
                } else { 
                    return user
                }
            })
            return removeFRUsers
        default:
            return state
    }
}

export default users