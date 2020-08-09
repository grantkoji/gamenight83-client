import React from 'react';
import * as action from '../../modules/actionCreators/actionCreators'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'

const UserCard= props => {

    const redirectToUserPage = () => {
        props.setShowUser(props.id)
        props.history.push(`/users/${props.id}`)
        // props.history.push(`users/${props.username.replace(/\s+/g, '')}`)
    }

    return (
        <div>
            { props["profile_url"] === "" 
            ? <img src="https://banner2.cleanpng.com/20180403/dje/kisspng-question-mark-computer-icons-clip-art-question-mark-5ac3de9116dec4.9390654415227859370937.jpg" alt="Question Mark" />
            : <img src={props["profile_url"]} alt={props.username} />
            }
            <button onClick={redirectToUserPage}>Visit {props.username}</button>
           
        </div>
    )

}

const mapDispatchToProps = dispatch => {
    return {
      setShowUser: (userId) => dispatch(action.setShowUser(userId))
    }
  }
  
  export default withRouter(connect(null, mapDispatchToProps)(UserCard));
  

