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
      gamesFiltered = gamesFiltered.filter(gs => gs.num_vacancies > 0 && gs.game_id === currentGame)
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
                            <div>Schedule a Game</div>
                            <div><ScheduleGamePageForm thisGameId={currentGame} thisGameTitle={thisPageGame.title} /></div>
                            </>}  
                      </div>
                      <div>
                        { token 
                        && <> 
                          <div>Post a Review for {thisPageGame.title} </div>
                          <div><AddReviewForm thisGame={currentGame}/></div>
                          </>}  
                      </div>
                      <div>
                        { token 
                        && <> 
                          <div>Post a Photo for {thisPageGame.title} </div>
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
                              <div>Scheduled Games for {thisPageGame.title}</div>
                              {filteredGames().map(scheduledGame => {
                                  return (
                                      <div>
                                          <ScheduledGCPage key={scheduledGame.id} {...scheduledGame} />
                                      </div>
                                  )
                              })}
                            </>
                        : <div>"Loading..."</div>} 
                        </div>
                      </>}
                    </Col>
                    <Col md={7} >
                      {
                        thisPageGamePhotos && thisPageGamePhotos.length
                          ?<div>
                              <div>Game Photos:</div>
                              <div className="parent-game-page-photos">
                              {thisPageGamePhotos.map(photo => 
                                  <div className="child-game-page-photo">
                                      <GamePhotoCard key={photo.id} {...photo} />
                                  </div>
                              )}
                              </div>
                          </div>
                          : <div>No Game Photos Listed</div>
                      }
                    </Col>
                    <Col md={2}>
                      {
                        thisPageReviews && thisPageReviews.length
                        ? <div>
                            <div>
                            {reviews && thisPageReviews.length 
                              ? <div>Game Review Average: {thisGameReviewAverage()}</div>
                              : null}
                            </div>      
                            <div>Number of Reviews: {thisPageReviews.length}</div>
                            <div>
                            {thisPageReviews.map(review => 
                                <div>
                                    <ReviewOnGamePage key={review.id} {...review} />
                                </div>
                            )}
                            </div>
                        </div>
                        : null
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




