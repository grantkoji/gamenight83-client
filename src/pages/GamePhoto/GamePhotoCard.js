import React, {useState} from 'react';
import * as action from '../../modules/actionCreators/actionCreators'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'

const GamePhotoCard = props => {
    // let [toggleFront, setToggleFront] = useState(true);
    const {id, game_title, user_name, user_id, game_id, caption, likes, addPhotoLike} = props
    


    const addLike = () => {
        handleGamePatchFetch()
       
    }

    const handleGamePatchFetch = () => {
        fetch(`http://localhost:3001/api/v1/game_photos/${id}`, {
            method: "PATCH",
            headers: {
            "content-type": "application/json"
            },
            body: JSON.stringify({
            likes: parseInt(likes) + 1
            })
        })
        .then(r => r.json())
        .then(resp => handleResponse(resp))
      }
  
      const handleResponse = (resp) => {
        if (resp.message) {
          alert(resp.message)
        } else {
            addPhotoLike(id)
        }
      }
  


    const redirectToGame = () => {
        props.setCurrentGame(game_id)
        localStorage.gameId = game_id
        props.history.push(`/games/${game_id}`)
    }

    const redirectToUser = () => {
        props.setShowUser(props.user_id)
        // props.history.push(`/users/${props.user_id}`)
        props.history.push(`/users/${user_name.replace(/\s+/g, '')}`)
    }

    const changePointer = (e) => {  
        e.target.style.cursor = 'pointer'
      }

        return (  
            <div class="ui card" style={{height: "100%"}}>
                <div className='div-of-photo'>
                 <img src={props["image_url"]} className="image game-photo-image" alt={game_title} />
                </div>
                <div className="content">
                    <a className="header" onClick={redirectToUser}><span className='font-family-user-gp'>{user_name}</span></a>
                    <div className="meta">
                        <span className="date font-family" onClick={redirectToGame} onMouseOver={changePointer}>{game_title}</span>
                    </div>
                </div>
                 
                 <div className="description">
                    <div className='caption-text'>{caption}</div>
                 </div>
                <div className="extra content">
                 <button onClick={addLike}>❤️ {likes}</button>
                 </div>  
            </div>   
        )
    



}


const mapDispatchToProps = dispatch => {
    return {
      setShowUser: (userId) => dispatch(action.setShowUser(userId)),
      setCurrentGame: (gameId) => dispatch(action.setCurrentGame(gameId)),
      addPhotoLike: (photoId) => dispatch(action.addPhotoLike(photoId))
      
    }
  }
  
  export default withRouter(connect(null, mapDispatchToProps)(GamePhotoCard));


