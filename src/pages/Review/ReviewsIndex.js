import React, {useState} from 'react';
import {connect} from 'react-redux'
import ReviewCard from './ReviewCard'
import SearchBarReviews from '../../Components/SearchBars/SearchBarReviews'
import FilterReviewsByStars from '../../Components/Filters/FilterReviewsByStars'

const ReviewsIndex = props => {

 
        const {reviews} = props
        let [search, setSearch] = useState('')
        let [searchType, setSearchType] = useState('gameTitle')
        let [typeMinStars, setTypeMinStars] = useState('noMinStars')
        let [typeMaxStars, setTypeMaxStars] = useState('noMaxStars')
    

    
        let filteredReviews = () => {
            if (reviews) {
                let reviewsFiltered = [...reviews]
                if (searchType === 'username') {
                    reviewsFiltered = reviewsFiltered.filter(review => review.user_name.toLowerCase().includes(search.toLowerCase()))
                } else if (searchType === 'gameTitle') {
                    reviewsFiltered = reviewsFiltered.filter(review => review.game_title.toLowerCase().includes(search.toLowerCase()))
                } else if (searchType === 'content') {
                    reviewsFiltered = reviewsFiltered.filter(review => review.content.toLowerCase().includes(search.toLowerCase()))
                } else if (searchType === 'gameCategory') {
                    reviewsFiltered = reviewsFiltered.filter(review => review.game_category.toLowerCase().includes(search.toLowerCase()))
                }
                if (typeMinStars !== 'noMinStars') {
                    reviewsFiltered = reviewsFiltered.filter(review => parseInt(review.num_stars) >= parseInt(typeMinStars))
                }
                if (typeMaxStars !== 'noMaxStars') {
                    reviewsFiltered = reviewsFiltered.filter(review => parseInt(review.num_stars) <= parseInt(typeMaxStars))
                }
                return reviewsFiltered
            } 
        }
        return (
            <>
                <h1>Game Reviews</h1>
                <div>
                    <SearchBarReviews search={search} searchType={searchType} setSearch={setSearch} setSearchType={setSearchType}/>
                </div>
                <div>
                    <FilterReviewsByStars 
                        typeMinStars={typeMinStars}
                        setTypeMinStars={setTypeMinStars}
                        typeMaxStars={typeMaxStars}
                        setTypeMaxStars={setTypeMaxStars}
                    />
                </div>
                <div>
                    {  
                    reviews && reviews.length
                    ? filteredReviews().map(review => {
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
  