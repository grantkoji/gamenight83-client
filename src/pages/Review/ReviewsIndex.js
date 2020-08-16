import React, {useState} from 'react';
import {connect} from 'react-redux'
import ReviewCard from './ReviewCard'
import SearchBarReviews from '../../Components/SearchBars/SearchBarReviews'
import FilterReviewsByMinStars from '../../Components/Filters/FilterReviewsByMinStars'
import FilterReviewsByMaxStars from '../../Components/Filters/FilterReviewsByMaxStars'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
const ReviewsIndex = props => {

 
        const {reviews} = props
        let [search, setSearch] = useState('')
        let [searchType, setSearchType] = useState('gameTitle')
        let [typeMinStars, setTypeMinStars] = useState('noMinStars')
        let [typeMaxStars, setTypeMaxStars] = useState('noMaxStars')
        let [minNumStars, setMinNumStars] = useState(0);
        let [maxNumStars, setMaxNumStars] = useState(0);
    

    
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
                    reviewsFiltered = reviewsFiltered.filter(review => parseInt(review.num_stars) >= parseInt(minNumStars))
                }
                if (typeMaxStars !== 'noMaxStars') {
                    reviewsFiltered = reviewsFiltered.filter(review => parseInt(review.num_stars) <= parseInt(maxNumStars))
                }
                return reviewsFiltered
            } 
        }
        return (
            <>
                <h1>Game Reviews</h1>
                <div className='reviews-search-bar'>
                    <div>
                        <SearchBarReviews search={search} searchType={searchType} setSearch={setSearch} setSearchType={setSearchType}/>
                    </div>
                    <div>
                        <FilterReviewsByMinStars 
                            setTypeMinStars={setTypeMinStars}
                            minNumStars={minNumStars}
                            setMinNumStars={setMinNumStars} 
                        /><br/>
                        <FilterReviewsByMaxStars 
                            setTypeMaxStars={setTypeMaxStars}
                            maxNumStars={maxNumStars}     
                            setMaxNumStars={setMaxNumStars}
                        />
                    </div>
                </div>
                <div>
                    <Container fluid>
                        <Row className='justify-content-center'>
                            {  
                            reviews && reviews.length
                            ? filteredReviews().map(review => {
                                return (
                                    <div className='index-review-divider'>
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
  

//   <div>
//   <Container fluid>
//       <Row>
//           {  
//           reviews && reviews.length
//           ? filteredReviews().map(review => {
//               return (
//                   <div>
//                   <ReviewCard key={review.id} {...review}/>
//                   </div>
//               )
//           })
//           : "Loading..."}
//       </Row>
//   </Container>
// </div>