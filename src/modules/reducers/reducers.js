import games from './games'
import currentUser from './currentUser'
import reviews from './reviews'
import gamePhotos from './gamePhotos'
import users from './users'
import currentToken from './currentToken'
import showUser from './showUser'
import currentGame from './currentGame'

import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    games,
    users,
    currentUser,
    reviews,
    gamePhotos,
    token: currentToken,
    showUser,
    currentGame
})

export default rootReducer