import React, {useState} from 'react';
import {connect} from 'react-redux'
import ReviewCard from './ReviewCard'
import SearchBarReviews from '../../Components/SearchBars/SearchBarReviews'
import FilterReviewsByStars from '../../Components/Filters/FilterReviewsByStars'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
const ReviewsIndex = props => {

 
        const {reviews} = props
        let [search, setSearch] = useState('')
        let [searchType, setSearchType] = useState('gameTitle')
        let [typeMinStars, setTypeMinStars] = useState('noMinStars')
        let [typeMaxStars, setTypeMaxStars] = useState('noMaxStars')
        let [numStars, setNumStars] = useState(0);
   

    
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
                    reviewsFiltered = reviewsFiltered.filter(review => parseInt(review.num_stars) >= parseInt(numStars))
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
                        numStars={numStars}
                        setNumStars={setNumStars}
                    />
                </div>
                <div>
                    <Container fluid>
                        <Row>
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
                        </Row>
                    </Container>
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
  