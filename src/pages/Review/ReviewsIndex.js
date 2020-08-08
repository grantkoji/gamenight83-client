import React from 'react';
import {connect} from 'react-redux'

const ReviewsIndex = props => {

 
        const {reviews} = props
        return (
            <>
                <h1>Game Reviews</h1>
                <div>
                    {  
                    reviews 
                    ? reviews.map(review => {
                        return (
                            <div>
                               <ReviewCard key={review.id} {...review}/>
                            </div>
                        )
                    })
                    : "Loading..."}
                </div>
            </>
        )
}

const mapStateToProps = state => {
    return {    
      reviews: state.reviews
    }
  }
  
  
  
  export default connect(mapStateToProps)(ReviewsIndex);
  