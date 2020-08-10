
import React from 'react';
import { withRouter } from 'react-router-dom'
import * as action from '../../modules/actionCreators/actionCreators'
import {connect} from 'react-redux'
import CreateGameForm from '../../Components/Forms/CreateGameForm'
const CreateNewGame = props => {
    
 

    return (
        <div>
           <CreateGameForm />
        </div>
    )
}



const mapDispatchToProps = dispatch => {
    return {
        setCurrentGame: (gameId) => dispatch(action.setCurrentGame(gameId))
    }
  }
  
export default withRouter(connect(null, mapDispatchToProps)(CreateNewGame));
