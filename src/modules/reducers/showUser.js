const showUser = (state=null, action) => {
    switch(action.type){
        case 'SET_SHOW_USER': 
         return action.payload.value
        case 'DROP_SHOW_USER':
            return null
        default:
            return state
    }

}

export default showUser