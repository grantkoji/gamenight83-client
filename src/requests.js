

const localHost = 'http://localhost:3001'
const gamesURL = `${localHost}/games`
const reviewsURL = `${localHost}/reviews`
const usersURL = `${localHost}/users`
const gamePhotosURL = `${localHost}/game_photos`
const friendshipsURL = `${localHost}/friendships`
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



