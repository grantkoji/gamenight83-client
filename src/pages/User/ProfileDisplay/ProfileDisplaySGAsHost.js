import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom'
import * as action from '../../../modules/actionCreators/actionCreators'
import UserCard from '../UserCard'
import ReviewCard from '../../Review/ReviewCard'
import GamePhotoCard from '../../GamePhoto/GamePhotoCard'
import GameCard from '../../Game/GameCard'
import {connect} from 'react-redux'
import UserProfileCard from '../UserProfileCard'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



import SearchBarScheduledGames from '../../../Components/SearchBars/SearchBarScheduledGames'
import FilterScheduledGames from '../../../Components/Filters/FilterScheduledGames'
import { Divider, Header, Card } from 'semantic-ui-react'
import ScheduledGCUser from '../../ScheduledGame/ScheduledGCUser'
import moment from 'moment'

const ProfileDisplaySGAsHost = props => {
    const {
        thisPageUser,
        thisUserReviews,
        thisUserGamePhotos,
        thisUserCreatedGames,
        currentUser, 
        scheduledGames
    } = props
    
    
    let [search, setSearch] = useState('')
    let [searchType, setSearchType] = useState('gameTitle')
    let [currentUnix, setCurrentUnix] = useState(0)
    let [activeGamesType, setActiveGamesType] = useState('scheduledAndPending')
    let [scheduledGamesAsHost, setScheduledGamesAsHost] = useState([])
    let [scheduledGamesAsPlayer, setScheduledGamesAsPlayer] = useState([])
    useEffect(() => {
        setActiveGamesType('scheduledAndPending')
        setCurrentUnix(moment().unix())
        if (scheduledGames !== null && scheduledGames.length > 0 && currentUser !== null) {
            setScheduledGamesAsHost(scheduledGames.filter(sg => sg.host_id === currentUser.id))
        }
        const interval = setInterval(() => {
            setCurrentUnix(moment().unix())
          }, 60000)
          return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (scheduledGames !== null && scheduledGames.length > 0 && currentUser !== null) {
            setScheduledGamesAsHost(scheduledGames.filter(sg => sg.host_id === currentUser.id))
        }
    }, [scheduledGames])


    
    // {
    //     "id": 1,
    //     "host_id": 60,
    //     "game_id": 60,
    //     "unix": 15993933,
    //     "num_vacancies": 5,
    //     "status": "Scheduled",
    //     "public_description": "try it",
    //     "private_directions": "zoom like ",
    //     "privacy": "Public",
    //     "host": {
    //     "id": 60,
    //     "name": "Aurea Schneider",
    //     "username": "Jimmy Valmer",
       
    //     },
    //     "game": {
    //     "id": 60,
    //     "title": "Monopoly",
    //     "game_category": "Zoom online or indoors"
    //     }

    

    let filteredGames = () => {
        let gamesFiltered = [...scheduledGamesAsHost]
 
        if (activeGamesType === 'scheduledAndPending') {
            gamesFiltered = gamesFiltered.filter(sg => sg.unix >= parseInt(currentUnix))
        } else if (activeGamesType === 'scheduledAndAnHourAgo') {
            gamesFiltered = gamesFiltered.filter(sg => (sg.unix + 3600) >= parseInt(currentUnix))
        } else if (activeGamesType === 'scheduledAnd4HoursAgo') {
            gamesFiltered = gamesFiltered.filter(sg => (sg.unix + 14400) >= parseInt(currentUnix))
        } else if (activeGamesType === 'scheduledAndADayAgo') {
            gamesFiltered = gamesFiltered.filter(sg => (sg.unix + 86400) >= parseInt(currentUnix))
        } else if (activeGamesType === 'scheduledAndAWeekAgo') {
            gamesFiltered = gamesFiltered.filter(sg => (sg.unix + 604800) >= parseInt(currentUnix))
        } 
        if (searchType === 'username') {
            gamesFiltered = gamesFiltered.filter(sg => sg.host.username.toLowerCase().includes(search.toLowerCase()))
        } else if (searchType === 'gameCategory') {
            gamesFiltered = gamesFiltered.filter(sg => sg.game.game_category.toLowerCase().includes(search.toLowerCase()))
        } else if (searchType === 'gameTitle') {
            gamesFiltered = gamesFiltered.filter(sg => sg.game.title.toLowerCase().includes(search.toLowerCase()))
        }
        gamesFiltered.sort((a, b) => a.unix - b.unix)
        return gamesFiltered
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
                        <span className='search-bar-font'> Your Scheduled Games</span> 
                        </Header>
                    </Divider>
                    <SearchBarScheduledGames 
                        search={search} 
                        searchType={searchType} 
                        setSearch={setSearch} 
                        setSearchType={setSearchType}
                    />
                    <FilterScheduledGames setActiveGamesType={setActiveGamesType}/>
                </div>
            </div>
            <Container fluid>
                <Row className='justify-content-center'>
                    <Col md={3}>
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
                                thisUserCreatedGames && thisUserCreatedGames.length
                                ?<>
                                    <Divider horizontal>
                                        <Header as='h4'>
                                        <span className='search-bar-font'> Created Games</span> 
                                        </Header>
                                    </Divider>
                                        {thisUserCreatedGames.map(game => 
                                                    <GameCard key={game.id} {...game} />
                                        )}
                                </>
                                :<Divider horizontal>
                                    <Header as='h4'>
                                    <span className='search-bar-font'> No Games Created</span> 
                                    </Header>
                                </Divider>
                            }
                        </div>
                    </Col>
                    <Col md={6}>
                        <div>   
                                {  
                                    scheduledGames && scheduledGames.length && scheduledGamesAsHost && scheduledGamesAsHost.length
                                    ? <>
                                        <Divider horizontal>
                                            <Header as='h4'>
                                            <span className='search-bar-font'>Hosted Games </span> 
                                            </Header>
                                        </Divider>
                                        <Card.Group centered>
                                                {filteredGames().map(scheduledGame => {
                                                    return (
                                                            <ScheduledGCUser key={scheduledGame.id} {...scheduledGame} source='profileAsHost' />
                                                    )
                                                })}
                                        </Card.Group>
                
                                    </>
                                    : <Divider horizontal>
                                        <Header as='h4'>
                                        <span className='search-bar-font'> No Games Hosted</span> 
                                        </Header>
                                    </Divider>   
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
                                        <span className='search-bar-font'>Friends </span> 
                                        </Header>
                                    </Divider> 
                                    {currentUser.total_friends.map(friend => 
                                            <UserCard key={friend.id} {...friend} status="profile"/>
                                    )}
                                </>
                                : <Divider horizontal>
                                        <Header as='h4'>
                                        <span className='search-bar-font'> No Friends Listed</span> 
                                        </Header>
                                    </Divider> 
                            }
                            {
                            thisUserReviews && thisUserReviews.length
                            ?<> <Divider horizontal>
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
      showUser: state.showUser,
      scheduledGames: state.scheduledGames
    }
  }
  
  const mdp = dispatch => {
    return {
      setCurrentUser: (user) => dispatch(action.setCurrentUser(user)),
      setCurrentToken: (token) => dispatch(action.setCurrentToken(token)),
      setShowUser: (userId) => dispatch(action.setShowUser(userId))
    }
  }

export default withRouter(connect(msp, mdp)(ProfileDisplaySGAsHost))



// {   filteredGames() && filteredGames().length > 1
//     ?   <Card.Group itemsPerRow={2}>
//         {filteredGames().map(scheduledGame => {
//             return (
//                     <ScheduledGCUser key={scheduledGame.id} {...scheduledGame} source='profileAsHost' />
//             )
//         })}
//         </Card.Group>
//     :  <Card.Group centered>
//         {filteredGames().map(scheduledGame => {
//             return (
//                     <ScheduledGCUser key={scheduledGame.id} {...scheduledGame} source='profileAsHost' />
//             )
//         })}
//         </Card.Group>
// }