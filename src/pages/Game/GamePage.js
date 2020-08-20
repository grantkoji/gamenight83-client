import React, {useEffect, useState} from 'react';
import { withRouter } from 'react-router-dom'
import * as action from '../../modules/actionCreators/actionCreators'
import ReviewOnGamePage from '../Review/ReviewOnGamePage'
import GamePhotoCard from '../GamePhoto/GamePhotoCard'
import GameProfileCard from './GameProfileCard'
import AddReviewForm from '../../Components/Forms/AddReviewForm'
import AddGamePhotoForm from '../../Components/Forms/AddGamePhotoForm'
import ScheduleGamePageForm from '../../Components/Forms/ScheduleGamePageForm'
import FilterScheduledGames from '../../Components/Filters/FilterScheduledGames'
import ScheduledGCPage from '../ScheduledGame/ScheduledGCPage'
import {connect} from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import moment from 'moment'
import { Divider, Header, Card } from 'semantic-ui-react'

const GamePage = props => {
    const { games, token, users, reviews, gamePhotos, currentGame, scheduledGames} = props
    let thisPageReviews = reviews.filter(review => review.game_id === currentGame)
    let thisPageGamePhotos = gamePhotos.filter(photo => photo.game_id === currentGame)
    let thisPageGame = games.find(game => game.id === currentGame)  
    let [activeGamesType, setActiveGamesType] = useState('scheduledAndPending')
    let [currentUnix, setCurrentUnix] = useState(0)
    let [scheduledGamesFiltered, setScheduledGamesFiltered] = useState([])

    const thisGameReviewAverage = () => {
      let ratingTotal = thisPageReviews.reduce((accumulator, review) => accumulator + review.num_stars, 0)
      return (ratingTotal / thisPageReviews.length).toFixed(2)
    }
    useEffect(() => {
      thisPageReviews = reviews.filter(review => review.game_id === currentGame)
      thisPageGamePhotos = gamePhotos.filter(photo => photo.game_id === currentGame)
      thisPageGame = games.find(game => game.id === currentGame)  
      setScheduledGamesFiltered(scheduledGames)
      setCurrentUnix(moment().unix())
      const interval = setInterval(() => {
        setCurrentUnix(moment().unix())
      }, 60000)
      return () => clearInterval(interval)
  }, [])

    useEffect(() => {
    
      thisPageReviews = reviews.filter(review => review.game_id === currentGame)
      thisPageGamePhotos = gamePhotos.filter(photo => photo.game_id === currentGame)
      thisPageGame = games.find(game => game.id === currentGame)  
      setScheduledGamesFiltered(scheduledGames)
  }, [currentGame, games, scheduledGames])

    let filteredGames = () => {
      let gamesFiltered = [...scheduledGamesFiltered]
      gamesFiltered = gamesFiltered.filter(gs => gs.num_vacancies > 0 && gs.game_id === currentGame && gs.privacy !=="Friends")
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
      gamesFiltered.sort((a, b) => a.unix - b.unix)
      return gamesFiltered
  }
    return (
        <>
          {
            thisPageGame
            ? <div>
                <div>
                  <GameProfileCard thisPageGame={thisPageGame} />
                </div>
                <Container fluid>
                  <Row className='justify-content-center'>
                    <Col md={3}>
                      <div>
                          { token 
                          && <> 
                              <Divider horizontal>
                                      <Header as='h3'>
                                          <span className='search-bar-font'> Schedule a Game for {thisPageGame.title}</span> 
                                      </Header>
                                  </Divider>  
                            <div><ScheduleGamePageForm thisGameId={currentGame} thisGameTitle={thisPageGame.title} /></div>
                            </>}  
                      </div>
                      <div>
                        { token 
                        && <> 
                            <Divider horizontal>
                                  <Header as='h3'>
                                     <span className='search-bar-font'>Post a Review for {thisPageGame.title}</span>
                                  </Header>
                              </Divider>  
                          
                          <div><AddReviewForm thisGame={currentGame}/></div>
                          </>}  
                      </div>
                      <div>
                        { token 
                        && <> 
                          <Divider horizontal>
                                <Header as='h3'>
                                   <span className='search-bar-font'>Post a Photo for {thisPageGame.title}</span>
                                  </Header>
                              </Divider>  
                          <div><AddGamePhotoForm thisGame={currentGame}/></div>
                          </>}  
                      </div>
                      { token &&
                      <>
                        <div>
                          <FilterScheduledGames setActiveGamesType={setActiveGamesType}/>
                        </div>
                        <div>
                          {  
                            scheduledGames && scheduledGames.length && scheduledGamesFiltered && scheduledGamesFiltered.length
                            ? 
                            <>
                            <Divider horizontal>
                              <Header as='h3'>
                              <span className='search-bar-font'>Scheduled Games for {thisPageGame.title}</span>
                                  </Header>
                              </Divider>  
                              {filteredGames().map(scheduledGame => {
                                  return (
                                      <div>
                                          <ScheduledGCPage key={scheduledGame.id} {...scheduledGame} />
                                      </div>
                                  )
                              })}
                            </>
                        : 
                            <Divider horizontal>
                              <Header as='h3'>
                              <span className='search-bar-font'>Loading...</span>
                                  </Header>
                              </Divider>  
                        } 
                        </div>
                      </>}
                    </Col>
                    <Col md={6} >
                      {
                        thisPageGamePhotos && thisPageGamePhotos.length
                          ?<div><Divider horizontal>
                                  <Header as='h3'>
                                  <span className='search-bar-font'>Game Photos</span>
                                    </Header>
                                </Divider> 
                             
                              { thisPageGamePhotos.length > 1
                                ? <Card.Group itemsPerRow={2}>
                                  {thisPageGamePhotos.map(photo => 
                                      <GamePhotoCard key={photo.id} {...photo} />
                                  )}
                                  </Card.Group>
                                : <Card.Group centered>
                                  {thisPageGamePhotos.map(photo => 
                                    
                                      <GamePhotoCard key={photo.id} {...photo} />
                                    
                                  )}
                                  </Card.Group>
                            }
                          </div>
                          :   <Divider horizontal>
                              <Header as='h3'>
                              <span className='search-bar-font'>No Game Photos Listed</span>
                                  </Header>
                              </Divider>  
                      }
                    </Col>
                    <Col md={3}>
                      {
                        reviews && thisPageReviews && thisPageReviews.length
                        ? <div>
                             <Divider horizontal>
                                <Header as='h3'>
                                    <span className='search-bar-font'>Review Avg: {thisGameReviewAverage()} - Count: {thisPageReviews.length}</span>
                                </Header>
                            </Divider>                           
                            {thisPageReviews.map(review => 
                                <div>
                                    <ReviewOnGamePage key={review.id} {...review} />
                                </div>
                            )}                      
                        </div>
                        :   <Divider horizontal>
                              <Header as='h3'>
                              <span className='search-bar-font'>No Game Reviews Listed</span>
                                  </Header>
                              </Divider>  
                      }
                    </Col>
                  </Row>
                </Container>            
            </div>
        : <div>Loading...</div>}
      </>
    )
}


const mapStateToProps = state => {
    return {
      token: state.token,
      games: state.games,
      users: state.users,
      reviews: state.reviews,
      gamePhotos: state.gamePhotos,
      showUser: state.showUser,
      currentGame: state.currentGame,
      scheduledGames: state.scheduledGames
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      setCurrentToken: (token) => dispatch(action.setCurrentToken(token)),
      setShowUser: (userId) => dispatch(action.setShowUser(userId)),
      setCurrentGame: (gameId) => dispatch(action.setCurrentGame(gameId))
    }
  }
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GamePage));




