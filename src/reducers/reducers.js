import fetchIndexesReducer from './fetchIndexesReducer'
import setCurrentReducer from './setCurrentReducer'


import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    fetchIndexesReducer,
    setCurrentReducer

})

export default rootReducer