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
    let [typeNumPlayers, setTypeNumPlayers] = useState('noNumPlayers')
    let [numPlayers, setNumPlayers] = useState(0)
    let [typeMinAge, setTypeMinAge] = useState('noMinAge')
    let [minAge, setMinAge] = useState(0)
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


    return (
        <div>       
            <div className='user-profile-container'>
                <div className='user-profile-card'>
                    {thisPageUser && <UserProfileCard user={thisPageUser}/>} 
                </div>
                <div className='profile-display-fr'>  
                    <Divider horizontal>
                        <Header as='h4'>
                            Friend Requests
                        </Header>
                    </Divider>
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
                                    currentUser && currentUser.friend_requests_received && currentUser.friend_requests_received.length 
                                    ? <div>
                                        {currentUser.friend_requests_received.map(inFR => <FriendshipRequest 
                                                                key={inFR.id}
                                                                id={inFR.id} 
                                                                userId={inFR.user_id}
                                                                />) }
                                    </div>
                                    : <Divider horizontal>
                                        <Header as='h4'>
                                            No Inbound Friend Requests
                                        </Header>
                                    </Divider>
                                }
                          
                                {
                                    currentUser && currentUser.friend_requests_sent && currentUser.friend_requests_sent.length 
                                    ? <div>
                                        <Divider horizontal>
                                            <Header as='h4'>
                                                Pending Friend Requests
                                            </Header>
                                        </Divider>
                                        {currentUser.friend_requests_sent.map(outFR => <SentFriendshipRequest 
                                                                    key={outFR.id} 
                                                                    id={outFR.id}
                                                                    userId={outFR.request_id}
                                                                    /> )}
                                    </div>
                                    :<>
                                    <Divider horizontal>
                                        <Header as='h4'>
                                            No Friend Requests Pending
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
                                ?<div>
                                    <Divider horizontal>
                                        <Header as='h4'>
                                            Listed Friends
                                        </Header>
                                    </Divider>           
                                    {currentUser.total_friends.map(friend => 
                                        <div>
                                            <UserCard key={friend.id} {...friend} status="profile"/>
                                        </div>
                                    )}
                                </div>
                                : <Divider horizontal>
                                        <Header as='h4'>
                                            No Friends Listed
                                        </Header>
                                    </Divider>
                            }
                        </div>
                        <div>
                        {
                            thisUserReviews && thisUserReviews.length
                            ?<div>
                                <Divider horizontal>
                                    <Header as='h4'>
                                        Listed Reviews
                                    </Header>
                                </Divider>  
                                {thisUserReviews.map(review => 
                                    <div>
                                    <ReviewCard key={review.id} {...review} />
                                    </div>
                                )}
                            </div>
                            : <Divider horizontal>
                                <Header as='h4'>
                                    No Reviews Listed
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



