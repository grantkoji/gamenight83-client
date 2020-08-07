import React, { Component } from 'react';
import {connect} from 'react-redux'

class UsersIndex extends Component {

    render() {
        const {reviews} = this.props
        return (
            <>
                <h1>Game Reviews</h1>
                <div>
                    {  
                    reviews 
                    ? reviews.map(review => {
                        return (
                            <div>
                                <img src={review.game_photo} alt={review.game_title}/>
                                <div>Game: {review.game_title}</div>
                                <div>by {review.user_name}</div>
                                <div>{review.num_stars}</div>
                                <div>{review.content}</div>
                            </div>
                        )
                    })
                    : "Loading..."}
                </div>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {    
      users: state.users
    }
  }
  
  
  
  export default connect(mapStateToProps)(UsersIndex);
  