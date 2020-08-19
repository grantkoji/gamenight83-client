
import React, { useState } from 'react';
import * as action from '../../modules/actionCreators/actionCreators'
import {connect} from 'react-redux'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ReactStars from "react-rating-stars-component";

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
   
    const ratingChanged = (newRating) => {
      setNumStars(newRating);
    };
  
    // <label htmlFor="numStars">Number of Stars:</label><br/>
    // <input type="number" autoComplete="off" name="numStars" value={numStars} onChange={(e) => setNumStars(e.target.value)}/><br/>
    return (
      <div className="review-form-container">
        <form onSubmit={handleSubmit}>
          <div className='stars-on-form'>
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={18}
            />
            </div>
          <label htmlFor="content">Review Content:</label><br/>
          <input className='create-input-field' type="textarea" autoComplete="off" name="content" value={content} onChange={(e) => setContent(e.target.value)}/><br/>
          <button type="Submit">Submit</button>
        </form>
      </div>
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


