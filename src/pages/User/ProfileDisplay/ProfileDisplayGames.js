import React, {useState} from 'react';
import { withRouter } from 'react-router-dom'
import * as action from '../../../modules/actionCreators/actionCreators'
import UserCard from '../UserCard'
import ReviewCard from '../../Review/ReviewCard'
import GamePhotoCard from '../../GamePhoto/GamePhotoCard'
import GameCard from '../../Game/GameCard'
import AddReviewForm from '../../../Components/Forms/AddReviewForm'
import ScheduleGameForm from '../../../Components/Forms/ScheduleGameForm'
import AddGamePhotoForm from '../../../Components/Forms/AddGamePhotoForm'
import SearchBarGames from '../../../Components/SearchBars/SearchBarGames'
import FilterGamesByNum from '../../../Components/Filters/FilterGamesByNum'
import GameUserCard from '../../Game/GameUserCard'
import {connect} from 'react-redux'
import UserProfileCard from '../UserProfileCard'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Divider, Header, Card } from 'semantic-ui-react'

const ProfileDisplayGames = props => {
    const {
        thisPageUser,
        thisUserReviews,
        thisUserGamePhotos,
        thisUserCreatedGames,
        currentUser,
        games, 
        token
    } = props

    let [search, setSearch] = useState('')
    let [searchType, setSearchType] = useState('gameTitle')
    let [typeNumPlayers, setTypeNumPlayers] = useState('noNumPlayers')
    let [numPlayers, setNumPlayers] = useState('')
    let [typeMinAge, setTypeMinAge] = useState('noMinAge')
    let [minAge, setMinAge] = useState('')
    //Below three hooks will be used to set the type of 
    //post - review or photo - as well as the title and id
    //of the game that the user will write a post or review on
    let [postType, setPostType] = useState('instructions')
    let [thisGameId, setThisGameId] = useState(null)
    let [thisGameTitle, setThisGameTitle] = useState(null)

    let filteredGames = () => {
        if (games && games.length) {
            let gamesFiltered = [...games]
            if (searchType === 'username') {
                gamesFiltered = gamesFiltered.filter(game => game.creator_username.toLowerCase().includes(search.toLowerCase()))
            } else if (searchType === 'gameCategory') {
                gamesFiltered = gamesFiltered.filter(game => game.game_category.toLowerCase().includes(search.toLowerCase()))
            } else if (searchType === 'gameTitle') {
                gamesFiltered = gamesFiltered.filter(game => game.title.toLowerCase().includes(search.toLowerCase()))
            }
            if (typeNumPlayers === "withNumPlayers" && numPlayers !== '') {
                gamesFiltered = gamesFiltered.filter(game => game.max_num_players >= parseInt(numPlayers) && 
                    game.min_num_players <= parseInt(numPlayers))
            } 
            if (typeMinAge === 'withMinAge' && minAge !== '') {
                gamesFiltered = gamesFiltered.filter(game => game.min_age >= parseInt(minAge))
            }
            return gamesFiltered
        } 
    }

    const postedReviewOrPhoto = () => {
        if (postType === "instructions") {
            return (
                <div>
                    <div>To Schedule a Game, Post a Photo, Or Write a Review</div>
                    <div>Search the Games Listed Below</div>
                    <div>Below their Pictures, You Will Find Buttons</div>
                    <div>To Post a Photo or Write a Review</div>
                    <div>When Clicked, a Form Will Appear in the Place of These Instructions</div>
                </div>
          ) 
        } else if (postType === "review") {
            return (
                <div>
                    <div>Write a Review for {thisGameTitle}:</div>
                    <AddReviewForm thisGame={thisGameId}/>
                    <ScheduleGameForm thisGameId={thisGameId} thisGameTitle={thisGameTitle} />
                    <Divider horizontal>
                        <Header as='h4'>
                            Write a Review
                        </Header>
                    </Divider>
                </div>
            )  
        } else if (postType === "photo") {
            return (
                <div>
                    <div>Post a Photo for {thisGameTitle}:</div>
                    <AddGamePhotoForm thisGame={thisGameId}/>
                    <ScheduleGameForm thisGameId={thisGameId} thisGameTitle={thisGameTitle} />
                    <Divider horizontal>
                        <Header as='h4'>
                            Post a Photo
                        </Header>
                    </Divider>
                </div>
            )  
        } else if (postType === 'scheduleGame') {
            return (
                <div>
                    <div>Schedule a Game:</div>
                    <ScheduleGameForm thisGameId={thisGameId} thisGameTitle={thisGameTitle} />
                    <Divider horizontal>
                        <Header as='h4'>
                            Schedule a Game
                        </Header>
                    </Divider>
                </div>
            )
        }
    }

    return (
        <div>

            <div className='user-profile-container'>
                <div className='user-profile-card'>
                    {thisPageUser && <UserProfileCard user={thisPageUser}/>} 
                </div>
                <div className='profile-photos-search-bar'>  
                    <div>
                        {postedReviewOrPhoto()}
                    </div>
                        <SearchBarGames search={search} searchType={searchType} setSearch={setSearch} setSearchType={setSearchType}/>  
                        <FilterGamesByNum 
                            typeNumPlayers={typeNumPlayers} 
                            setTypeNumPlayers={setTypeNumPlayers}
                            numPlayers={numPlayers}
                            setNumPlayers={setNumPlayers} 
                            typeMinAge={typeMinAge} 
                            setTypeMinAge={setTypeMinAge}
                            minAge={minAge}
                            setMinAge={setMinAge}  
                        />
                    </div>
                </div>
            </div>
            <Container >
                <Row >
                    <Col md={2} className='side-columns'>
                        <div>
                            {
                                thisUserGamePhotos && thisUserGamePhotos.length
                                ?<div>
                                    <div>Game Photos:</div>
                                    <div>
                                    {thisUserGamePhotos.map(photo => 
                
                                            <GamePhotoCard key={photo.id} {...photo} />
                                   
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

                                    <div className='card-group-1'>
                                       
                                            {thisUserCreatedGames.map(game =>     
                                                <GameCard key={game.id} {...game} />
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
                    <Col md={8}>
                        <>
                       
                            {
                                games && games.length 
                                ? 
                                <>
                                <Card.Group itemsPerRow={2}>
                                    {filteredGames().map(game => 
                                   
                                            <GameUserCard 
                                                key={game.id} 
                                                {...game} 
                                                setThisGameId={setThisGameId}
                                                setThisGameTitle={setThisGameTitle}
                                                setPostType={setPostType}
                                            />
                                   
                                    )}
                                </Card.Group>
                                
                                </>
                                : <div>No Games Listed</div>
                            }
                        </>
                       
                    </Col>
                    <Col md={2} className='side-columns'>
                        <div>
                            {
                                currentUser && currentUser.total_friends && currentUser.total_friends.length
                                ?<div>
                                    <div>Friends:</div>
                                    <div>
                                    {currentUser.total_friends.map(friend => 
                                     
                                            <UserCard key={friend.id} {...friend} status="profile"/>
                                   
                                    )}
                                    </div>
                                </div>
                                : <div>No Friends Listed</div>
                            }
                        </div>
                        <div>
                            {
                                thisUserReviews && thisUserReviews.length
                                ?<div>
                                    <div>Game Reviews:</div>
                                    <div>
                                    {thisUserReviews.map(review => 
                             
                                        <ReviewCard key={review.id} {...review} />
                                     
                                    )}
                                    </div>
                                </div>
                                :<div>
                                    <br/><br/>
                                    <div>No Reviews Listed</div>
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

export default withRouter(connect(msp, mdp)(ProfileDisplayGames))



