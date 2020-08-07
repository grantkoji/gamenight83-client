

// const initialState = {
//     currentUser: {},
//     currentGamePhoto: {},
//     currentGame: {},
//     currentReview: {},
//     currentPlayedGame: {}
// }

// const setCurrentReducer = (prevState=initialState, action) => {
//     switch(action.type){
//         case 'SET_CURRENT_USER': 
//          return {...prevState, currentUser: action.payload.value}
//         case 'SET_CURRENT_GAME_PHOTO': 
//          return {...prevState, currentGamePhoto: action.payload.value}
//         case 'SET_CURRENT_GAME': 
//          return {...prevState, currentGame: action.payload.value}
//         case 'SET_CURRENT_REVIEW': 
//          return {...prevState, currentReview: action.payload.value}
//         case 'SET_CURRENT_PLAYED_GAME': 
//          return {...prevState, currentPlayedGame: action.payload.value}
//         case 'LOGOUT_USER':
//             return {...prevState, currentUser: {}}
//         default:
//             return prevState
//     }

// }

// export default setCurrentReducer