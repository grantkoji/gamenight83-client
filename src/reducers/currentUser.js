

const currentUser = (state={}, action) => {
    switch(action.type){
        case 'SET_CURRENT_USER': 
         return action.payload.value
        case 'LOGOUT_USER':
            return {}
        default:
            return state
    }

}

export default currentUser