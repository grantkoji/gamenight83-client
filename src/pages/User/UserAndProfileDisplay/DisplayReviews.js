import React, {useState} from 'react';
import { withRouter } from 'react-router-dom'
import * as action from '../../../modules/actionCreators/actionCreators'
import UserCard from '../UserCard'
import ReviewCard from '../../Review/ReviewCard'
import GamePhotoCard from '../../GamePhoto/GamePhotoCard'
import GameCard from '../../Game/GameCard'
import AddReviewForm from '../../../Components/Forms/AddReviewForm'
import AddGamePhotoForm from '../../../Components/Forms/AddGamePhotoForm'
import GameUserCard from '../../Game/GameUserCard'
import SearchBarReviews from '../../../Components/SearchBars/SearchBarReviews'
import FilterReviewsByMinStars from '../../../Components/Filters/FilterReviewsByMinStars'
import FilterReviewsByMaxStars from '../../../Components/Filters/FilterReviewsByMaxStars'
import {connect} from 'react-redux'
import UserProfileCard from '../UserProfileCard'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const UserDisplayReviews= props => {
    const {
        mutualFriends,
        thisPageUser,
        thisUserReviews,
        thisUserGamePhotos,
        thisUserCreatedGames,
        games, 
        token
    } = props

    let [search, setSearch] = useState('')
    let [searchType, setSearchType] = useState('gameTitle')
    let [typeMinStars, setTypeMinStars] = useState('noMinStars')
    let [typeMaxStars, setTypeMaxStars] = useState('noMaxStars')
    let [minNumStars, setMinNumStars] = useState(0);
    let [maxNumStars, setMaxNumStars] = useState(0);

    let filteredReviews = () => {
        if (thisUserReviews && thisUserReviews.length) {
            let reviewsFiltered = thisUserReviews
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

    let mutualFriendsList = () => {
        if(mutualFriends) {
            return (
                <>
                    <div> 
                        <div>Mutual Friends:</div>
                        <div>
                            {mutualFriends.map(friend => 
                                <div>
                                    <UserCard key={friend.id} {...friend}/>
                                </div>
                            )}
                        </div>
                    </div>
                    </>
            )
        } else {
            return (
                <div>No Mutual Friends Listed</div>
            )
        }
    }



    
    return (
        <div>
            <div className='user-profile-container'>
                <div className='user-profile-card'>
                    {thisPageUser && <UserProfileCard user={thisPageUser}/>} 
                </div>
                <div className='profile-gs-search-bar'>  
                    <Divider horizontal>
                        <Header as='h4'>
                            Scheduled Games
                        </Header>
                    </Divider>
                    <SearchBarReviews search={search} searchType={searchType} setSearch={setSearch} setSearchType={setSearchType}/>
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
            <Container fluid>
                <Row className='justify-content-center'>
                    <Col md={3}>
                        <div>
                            {
                                thisUserGamePhotos && thisUserGamePhotos.length
                                ?<div>
                                    <div>Game Photos:</div>
                                    <div>
                                    {thisUserGamePhotos.map(photo => 
                                        <div>
                                            <GamePhotoCard key={photo.id} {...photo} />
                                        </div>
                                    )}
                                    </div>
                                </div>
                                : <div>No Game Photos Listed</div>
                            }
                        </div>
                        <div>
                            {
                                thisUserCreatedGames && thisUserCreatedGames.length
                                ?<div>
                                    <div>Created Games:</div>
                                    <div>
                                        {thisUserCreatedGames.map(game => 
                                            <div>
                                                    <GameCard key={game.id} {...game} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                :<div>
                                    <br/><br/>
                                    <div>No Games Created</div>
                                </div>
                            }
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className='featured-on-user-page'>
                            {
                                thisUserReviews && thisUserReviews.length
                                ?<div>
                                    <div>Game Reviews:</div>
                                    <div>
                                    {filteredReviews().map(review => 
                                        <div>
                                        <ReviewCard key={review.id} {...review} />
                                        </div>
                                    )}
                                    </div>
                                </div>
                                : <div>No Reviews Listed</div>
                            }
                        </div>       
                    </Col>
                    <Col md={3}>
                        <div>
                            {thisPageUser && mutualFriendsList()}  
                        </div>  
                        <div>
                            {
                                thisPageUser && thisPageUser.total_friends && thisPageUser.total_friends.length
                                ?<div>
                                    <div>Friends:</div>
                                    <div>
                                    {thisPageUser.total_friends.map(friend => 
                                        <div>
                                            <UserCard key={friend.id} {...friend} status="review"/>
                                        </div>
                                    )}
                                    </div>
                                </div>
                                    :<div>
                                        <br/><br/>
                                        <div>No Friends Listed</div>
                                    </div>
                            }
                        </div>
                    </Col>
                </Row>
            </Container> 
        </div>
    )

}


const msp = state => {
    return {
      token: state.token,
      games: state.games,
      users: state.users,
      reviews: state.reviews,
      gamePhotos: state.gamePhotos,
      currentUser: state.currentUser,
      showUser: state.showUser
    }
  }
  
  const mdp = dispatch => {
    return {
      setCurrentUser: (user) => dispatch(action.setCurrentUser(user)),
      setCurrentToken: (token) => dispatch(action.setCurrentToken(token)),
      setShowUser: (userId) => dispatch(action.setShowUser(userId))
    }
  }

export default withRouter(connect(msp, mdp)(UserDisplayReviews))


