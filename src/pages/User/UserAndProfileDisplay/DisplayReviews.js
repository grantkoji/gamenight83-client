import React, {useState} from 'react';
import { withRouter } from 'react-router-dom'
import * as action from '../../../modules/actionCreators/actionCreators'
import UserCard from '../UserCard'
import ReviewCard from '../../Review/ReviewCard'
import GamePhotoCard from '../../GamePhoto/GamePhotoCard'
import GameCard from '../../Game/GameCard'
import SearchBarReviews from '../../../Components/SearchBars/SearchBarReviews'
import FilterReviewsByMinStars from '../../../Components/Filters/FilterReviewsByMinStars'
import FilterReviewsByMaxStars from '../../../Components/Filters/FilterReviewsByMaxStars'
import {connect} from 'react-redux'
import UserProfileCard from '../UserProfileCard'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Divider, Header, Card } from 'semantic-ui-react'

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
                    <Divider horizontal>
                        <Header as='h4'>
                            Mutual Friends
                        </Header>
                    </Divider>
                    {mutualFriends.map(friend => 
                        <UserCard key={friend.id} {...friend}/>
                    )}
                </>
            )
        } else {
            return (
                <Divider horizontal>
                    <Header as='h4'>
                        No Mutual Friends Listed
                    </Header>
                </Divider>
            )
        }
    }



    
    return (
        <div>
            <div className='user-profile-container'>
                <div className='user-profile-card'>
                    {thisPageUser && <UserProfileCard user={thisPageUser}/>} 
                </div>
                <div className='profile-review-search-bar'>  
                    <Divider horizontal>
                        <Header as='h4'>
                            Search Reviews
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
                    <Col md={2}>
                        <div>
                            {
                                thisUserGamePhotos && thisUserGamePhotos.length
                                ?<>
                                    <Divider horizontal>
                                        <Header as='h4'>
                                            Game Photos
                                        </Header>
                                    </Divider>
                                    {thisUserGamePhotos.map(photo => 
                                            <GamePhotoCard key={photo.id} {...photo} />
                                    )}
                                </>
                                : <Divider horizontal>
                                    <Header as='h4'>
                                        No Photos Listed
                                    </Header>
                                </Divider>
                            }
                        </div>
                        <div>
                            {
                                thisUserCreatedGames && thisUserCreatedGames.length
                                ?<>
                                    <Divider horizontal>
                                        <Header as='h4'>
                                            Created Games
                                        </Header>
                                    </Divider>
                                        {thisUserCreatedGames.map(game => 
                                            <div>
                                                    <GameCard key={game.id} {...game} />
                                            </div>
                                        )}
                                </>
                                :<Divider horizontal>
                                    <Header as='h4'>
                                        No Games Created
                                    </Header>
                                </Divider>
                            }
                        </div>
                    </Col>
                    <Col md={8}>
                        <div>
                            {
                                thisUserReviews && thisUserReviews.length
                                ?<>
                                    <Divider horizontal>
                                        <Header as='h4'>
                                            Reviews
                                        </Header>
                                    </Divider>
                                    {filteredReviews() && filteredReviews().length > 1
                                       ? 
                                       <>
                                       <div className='index-review-divider'>
                                       <Card.Group itemsPerRow={2}>
                                            {filteredReviews().map(review => 
                                              
                                                    <ReviewCard key={review.id} {...review} />
                                    
                                            )}
                                        </Card.Group>
                                        </div>
                                        </>
                                        : <Card.Group centered>
                                            {filteredReviews().map(review => 
                                                <ReviewCard key={review.id} {...review} />
                                            )}
                                        </Card.Group>
                                    }
                                </>
                                : <Divider horizontal>
                                    <Header as='h4'>
                                        No Reviews Listed
                                    </Header>
                                </Divider>
                            }
                        </div>       
                    </Col>
                    <Col md={2}>
                        <div>
                            {thisPageUser && mutualFriendsList()}  
                        </div>  
                        <div>
                            {
                                thisPageUser && thisPageUser.total_friends && thisPageUser.total_friends.length
                                ? <>
                                    <Divider horizontal>
                                        <Header as='h4'>
                                        Friends
                                        </Header>
                                    </Divider>
                                    {thisPageUser.total_friends.map(friend => 
                                            <UserCard key={friend.id} {...friend} status="review"/>
                                    )}
                                </>
                                    : <Divider horizontal>
                                        <Header as='h4'>
                                            No Friends Listed
                                        </Header>
                                    </Divider>
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


