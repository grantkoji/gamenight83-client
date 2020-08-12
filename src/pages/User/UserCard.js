import React from 'react';
import * as action from '../../modules/actionCreators/actionCreators'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'

const UserCard= props => {

    const redirectToUserPage = () => {
        props.setShowUser(props.id)
        // props.history.push(`/users/${props.id}`)
        props.history.push(`/users/${props.username.replace(/\s+/g, '')}`)
    }

{/* <div className="extra content">
     <button onClick={addLike}>❤️ {likes}</button>
     </div>   */}

   

    return (
        <div class="ui card">
            <div className="image">
                { props["profile_url"] === "" 
                ? <img src="https://banner2.cleanpng.com/20180403/dje/kisspng-question-mark-computer-icons-clip-art-question-mark-5ac3de9116dec4.9390654415227859370937.jpg" alt="Question Mark" />
                : <img src={props["profile_url"]} alt={props.username} />
                }
            </div>
            <div className="content">
                <a className="header" onClick={redirectToUserPage}>{props.username}</a>
            </div>  
            <div className="description">
                <div>Favorite Games: {props.fav_games}</div>
            </div>
        </div>   
    )
}

const mapDispatchToProps = dispatch => {
    return {
      setShowUser: (userId) => dispatch(action.setShowUser(userId))
    }
  }
  
  export default withRouter(connect(null, mapDispatchToProps)(UserCard));
  

