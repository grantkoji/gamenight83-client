import React, {useState, useEffect} from 'react';
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
import { Divider, Header, Card } from 'semantic-ui-react'

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

    useEffect(()=>{
        console.log(thisUserCreatedGames)
    }, [] )

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
            <div className='profile-games-search-bar'>   
                <Divider horizontal>
                    <Header as='h4'>
                    <span className='search-bar-font'> Search Created Games</span> 
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
                                <span className='search-bar-font'> Game Photos</span> 
                                </Header>
                            </Divider>
                            {thisUserGamePhotos.map(photo => 
                                    <GamePhotoCard key={photo.id} {...photo} />
                            )}
                        </>
                        : <Divider horizontal>
                                <Header as='h4'>
                                <span className='search-bar-font'> No Photos Listed</span> 
                                </Header>
                            </Divider>
                    }
                
                    {
                        thisUserReviews && thisUserReviews.length
                        ?<>
                            <Divider horizontal>
                                <Header as='h4'>
                                <span className='search-bar-font'> Game Reviews</span> 
                                </Header>
                            </Divider>
                            {thisUserReviews.map(review =>            
                                <ReviewCard key={review.id} {...review} />
                            )}
                        </>
                        : <Divider horizontal>
                                <Header as='h4'>
                                <span className='search-bar-font'> No Reviews Listed</span> 
                                </Header>
                            </Divider>
                    }
                    </div>
                </Col>
                <Col md={8}>
                    <div >
                        {
                            thisUserCreatedGames && thisUserCreatedGames.length
                            ?<>
                                <Divider horizontal>
                                    <Header as='h4'>
                                    <span className='search-bar-font'> Created Games</span> 
                                    </Header>
                                </Divider>

                                { filteredGames().length > 1 
                                    ?<Card.Group itemsPerRow={2}>
                                        {filteredGames().map(game => 
                                            <GameCard key={game.id} {...game} />
                                    )}
                                    </Card.Group>
                                    : <Card.Group centered>
                                        {filteredGames().map(game => 
                                            <GameCard key={game.id} {...game} />
                                    )}
                                    </Card.Group>
                                }
                            </>
                            :  <Divider horizontal>
                                    <Header as='h4'>
                                    <span className='search-bar-font'> No Games Created</span> 
                                    </Header>
                                </Divider>
                        }
                    </div>
                </Col>
                <Col md={2}>
                    <div>
                        {
                            currentUser && currentUser.total_friends && currentUser.total_friends.length
                            ?<> 
                                <Divider horizontal>
                                    <Header as='h4'>
                                    <span className='search-bar-font'>Friends </span> 
                                    </Header>
                                </Divider>
                                {currentUser.total_friends.map(friend => 
                                    <div>
                                        <UserCard key={friend.id} {...friend} status="profile"/>
                                    </div>
                                )}
                            </>
                            :   <Divider horizontal>
                                    <Header as='h4'>
                                    <span className='search-bar-font'> No Friends Listed</span> 
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
  
  export default withRouter(connect(msp, mdp)(ProfileDisplayGamesCreated));
