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
import { Divider, Header, Icon } from 'semantic-ui-react'
import ScheduledGCUser from '../../ScheduledGame/ScheduledGCUser'
import moment from 'moment'

const ProfileDisplaySGFriendsHost = props => {
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
    useEffect(() => {
        setActiveGamesType('scheduledAndPending')
        setCurrentUnix(moment().unix())
        if (scheduledGames !== null && scheduledGames.length > 0 && currentUser !== null 
            && currentUser.total_friends && currentUser.total_friends.length) {
                let friendHostArray = []
                currentUser.total_friends.forEach(friend => {
                    let matchingFriendsAr= scheduledGames.filter(sg => sg.host_id === friend.id)
                    friendHostArray = friendHostArray.concat(matchingFriendsAr)
                })

            setScheduledGamesAsHost(friendHostArray)
        }
        const interval = setInterval(() => {
            setCurrentUnix(moment().unix())
          }, 60000)
          return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (scheduledGames !== null && scheduledGames.length > 0 && currentUser !== null 
            && currentUser.total_friends && currentUser.total_friends.length) {
                let friendHostArray = []
                currentUser.total_friends.forEach(friend => {
                    let matchingFriendsAr= scheduledGames.filter(sg => sg.host_id === friend.id)
                    friendHostArray = friendHostArray.concat(matchingFriendsAr)
                })
            setScheduledGamesAsHost(friendHostArray)
        }
    }, [scheduledGames])

    

    let filteredGames = () => {
        let gamesFiltered = [...scheduledGamesAsHost]
        gamesFiltered = gamesFiltered.filter(gs => gs.num_vacancies > 0)
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
            
            <div className="container6">
                {thisPageUser && <UserProfileCard user={thisPageUser}/>} 
               
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
                        <> 
                            <div className="index">     
                                <Divider horizontal>
                                    <Header as='h4'>
                                        <Icon name='schedule' />
                                        Scheduled Games
                                    </Header>
                                </Divider>
                                <div>
                                    <SearchBarScheduledGames 
                                        search={search} 
                                        searchType={searchType} 
                                        setSearch={setSearch} 
                                        setSearchType={setSearchType}
                                    />
                                </div>
                                <div>
                                    <FilterScheduledGames setActiveGamesType={setActiveGamesType}/>
                                </div>
                                {  
                                scheduledGames && scheduledGames.length && scheduledGamesAsHost && scheduledGamesAsHost.length
                                ? 
                                <Container fluid>
                                    <Row className='justify-content-center'>
                                        {filteredGames().map(scheduledGame => {
                                            return (
                                                <div className='index-review-divider'>
                                                    <ScheduledGCUser key={scheduledGame.id} {...scheduledGame} source='friendAsHost' />
                                                </div>
                                            )
                                        })}
                                    </Row>
                                </Container>
                                : <div>You Haven't Hosted Any Games</div>} 
                            </div>
                        </>
                        
                        </div>
                    </Col>
                    <Col md={3}>
                        <div>
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
                                :<div>No Friends Listed</div>
                            }
                        </div>
                        <div>
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

export default withRouter(connect(msp, mdp)(ProfileDisplaySGFriendsHost))



