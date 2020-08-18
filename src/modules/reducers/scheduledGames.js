const scheduledGames = (state=[], action) => {
    switch(action.type){
        case 'FETCH_SCHEDULED_GAMES': 
            return action.payload.value
        case 'ADD_SCHEDULED_GAME':
            return [...state, action.payload.value]
        case 'UPDATE_SCHEDULED_GAME':
            let updatedGames = state.map(schedGame => {
                if (schedGame.id === action.payload.value.id) {
                    return action.payload.value
                } else {
                    return schedGame
                }
            })
            return updatedGames
        case 'REMOVE_SCHEDULED_GAME':
            let removedSGames= state.filter(schedGame => schedGame.id !== action.payload.value)
            return removedSGames
        case 'ADD_VACANCY_TO_SG':
            let vacancyAddedSGs = state.map(sg => {
                if (sg.id === action.payload.value){
                    let oldNum = sg.num_vacancies
                    sg.num_vacancies = oldNum + 1
                    return sg
                } else {
                    return sg
                }
            })
            return vacancyAddedSGs
        case 'REMOVE_VACANCY_FROM_SG':
            let vacancyRemovedSGs =  state.map(sg => {
                if (sg.id === action.payload.value){
                    let oldNum = sg.num_vacancies
                    sg.num_vacancies = oldNum - 1
                    return sg
                } else {
                    return sg
                }
            })
        return vacancyRemovedSGs
        default:
            return state
    }
}


export default scheduledGames