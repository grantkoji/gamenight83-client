
import React, { useState } from 'react';
import * as action from '../../modules/actionCreators/actionCreators'
import {connect} from 'react-redux'

const AddReviewForm = props => {
    const {token, thisGame} = props
    let [numStars, setNumStars] = useState(0);
    let [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    handleReviewPostFetch()
  }

    const handleReviewPostFetch = () => {
      fetch("http://localhost:3001/api/v1/reviews", {
          method: "POST",
          headers: {
          "content-type": "application/json",
          "Authorization": token
          },
          body: JSON.stringify({
          game_id: thisGame,
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
        props.addReview(resp)
        setNumStars(0)
        setContent('')
        alert("Thank you for posting your review!")
      }
    }
  

    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="numStars">Number of Stars:</label>
        <input type="number" autoComplete="off" name="numStars" value={numStars} onChange={(e) => setNumStars(e.target.value)}/>
        <label htmlFor="content">Review Content:</label>
        <input type="textarea" autoComplete="off" name="content" value={content} onChange={(e) => setContent(e.target.value)}/>
        <button type="Submit">Submit</button>
      </form>
    );
  

}

const mapStateToProps = state => {
  return {
    token: state.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addReview: (review) => dispatch(action.addReview(review))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddReviewForm);


