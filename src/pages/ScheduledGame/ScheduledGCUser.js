import React, {useState, useReducer, useEffect} from 'react';
import {connect} from 'react-redux'
import * as requests from '../../requests.js'
import * as action from '../../modules/actionCreators/actionCreators'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import {Button} from 'react-bootstrap'

const ScheduledGCUser = props => { 

    const {token, id, game, currentUser, host, unix, num_vacancies, public_description, private_directions, privacy,
      addScheduledGamePlayer, removeScheduledGamePlayer, scheduledGamePlayers, addVacancyToScheduledGame, 
      removeVacancyFromScheduledGame, setShowUser, setCurrentGame, source} = props

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
      fetch(`http://localhost:3001/api/v1/scheduled_games/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            num_vacancies: num_vacancies + 1
        })
      })
      .then(res=>{
        addVacancyToScheduledGame(id)
        fetchRemovePlayer()
      })
      .catch(error=>alert(error)) 
    }
    
    const fetchRemovePlayer = () => {
      requests.fetchRemoveGamePlayer(playingThisGameId)
        .then(data => {
          removeScheduledGamePlayer(playingThisGameId)
          setPlayingThisGameId(null)
          alert('You have successfully canceled playing this game.')
        })
    }


   const joinScheduledGame = () => {
    if (num_vacancies <= 0) {
      alert('Unfortunately, this game has filled its vacant spots.')
    } else {
      fetch(`http://localhost:3001/api/v1/scheduled_games/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            num_vacancies: num_vacancies - 1
        })
      })
      .then(res=>{
        removeVacancyFromScheduledGame(id)
        fetchCreateNewGamePlayer()
      })
      .catch(error=>alert(error))
      }
    }

    const fetchCreateNewGamePlayer = () => {
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
        alert('You have successfully signed up for this game. Check your profile for more details from the Game Host.')
      })
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
    
    const sourceChange = () => {

      if (source === 'friendAsHost') {
        return (
          <>
             { playingThisGameId 
            ? <Button variant='outline-danger' onClick={leaveScheduledGame}>Leave This Game</Button>
            : <Button variant='outline-info' onClick={joinScheduledGame}>Join This Game</Button>
          }
          </>
        )
      } else {
        return (
          <div></div>
        )
      }

    }

    return (
      <div className="ui cards" style={{height: "100%"}}>
        <div className="card div-of-photo">
            <div className="content">
              <img className="right floated mini ui image" src={game.image_url}/>
                <div className="header" onClick={redirectToGame} onMouseOver={changePointer}>
                   {game.title}
                </div>
                <div className="meta">
                    {moment.unix(unix).format('llll')}
                </div>     
                <div className="description">
                    <div>Description: {public_description}</div>
                    <div>Directions: {private_directions}</div>
                </div>
            </div>
            <div className="extra content">
                <div>Spots: {num_vacancies} <span onClick={redirectToUserPage} onMouseOver={changePointer}>Host: {host.username}</span></div>
                <> {sourceChange()}
                </>
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
      addVacancyToScheduledGame: (id) => dispatch(action.addVacancyToScheduledGame(id)),
      removeVacancyFromScheduledGame: (id) => dispatch(action.removeVacancyFromScheduledGame(id)),
      setShowUser: (userId) => dispatch(action.setShowUser(userId)),
      setCurrentGame: (gameId) => dispatch(action.setCurrentGame(gameId))
    }
  }
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScheduledGCUser))