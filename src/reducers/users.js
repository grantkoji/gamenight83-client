

const users = (state = [], action) => {
    switch(action.type){
        case 'FETCH_USERS': 
            return action.payload.value
        default:
            return state
    }
}

export default users