let setCurrentUser = user => ({type: 'SET_CURRENT_USER', payload: {value: user}})
let setCurrentGame = gameId => ({type: 'SET_CURRENT_GAME', payload: {value: gameId}})
let setCurrentPlayedGame = playedGame => ({type: 'SET_CURRENT_PLAYED_GAME', payload: {value: playedGame}})
let logoutUser = () => ({type: 'LOGOUT_USER'})
let fetchReviews = reviews => ({type: 'FETCH_REVIEWS', payload: {value: reviews}})
let fetchUsers = users => ({type: 'FETCH_USERS', payload: {value: users}})
let fetchGames = games => ({type: 'FETCH_GAMES', payload: {value: games}})
let fetchGamePhotos = gamePhotos => ({type: 'FETCH_GAME_PHOTOS', payload: {value: gamePhotos}})
let setCurrentToken = token => ({type: 'SET_CURRENT_TOKEN', payload: {value: token}})
let removeCurrentToken = () => ({type: 'REMOVE_CURRENT_TOKEN'})
let setShowUser = (userId) => ({type: 'SET_SHOW_USER', payload: {value: userId}})
let addUser = user => ({type: 'ADD_USER', payload: {value: user}})
let addReview = review => ({type: 'ADD_REVIEW', payload: {value: review}})
let addGamePhoto = photo => ({type: 'ADD_GAME_PHOTO', payload: {value: photo}})
let addPhotoLike = photoId => ({type: 'ADD_PHOTO_LIKE', payload: {value: photoId}})
let addGame = game => ({type: 'ADD_NEW_GAME', payload: {value: game}})
let fetchFriendshipRequests = fr => ({type: 'FETCH_FRIENDSHIP_REQUESTS', payload: {value: fr}})
let fetchFriendships = friendships => ({type: 'FETCH_FRIENDSHIPS', payload: {value: friendships}})
// let addFriendshipRequest = fr => ({type: 'ADD_FRIENDSHIP_REQUEST', payload: {value: fr}})
// let addFriendship = friendship => ({type: 'ADD_FRIENDSHIP', payload: {value: friendship}})
// let removeFriendshipRequest = frId => ({type: 'REMOVE_FRIENDSHIP_REQUEST', payload: {value: frId}})
let addFriendRequest = (frId, userReceiveId, userSentId) => ({type: 'ADD_FRIEND_REQUEST', payload: {frId: frId, userReceiveId: userReceiveId, userSentId: userSentId}})
// let addFriendRequestSent = (frId, user) => ({type: 'ADD_FRIEND_REQUEST_SENT', payload: {frId: frId, user_id: user_id}})
// let removeFriendRequestReceived = (frId, user_id) => ({type: 'REMOVE_FRIEND_REQUEST_RECEIVED', payload: {frId: frId, user_id: user_id}})
let removeFriendRequest = (userReceiveId, userSentId) => ({type: 'REMOVE_FRIEND_REQUEST', payload: {userReceiveId: userReceiveId, userSentId: userSentId}})
let addFriendshipTwoUsers = (user1, user2) => ({type: 'ADD_ACCEPTED_FRIENDSHIP', payload: {user1: user1, user2: user2}})
let removeFriendshipTwoUsers = (user1Id, user2Id) => ({type: 'REMOVE_FRIENDSHIP', payload: {user1Id: user1Id, user2Id: user2Id}})
let fetchScheduledGames = (scheduledGames) => ({type: 'FETCH_SCHEDULED_GAMES', payload: {value: scheduledGames}})
let fetchScheduledGamePlayers = (scheduledGamePlayers) => ({type: 'FETCH_SCHEDULED_GAME_PLAYERS', payload: {value: scheduledGamePlayers}})
let addScheduledGame = (scheduledGame) => ({type: 'ADD_SCHEDULED_GAME', payload: {value: scheduledGame}})
let addScheduledGamePlayer = (scheduledGamePlayer) => ({type: 'ADD_SCHEDULED_GAME_PLAYER', payload: {value: scheduledGamePlayer}})
let updateScheduledGame = (scheduledGame) => ({type: 'UPDATE_SCHEDULED_GAME', payload: {value: scheduledGame}})
let removeScheduledGame = (scheduledGameId) => ({type: 'REMOVE_SCHEDULED_GAME', payload: {value: scheduledGameId}})
let removeScheduledGamePlayer = (scheduledGamePlayerId) => ({type: 'REMOVE_SCHEDULED_GAME_PLAYER', payload: {value: scheduledGamePlayerId}})
let addVacancyToScheduledGame = (sg) => ({type: 'ADD_VACANCY_TO_SG', payload: {value: sg}})
let removeVacancyFromScheduledGame= (sg) => ({type: 'REMOVE_VACANCY_FROM_SG', payload: {value: sg}})
export {
    setCurrentToken,
    setCurrentGame,
    setCurrentUser,
    setCurrentPlayedGame,
    logoutUser, 
    fetchReviews,
    fetchUsers,
    fetchGames,
    fetchGamePhotos,
    fetchFriendshipRequests,
    fetchFriendships,
    removeCurrentToken,
    setShowUser, 
    addUser, 
    addReview,
    addGamePhoto,
    addPhotoLike,
    addGame,
    // addFriendshipRequest,
    // removeFriendshipRequest,
    // addFriendship
    addFriendRequest,
    removeFriendRequest,
    addFriendshipTwoUsers,
    removeFriendshipTwoUsers,
    fetchScheduledGames,
    addScheduledGame,
    updateScheduledGame,
    removeScheduledGame,
    fetchScheduledGamePlayers,
    addScheduledGamePlayer,
    removeScheduledGamePlayer,
    addVacancyToScheduledGame,
    removeVacancyFromScheduledGame
}