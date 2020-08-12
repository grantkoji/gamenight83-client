

const localHost = 'http://localhost:3001/api/v1'
const gamesURL = `${localHost}/games`
const reviewsURL = `${localHost}/reviews`
const usersURL = `${localHost}/users`
const gamePhotosURL = `${localHost}/game_photos`
const friendshipsURL = `${localHost}/friendships`
const friendshipRequestsURL = `${localHost}/friendship_requests`
const playedGamesURL = `${localHost}/played_games`
// parse incoming data
const parseData = response => response.json()
// error handler
const catchError = error => console.log(`%c${error}`, 'color: red;')

//////////////////////////////////////////////////////
export const fetchAllGames = () => fetch(gamesURL)
.then(parseData)
.catch(catchError)

export const fetchAllUsers = () => fetch(usersURL)
.then(parseData)
.catch(catchError)

export const fetchAllReviews = () => fetch(reviewsURL)
.then(parseData)
.catch(catchError)

// Fetch all Game Photos
export const fetchAllGamePhotos = () => fetch(gamePhotosURL)
.then(parseData)
.catch(catchError)


export const fetchAllFriendshipRequests = () => fetch(friendshipRequestsURL)
.then(parseData)
.catch(catchError)


export const fetchAllFriendships = () => fetch(friendshipsURL)
.then(parseData)
.catch(catchError)