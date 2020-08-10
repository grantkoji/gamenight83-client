
import React, { useState } from 'react';
import * as action from '../../modules/actionCreators/actionCreators'
import {connect} from 'react-redux'

const GamePageReviewForm = props => {
    const [token, currentGame] = props
    let [numStars, setNumStars] = useState(0);
    let [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    handleLoginSubmit()
  }

    const handleLoginSubmit = () => {
    fetch("http://localhost:3001/api/v1/reviews", {
        method: "POST",
        headers: {
        "content-type": "application/json",
        "Authorization": token
        },
        body: JSON.stringify({
        game_id: currentGame,
        num_stars: parseInt(numStars),
        content: content
        })
    })
    .then(r => r.json())
    .then(resp => handleResponse(resp))
    }

    const handleResponse = (resp) => {
    if (resp.message) {
        alert(resp.message)
    } else {
        
        setNumStars(0)
        setContent('')
        alert("Thank you for posting your review!")
        // props.history.push(`users/${resp.user.id}`)
        // props.history.push(`users/${resp.user.username.replace(/\s+/g, '')}`)
    }
    }
  

    return (
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label htmlFor="numStars">Number of Stars:</label>
        <input type="number" autoComplete="off" name="numStars" value={numStars} onChange={(e) => setNumStars(e.target.value)}/>
        <label htmlFor="password">Password:</label>
        <input type="content" autoComplete="off" name="content" value={content} onChange={(e) => setContent(e.target.value)}/>
        <button type="Submit">Submit</button>
      </form>
    );
  

}

const mapStateToProps = state => {
  return {
    token: state.token,
    currentGame: state.currentGame
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: (user) => dispatch(action.setCurrentUser(user)),
    setCurrentToken: (token) => dispatch(action.setCurrentToken(token)),
    setShowUser: (userId) => dispatch(action.setShowUser(userId)),
    addReview
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePageReviewForm);


