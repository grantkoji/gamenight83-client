let setCurrentUser = user => ({type: 'SET_CURRENT_USER', payload: {value: user}})
let setCurrentGamePhoto = photo => ({type: 'SET_CURRENT_GAME_PHOTO', payload: {value: photo}})
let setCurrentGame = gameId => ({type: 'SET_CURRENT_GAME', payload: {value: gameId}})
let setCurrentReview = review => ({type: 'SET_CURRENT_REVIEW', payload: {value: review}})
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

export {
    setCurrentToken,
    setCurrentGame,
    setCurrentUser,
    setCurrentPlayedGame,
    setCurrentGamePhoto,
    setCurrentReview,
    logoutUser, 
    fetchReviews,
    fetchUsers,
    fetchGames,
    fetchGamePhotos,
    removeCurrentToken,
    setShowUser, 
    addUser
}