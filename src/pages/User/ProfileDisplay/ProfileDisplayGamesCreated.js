import React, {useState} from 'react';
import { withRouter } from 'react-router-dom'
import * as action from '../../../modules/actionCreators/actionCreators'
import UserCard from '../UserCard'
import ReviewCard from '../../Review/ReviewCard'
import GamePhotoCard from '../../GamePhoto/GamePhotoCard'
import GameCard from '../../Game/GameCard'
import UserProfileCard from '../UserProfileCard'
import AddReviewForm from '../../../Components/Forms/AddReviewForm'
import AddGamePhotoForm from '../../../Components/Forms/AddGamePhotoForm'
import SearchBarGames from '../../../Components/SearchBars/SearchBarGames'
import FilterGamesByNum from '../../../Components/Filters/FilterGamesByNum'
import {connect} from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Divider, Header } from 'semantic-ui-react'

const ProfileDisplayGamesCreated = props => {
    const {
        thisPageUser,
        thisUserReviews,
        thisUserGamePhotos,
        thisUserCreatedGames,
        games,
        currentUser
    } = props
  
    let [search, setSearch] = useState('')
    let [searchType, setSearchType] = useState('gameTitle')
    let [typeNumPlayers, setTypeNumPlayers] = useState('noNumPlayers')
    let [numPlayers, setNumPlayers] = useState('')
    let [typeMinAge, setTypeMinAge] = useState('noMinAge')
    let [minAge, setMinAge] = useState('')

    

    let filteredGames = () => {
        if (games && thisUserCreatedGames && thisUserCreatedGames.length) {
            let gamesFiltered = thisUserCreatedGames
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

    return (
    <div>
        <div className='user-profile-container'>
            <div className='user-profile-card'>
                {thisPageUser && <UserProfileCard user={thisPageUser}/>} 
            </div>
            <div className='profile-photos-search-bar'>   
                <Divider horizontal>
                    <Header as='h4'>
                        Games Created
                    </Header>
                </Divider>
                <div>
                    <SearchBarGames search={search} searchType={searchType} setSearch={setSearch} setSearchType={setSearchType}/>
                </div>
                <div>
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
        <Container fluid>
            <Row className='justify-content-center'>
                <Col md={3}>
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
                
                    {
                        thisUserReviews && thisUserReviews.length
                        ?<div>
                            <div>Game Reviews:</div>
                            <div>
                            {thisUserReviews.map(review => 
                                <div>
                                <ReviewCard key={review.id} {...review} />
                                </div>
                            )}
                            </div>
                        </div>
                        : <div>
                            <br/><br/>
                            <div>No Reviews Listed</div>
                        </div>
                    }
                </Col>
                <Col md={6}>
                    <div className="featured-on-user-page">
                        {
                            thisUserCreatedGames && thisUserCreatedGames.length
                            ?<div>
                                <div>Created Games:</div>
                                <div>
                                    {filteredGames().map(game => 
                                        <div>
                                                <GameCard key={game.id} {...game} />
                                        </div>
                                    )}
                                </div>
                            </div>
                            : <div>No Games Created</div>
                        }
                    </div>
                </Col>
                <Col md={3}>
                    {
                        currentUser && currentUser.total_friends && currentUser.total_friends.length
                        ?<div>
                            <div>Friends:</div>
                            <div>
                            {currentUser.total_friends.map(friend => 
                                <div>
                                    <UserCard key={friend.id} {...friend} status="profile"/>
                                </div>
                            )}
                            </div>
                        </div>
                        : <div>No Friends Listed</div>
                    }
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
  
  export default withRouter(connect(msp, mdp)(ProfileDisplayGamesCreated));
