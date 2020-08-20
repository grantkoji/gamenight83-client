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
import SearchBarGames from '../../../Components/SearchBars/SearchBarGames'
import FilterGamesByNum from '../../../Components/Filters/FilterGamesByNum'
import {connect} from 'react-redux'
import UserProfileCard from '../UserProfileCard'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Divider, Header, Card } from 'semantic-ui-react'

const UserDisplayGamesCreated = props => {
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
    let [typeNumPlayers, setTypeNumPlayers] = useState('noNumPlayers')
    let [numPlayers, setNumPlayers] = useState('')
    let [typeMinAge, setTypeMinAge] = useState('noMinAge')
    let [minAge, setMinAge] = useState('')

    

    let filteredGames = () => {
        if (games && thisUserCreatedGames.length) {
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

    let mutualFriendsList = () => {
        if(mutualFriends) {
            return (
                <>
                     <Divider horizontal>
                        <Header as='h4'>
                        <span className='search-bar-font'>Mutual Friends</span>
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
                    <span className='search-bar-font'>No Mutual Friends Listed</span>
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
                <div className='profile-games-search-bar'>  
                    <Divider horizontal>
                        <Header as='h4'>
                        <span className='search-bar-font'>Search Games</span>
                        </Header>
                    </Divider>
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
            <Container fluid>
                <Row className='justify-content-center'>
                    <Col md={2}>
                        <div>
                            {
                                thisUserGamePhotos && thisUserGamePhotos.length
                                ?<>
                                    <Divider horizontal>
                                        <Header as='h4'>
                                        <span className='search-bar-font'>Game Photos</span>
                                        </Header>
                                    </Divider>
                                    {thisUserGamePhotos.map(photo => 
                                            <GamePhotoCard key={photo.id} {...photo} />
                                    )}
                                </>
                                :  <Divider horizontal>
                                        <Header as='h4'>
                                        <span className='search-bar-font'>No Photos Listed</span>
                                        </Header>
                                    </Divider>
                            }
                            {
                                thisUserReviews && thisUserReviews.length
                                ?<>
                                    <Divider horizontal>
                                        <Header as='h4'>
                                        <span className='search-bar-font'>Reviews</span>
                                        </Header>
                                    </Divider>
                                    {thisUserReviews.map(review => 
                                        <ReviewCard key={review.id} {...review} />

                                    )}
                                </>
                                :  <Divider horizontal>
                                    <Header as='h4'>
                                    <span className='search-bar-font'>No Reviews Listed</span>
                                    </Header>
                                </Divider>
                            }
                        </div> 
                    </Col>
                    <Col md={8}>
                        <div>
                            {
                                thisUserCreatedGames && thisUserCreatedGames.length
                                ?<> <Divider horizontal>
                                        <Header as='h4'>
                                        <span className='search-bar-font'>Created Games</span>
                                        </Header>
                                    </Divider>
                                    { filteredGames() && filteredGames().length > 1
                                        ?
                                            <Card.Group itemsPerRow={2}>
                                                {filteredGames().map(game => 
                                                    <GameCard key={game.id} {...game} />
                                                )}
                                            </Card.Group>
                                        :  <Card.Group centered>
                                                {filteredGames().map(game => 
                                                    <GameCard key={game.id} {...game} />
                                                )}
                                            </Card.Group>
                                    }
                                </>
                                :  <Divider horizontal>
                                        <Header as='h4'>
                                        <span className='search-bar-font'>No Created Games</span>
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
                                ?<>  
                                    <Divider horizontal>
                                        <Header as='h4'>
                                        <span className='search-bar-font'>Friends</span>
                                        </Header>
                                    </Divider>
                                    {thisPageUser.total_friends.map(friend => 
                                            <UserCard key={friend.id} {...friend} status="visitor"/>
                                    )}
                                </>
                                    :  <Divider horizontal>
                                            <Header as='h4'>
                                            <span className='search-bar-font'>No Friends Listed</span>
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

export default withRouter(connect(msp, mdp)(UserDisplayGamesCreated))
