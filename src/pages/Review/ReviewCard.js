import React, {useState} from 'react';
import * as action from '../../modules/actionCreators/actionCreators'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import ReactStars from 'react-rating-stars-component'


const ReviewCard = props => {
    
    // let [toggleFront, setToggleFront] = useState(true);
    const {game_photo, game_title, user_name, num_stars, content, id, user_id, game_id} = props

    // const renderFront = () => {
    //     return (
    //         <div onClick={() => setToggleFront(prevtoggleFront => !prevtoggleFront)}>
    //             <img src={game_photo} alt={game_title}/>
    //             <div>by: {user_name}</div>
    //             <div>{num_stars}</div>
    //         </div>
    //     )

    // }

    const redirectToGame = () => {
        props.setCurrentGame(game_id)
        localStorage.gameId = game_id
        props.history.push(`/games/${game_id}`)
    }

    const redirectToUser = () => {
        props.setShowUser(user_id)
        // props.history.push(`/users/${user_id}`)
        props.history.push(`/users/${user_name.replace(/\s+/g, '')}`)
    }

     const changePointer = (e) => {  
      e.target.style.cursor = 'pointer'
    }

  

    return (
        <div className="ui card" style={{height: "100%"}}>  
            <div className="content">
                <a className="header" onClick={redirectToGame}>{game_title}
                    <div class="right floated author">
                        <img class="ui avatar image" src={game_photo} alt={game_title}/>
                    </div>
                </a>
                <span className="date" onClick={redirectToUser} onMouseOver={changePointer}>by {user_name}</span>
            </div> 
            <div className="description">
                <div style={{padding: '10px'}}>{content}</div>
            </div>
            <div className="extra content">
                <ReactStars className="reStar" count={5} value={num_stars} size={18}/>

            </div>  
        </div>   
    )  
}

const mapDispatchToProps = dispatch => {
    return {
      setShowUser: (userId) => dispatch(action.setShowUser(userId)),
      setCurrentGame: (gameId) => dispatch(action.setCurrentGame(gameId))
    }
  }
  
  export default withRouter(connect(null, mapDispatchToProps)(ReviewCard));




{/* <div className="ui card">
        //     <div className="image">
        //         <img src={game_photo} alt={game_title}/>
        //     </div>
        //     <div className="content">
        //         <a className="header" onClick={redirectToGame}>{game_title}</a>
        //         <span className="date" onClick={redirectToUser}>by {user_name}</span>
        //     </div> 
        //     <div className="description">
        //         <div>{content}</div>
        //     </div>
        //     <div className="extra content">
        //         <ReactStars className="reStar" count={5} value={num_stars} size={18}/>
        //     </div>  
        // </div>    */}
    // <div class="extra content">
    // <div class="right floated author">
    //   <img class="ui avatar image" src="/images/avatar/small/matt.jpg"> Matt
    // </div>

//     <div className="image">
//     <img src={game_photo} alt={game_title}/>
// </div>
