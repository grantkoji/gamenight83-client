import React, {useEffect} from 'react';
import { withRouter } from 'react-router-dom'
import * as action from '../../modules/actionCreators/actionCreators'
import ReviewOnGamePage from '../Review/ReviewOnGamePage'
import GamePhotoCard from '../GamePhoto/GamePhotoCard'
import GameProfileCard from './GameProfileCard'
import AddReviewForm from '../../Components/Forms/AddReviewForm'
import AddGamePhotoForm from '../../Components/Forms/AddGamePhotoForm'
import ScheduleGamePageForm from '../../Components/Forms/ScheduleGamePageForm'
import {connect} from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const GamePage = props => {
    const { games, token, users, reviews, gamePhotos, currentGame} = props
    let thisPageReviews = reviews.filter(review => review.game_id === currentGame)
    let thisPageGamePhotos = gamePhotos.filter(photo => photo.game_id === currentGame)
    let thisPageGame = games.find(game => game.id === currentGame)  

    const thisGameReviewAverage = () => {
      let ratingTotal = thisPageReviews.reduce((accumulator, review) => accumulator + review.num_stars, 0)
      return (ratingTotal / thisPageReviews.length).toFixed(2)
    }

    useEffect(() => {
      thisPageReviews = reviews.filter(review => review.game_id === currentGame)
      thisPageGamePhotos = gamePhotos.filter(photo => photo.game_id === currentGame)
      thisPageGame = games.find(game => game.id === currentGame)  
  }, [])

    useEffect(() => {
      thisPageReviews = reviews.filter(review => review.game_id === currentGame)
      thisPageGamePhotos = gamePhotos.filter(photo => photo.game_id === currentGame)
      thisPageGame = games.find(game => game.id === currentGame)  
  }, [currentGame, games])

  //      <div class="ui grid">
  // <div class="four wide column"></div>
  // <div class="four wide column"></div>
  // <div class="four wide column"></div>
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
      currentGame: state.currentGame
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




