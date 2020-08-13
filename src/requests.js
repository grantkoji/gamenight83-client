

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

export const fetchRemoveFriendshipRequest = (id) => fetch(`${friendshipRequestsURL}/${id}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    }
    })
    .catch(catchError)

export const fetchRemoveFriendship = (id) => fetch(`${friendshipsURL}/${id}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    }
    })
    .catch(catchError)

export const fetchPostAddFriendship = (user_id, token) => fetch(friendshipsURL, {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        "Authorization": token
    },
    body: JSON.stringify({
        user_id: user_id
    })

})
.then(parseData)
.catch(catchError)

export const fetchPostAddFRequest = (token, request_id) => fetch(friendshipRequestsURL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        "Authorization": token
    },
    body: JSON.stringify({
        request_id: request_id
    })

})
.then(parseData)
.catch(catchError)
