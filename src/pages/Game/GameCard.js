
import React from 'react';
import { withRouter } from 'react-router-dom'
import * as action from '../../modules/actionCreators/actionCreators'
import {connect} from 'react-redux'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

const GameCard = props => {
    
    const {title, description, min_age, min_num_players, max_num_players, id, setCurrentGame} = props
    
   
    const redirectToGame = () => {
        setCurrentGame(id)
        localStorage.gameId = id
        props.history.push(`/games/${id}`)
    }

//     <Col md={4}>
//     <Card>
//         <Card.Img className='images' src={props["image_url"]} alt={title} />
//         <Card.Title>{title}</Card.Title>
//         <Card.Body>
//         <div>Minimum # Players: {min_num_players}</div>
//         <div>Maximum # Players: {max_num_players}</div>
//         <div>Minimum Age: {min_age}</div>
//         <button onClick={redirectToGame}>Game: {title}</button>
//         </Card.Body>
//     </Card>
// </Col>
// overflow: hidden 
// Can have it be a certian size anything over it hid it
// min height min width
// height auto width auto
// Set min width and min height to the speific level that you want
// go to w3 schools and search for image sizing
{/* <div className="meta">
<span className="date" onClick={redirectToGame}>{game_title}</span>
</div> */}
    return (
        <div className="ui card">
            <div className="image">
                <img src={props["image_url"]} alt={title}/>
            </div>
            <div className="content">
                <a className="header" onClick={redirectToGame}>{title}</a>
            </div>
            <div className="description">
                <div>{description}</div> 
            </div>
            <div className="extra content">
                <div>Number of Players: {min_num_players} - {max_num_players} Ages: {min_age}+</div>
            </div>  
        </div>   
    )
}



const mapDispatchToProps = dispatch => {
    return {
        setCurrentGame: (gameId) => dispatch(action.setCurrentGame(gameId))
    }
  }
  
export default withRouter(connect(null, mapDispatchToProps)(GameCard));
