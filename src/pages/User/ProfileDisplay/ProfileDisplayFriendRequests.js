import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom'
import * as action from '../../../modules/actionCreators/actionCreators'
import UserCard from '../UserCard'
import ReviewCard from '../../Review/ReviewCard'
import GamePhotoCard from '../../GamePhoto/GamePhotoCard'
import GameCard from '../../Game/GameCard'
import FriendshipRequest from '../../Friend/FriendshipRequest'
import SentFriendshipRequest from '../../Friend/SentFriendshipRequest'
import {connect} from 'react-redux'
import UserProfileCard from '../UserProfileCard'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Divider, Header, Card } from 'semantic-ui-react'
import SearchBarUsers from '../../../Components/SearchBars/SearchBarUsers'

const ProfileDisplayFriendRequests = props => {
    const {
        thisPageUser,
        thisUserReviews,
        thisUserGamePhotos,
        thisUserCreatedGames,
        currentUser, 
        users,
        setCurrentUser
    } = props
    
    let [search, setSearch] = useState('')
    let [searchType, setSearchType] = useState('gameTitle')
 
    //Below three hooks will be used to set the type of 
    //post - review or photo - as well as the title and id
    //of the game that the user will write a post or review on
    let [postType, setPostType] = useState('instructions')
    let [thisGameId, setThisGameId] = useState(null)
    let [thisGameTitle, setThisGameTitle] = useState(null)
    let [trueFalse, setTrueFalse] = useState(true)

    useEffect(()=> {
        if (currentUser && users && users.length) {
            let currentUserReset = users.find(user => user.id === currentUser.id)
            setCurrentUser(currentUserReset)
        }
    }, [users])


    // let filteredUsers = () => {
    //     if (currentUser && currentUser.total_friends && currentUser.total_friends.length) {
    //         if (searchType === 'username') {
    //             return currentUser.total_friends.filter(user => user.username.toLowerCase().includes(search.toLowerCase()))
    //         } else if (searchType === 'favGames') {
    //             return currentUser.total_friends.filter(user => user.fav_games.toLowerCase().includes(search.toLowerCase()))
    //         }
    //     } 
    // }
    return (
        <div>       
            <div className='user-profile-container'>
                <div className='user-profile-card'>
                    {thisPageUser && <UserProfileCard user={thisPageUser}/>} 
                </div>
                <div className='profile-display-fr'>  
                    <Divider horizontal>
                        <Header as='h4'>
                        <span className='search-bar-font'>Search Friend Requests</span>
                        </Header>
                    </Divider>
                    <div className='users-search-bar'>
                    <SearchBarUsers 
                        searchType={searchType} 
                        setSearchType={setSearchType}
                        search={search}
                        setSearch={setSearch}
                    />
                </div>
                </div>
            </div>
            <Container fluid>
                <Row className='justify-content-center'>
                    <Col md={3}>
                        <>
                            {
                                thisUserGamePhotos && thisUserGamePhotos.length
                                ?<>
                                    <Divider horizontal>
                                        <Header as='h4'>
                                        <span className='search-bar-font'>Game Photos Listed</span>
                                        </Header>
                                    </Divider>
                                    {thisUserGamePhotos.map(photo =>        
                                            <GamePhotoCard key={photo.id} {...photo} />
                                    )}
                                </>
                                : <Divider horizontal>
                                        <Header as='h4'>
                                        <span className='search-bar-font'>No Photos Listed</span>
                                        </Header>
                                    </Divider>
                            }
                       </>
                       <>
                            {
                                thisUserCreatedGames && thisUserCreatedGames.length
                                ?<>
                                    <Divider horizontal>
                                        <Header as='h4'>
                                        <span className='search-bar-font'>Created Games</span>
                                        </Header>
                                    </Divider>
                                        {thisUserCreatedGames.map(game => 
                                                    <GameCard key={game.id} {...game} />
                                        )}
                                </>
                                :<Divider horizontal>
                                        <Header as='h4'>
                                        <span className='search-bar-font'>No Games Created</span>
                                        </Header>
                                    </Divider>
                            }
                        </>
                    </Col>
                    <Col md={6}>
                        <div>
                                {
                                    currentUser && currentUser.friend_requests_received && currentUser.friend_requests_received.length 
                                    ? <>
                                        <Divider horizontal>
                                            <Header as='h4'>
                                            <span className='search-bar-font'>Inbound Friend Requests</span>
                                            </Header>
                                        </Divider>
                                      <Card.Group centered>
                                            {currentUser.friend_requests_received.map(inFR => <FriendshipRequest 
                                                key={inFR.id}
                                                id={inFR.id} 
                                                userId={inFR.user_id}
                                                />) }
                                        </Card.Group>
                                        
                                    </>
                                    : <Divider horizontal>
                                        <Header as='h4'>
                                        <span className='search-bar-font'>No Inbound Friend Requests</span>
                                        </Header>
                                    </Divider>
                                }
                          
                                {
                                    currentUser && currentUser.friend_requests_sent && currentUser.friend_requests_sent.length 
                                    ? <>
                                        <Divider horizontal>
                                            <Header as='h4'>
                                            <span className='search-bar-font'>Pending Friend Requests</span>
                                            </Header>
                                        </Divider>
                                        <Card.Group centered> 
                                            {currentUser.friend_requests_sent.map(outFR => <SentFriendshipRequest 
                                                key={outFR.id} 
                                                id={outFR.id}
                                                userId={outFR.request_id}
                                                /> )}
                                         </Card.Group>
                                        
                                    </>
                                    :<>
                                    <Divider horizontal>
                                        <Header as='h4'>
                                        <span className='search-bar-font'>No Friend Requests</span>
                                        </Header>
                                    </Divider>
                                      </>
                                }
                        
                        </div>
                    </Col>
                    <Col md={3}>
                        <div>
                            {
                                currentUser && currentUser.total_friends && currentUser.total_friends.length
                                ?<>
                                    <Divider horizontal>
                                        <Header as='h4'>
                                        <span className='search-bar-font'>Friends</span>
                                        </Header>
                                    </Divider>           
                                    {currentUser.total_friends.map(friend => 
                                            <UserCard key={friend.id} {...friend} status="profile"/>   
                                    )}
                                </>
                                : <Divider horizontal>
                                        <Header as='h4'>
                                        <span className='search-bar-font'>No Friends Listed</span>
                                        </Header>
                                    </Divider>
                            }
                        {
                            thisUserReviews && thisUserReviews.length
                            ?<>
                                <Divider horizontal>
                                    <Header as='h4'>
                                    <span className='search-bar-font'>Listed Reviews</span>
                                    </Header>
                                </Divider>  
                                {thisUserReviews.map(review => 
        
                                    <ReviewCard key={review.id} {...review} />
                                )}
                            </>
                            : <Divider horizontal>
                                <Header as='h4'>
                                <span className='search-bar-font'>No Reviews Listed</span>
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

export default withRouter(connect(msp, mdp)(ProfileDisplayFriendRequests))



