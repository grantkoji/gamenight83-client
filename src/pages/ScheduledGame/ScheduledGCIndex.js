import React, {useState, useReducer, useEffect} from 'react';
import {connect} from 'react-redux'
import * as requests from '../../requests.js'
import * as action from '../../modules/actionCreators/actionCreators'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import {Button} from 'react-bootstrap'

const ScheduledGCIndex = props => { 

    const {token, id, game, currentUser, host, unix, num_vacancies, public_description, private_directions, privacy,
      addScheduledGamePlayer, removeScheduledGamePlayer, scheduledGamePlayers, addVacancyToScheduledGame, 
      removeVacancyFromScheduledGame, setShowUser, setCurrentGame} = props

      let [playingThisGameId, setPlayingThisGameId] = useState(null)
  

    useEffect(() => {
      if (scheduledGamePlayers !== null && scheduledGamePlayers.length > 0) {
        scheduledGamePlayers.forEach(sgp => {
          if (sgp.scheduled_game_id === id && sgp.user_id === currentUser.id) {
            setPlayingThisGameId(sgp.id)
          }
        })
      } 
    }, [])

    useEffect(() => {
      if (scheduledGamePlayers !== null && scheduledGamePlayers.length > 0) {
        scheduledGamePlayers.forEach(sgp => {
          if (sgp.scheduled_game_id === id && sgp.user_id === currentUser.id) {
            setPlayingThisGameId(sgp.id)
          }
        })
      } 
    }, [scheduledGamePlayers])


    const leaveScheduledGame = () => {
      requests.fetchRemoveGamePlayer(playingThisGameId)
      .then(data => {
        removeScheduledGamePlayer(playingThisGameId)
        setPlayingThisGameId(null)
        fetchRemovePlayer()
        
      })
    }
    
    const fetchRemovePlayer = () => {
      fetch(`http://localhost:3001/api/v1/scheduled_games/${id}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          num_vacancies: num_vacancies + 1
      })
      })
      .then(res=>res.json())
      .then(data=>{
        addVacancyToScheduledGame(data)
        // alert('You have successfully canceled playing this game.')
      })
      .catch(error=>alert(error)) 
    }


   const joinScheduledGame = () => {
    if (num_vacancies <= 0) {
      alert('Unfortunately, this game has filled its vacant spots.')
    } else {
        fetch('http://localhost:3001/api/v1/scheduled_game_players', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              "Authorization": token
          },
          body: JSON.stringify({
              scheduled_game_id: id
          })
        })
        .then(res=>res.json())
        .then(dataGamePlayer => {
          addScheduledGamePlayer(dataGamePlayer)
          fetchUpdateSGVacancies()
          
        })
      }
    }

    const fetchUpdateSGVacancies = () => {
      fetch(`http://localhost:3001/api/v1/scheduled_games/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            num_vacancies: num_vacancies - 1
        })
      })
      .then(res=>res.json())
      .then(data=>{
        removeVacancyFromScheduledGame(data)
        // alert('You have successfully signed up for this game. Check your profile for more details from the Game Host.')
      })
      .catch(error=>alert(error))
  }
    const redirectToUserPage = () => {
        setShowUser(host.id)
        // props.history.push(`users/${resp.user.id}`)
        props.history.push(`/users/${host.username.replace(/\s+/g, '')}`)
    }

    const redirectToGame = () => {
      props.setCurrentGame(game.id)
      localStorage.gameId = game.id
      props.history.push(`/games/${game.id}`)
    }

    const changePointer = (e) => {  
      e.target.style.cursor = 'pointer'
    }
    

    return (
      <div className="ui cards" style={{height: "100%"}}>
        <div className="card div-of-photo">
            <div className="content">
              <img className="right floated mini ui image" src={game.image_url}/>
                <div className="header" onClick={redirectToGame} onMouseOver={changePointer}>
                  <span className='sg-card-game-title'>{game.title}</span>
                </div>
                <div className="meta">
                    {moment.unix(unix).format('llll')}
                </div>     
                <div className="description">
                    <span className='desc-on-gs-card'>{public_description}</span>
                </div>
            </div>
            <div className="extra content">
                <div>Spots: {num_vacancies} <span onClick={redirectToUserPage} onMouseOver={changePointer}>Host: {host.username}</span></div>
                { playingThisGameId 
                    ? <Button variant='outline-danger' size="sm" onClick={leaveScheduledGame}>Leave This Game</Button>
                    : <Button variant='outline-info' size="sm" onClick={joinScheduledGame}>Join This Game</Button>
                }
            </div>
        </div>
    </div> 
    )
}




const mapStateToProps = state => {
    return {
      token: state.token,
      currentUser: state.currentUser,
      scheduledGamePlayers: state.scheduledGamePlayers
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      addScheduledGamePlayer: (gamePlayer) => dispatch(action.addScheduledGamePlayer(gamePlayer)),
      removeScheduledGamePlayer: (scheduledGamePlayerId) => dispatch(action.removeScheduledGamePlayer(scheduledGamePlayerId)),
      addVacancyToScheduledGame: (gs) => dispatch(action.addVacancyToScheduledGame(gs)),
      removeVacancyFromScheduledGame: (gs) => dispatch(action.removeVacancyFromScheduledGame(gs)),
      setShowUser: (userId) => dispatch(action.setShowUser(userId)),
      setCurrentGame: (gameId) => dispatch(action.setCurrentGame(gameId))
    }
  }
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScheduledGCIndex))