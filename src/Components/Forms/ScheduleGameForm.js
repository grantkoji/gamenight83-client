import React, { useState } from 'react';
import * as action from '../../modules/actionCreators/actionCreators'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import moment from 'moment'

const ScheduleGameForm = props => {
    //pass down selectedGame...which has all attributes of instance
    const {token, currentUser, selectedGame, addScheduledGame, setShowUser, thisGameId, thisGameTitle} = props
    let [numVacancies, setNumVacancies] = useState(1)
    // let [hours, setHours] = useState(0)

    // let [minutes, setMinutes] = useState(0)
    let [date, setDate] = useState('')
    let [unix, setUnix] = useState(0)
    let [publicDescription, setPublicDescription] = useState('')
    let [privateDirections, setPrivateDirections] = useState('')
    let [privacy, setPrivacy] = useState('Public')
    let [time, setTime] = useState('')

    const monthNumHash = {
      '01': 0,
      '02': 1,
      '03': 2,
      '04': 3,
      '05': 4,
      '06': 5,
      '07': 6,
      '08': 7,
      '09': 8,
      '10': 9,
      '11': 10,
      '12': 11,
    }

    const numHash = {
      '00': 0,
      '01': 1,
      '02': 2,
      '03': 3,
      '04': 4,
      '05': 5,
      '06': 6,
      '07': 7,
      '08': 8,
      '09': 9,
      '10': 10,
      '11': 11,
      '12': 12
    }



  const createUnixInput = () => {

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let hours = numHash[time.split(':')[0]]
    let minutes = numHash[time.split(':')[1]]
    let year = parseInt(date.split('-')[0])
    let month = numHash[date.split('-')[1]]
    let day
    if ( day === '01' || day === '02' || day === '03'|| day === '04'|| day === '05'
    || day === '06'|| day === '07'|| day === '08'|| day === '09') {
      day = numHash[date.split('-')[2]]
    } else {
      day = parseInt([date.split('-')][2])
    }
    console.log('hours', hours)
    console.log('minutes', minutes)
    console.log('year', year)
    console.log('month', month)
    console.log('day', day)
    console.log('public description', publicDescription)
    console.log('private directions', privateDirections)
    console.log('numVacancies', numVacancies)
    console.log('privacy', privacy)



    // if (date === '') {
    //     alert('You must set a date to schedule a game')
    // } else if (publicDescription === '') {
    //     alert('Please enter notes for players interested in playing')
    // } else if (privateDescription === '') {
    //     alert('Please enter notes/directions/zoom links to pass along to players who sign up.')
    // } else {
    //     let createUnix = moment()
    //     setUnix(createUnix)
    //     handleFetchCreatePlayedGame()
    // }
  }
  
    const handleFetchCreatePlayedGame = () => {
      fetch("http://localhost:3001/api/v1/scheduled_games", {
          method: "POST",
          headers: {
          "content-type": "application/json",
          "Authorization": token
          },
          body: JSON.stringify({
          game_id: thisGameId,
        //   host_id: currentUser.id, 
          unix, 
          num_vacancies: numVacancies,
          status: "scheduled_with_openings",
          public_description: publicDescription,
          private_directions: privateDirections,
          privacy
          })
      })
      .then(r => r.json())
      .then(resp => handleResponse(resp))
    }

    const handleResponse = (resp) => {
      if (resp.message) {
        alert(resp.message)
      } else {
        setNumVacancies(1)
        setTime('')
        setDate('')
        setUnix(0)
        setPublicDescription('')
        setPrivateDirections('')
        setPrivacy('Public')
        alert(`Thank you for Scheduling your Game!`)
        addScheduledGame(resp.scheduled_game)
        setShowUser(currentUser.id)
        props.history.push(`/users/${currentUser.username.replace(/\s+/g, '')}`)
      }
    }

    // let [hours, setHours] = useState(0)
    // let [AMPM, setAMPM] = useState('AM')
    // let [minutes, setMinutes] = useState(0)
    // let [date, setDate] = useState('')
    // let [privacy, setPrivacy] = useState('Public')
    // <select class="ui dropdown">
    //     <option value="1">1</option>
    //     <option value="2">2</option>
    //     <option value="3">3</option>
    //     <option value="4">4</option>
    //     <option value="5">5</option>
    //     <option value="6">6</option>
    //     <option value="7">7</option>
    //     <option value="8">8</option>
    //     <option value="9">9</option>
    //     <option value="10">10</option>
    //     <option value="11">11</option>
    //     <option value="12">12</option>
    // </select>

  

    //  <select class="ui dropdown">
    //     <option value="AM">AM</option>
    //     <option value="PM">PM</option>
    // </select>

    //String: 2020-08-17
  

  
    //String, 03:03 ...military time already

    // <input type="date" name='date' value={date} onChange={handleInput}/>
    // <input type='time' name='time' value={time} onChange={timeHandleInput} />
    
    return (
        <div className="schedule-game-form">
          <Form className="ui form" onSubmit={handleSubmit}>
            <h3 class="ui dividing header">Game Title: {thisGameTitle}</h3>
            <div className="fields">
              <div className="four wide field">
                <label htmlFor="date">Date:</label>
                <input className='input-schedule-game' type="date" name="date" value={date} onChange={(e) => setDate(e.target.value)}/>
              </div>
              <div className="four wide field">
                <label htmlFor="time">Start Time:</label>
                <input className='input-schedule-game' type="time" name="time" value={time} onChange={(e) => setTime(e.target.value)}/>
              </div>
              <div className="four wide field">
                <label htmlFor="privacy">Game Availability</label>
                <select class="ui dropdown input-schedule-game" name='privacy' value={privacy} onChange={(e) => setPrivacy(e.target.value)}>
                  <option value="Public">Open to the Public</option>
                  <option value="Friends">Friends only</option>
                </select>
              </div>
              <div className="four wide field">
                <label htmlFor="numVacancies">Number of Vacancies</label>
                <select class="ui dropdown input-schedule-game" name='numVacancies' value={numVacancies} onChange={(e) => setNumVacancies(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                </select>
              </div>
            </div>
            <div className="fields">
              <div className="sixteen wide field">
                <label htmlFor="publicDescription">Public Description of Game</label>
                <textarea className='overflow-auto' type="text" autoComplete="off" name="publicDescription" value={publicDescription} onChange={(e) => setPublicDescription(e.target.value)}/><br/>
              </div>
            </div>
            <div className="fields">
              <div className="sixteen wide field">
                <label htmlFor="privateDirections">Private Directions for Game</label>
                <textarea className='overflow-auto' type="text" autoComplete="off" name="privateDirections" value={privateDirections} onChange={(e) => setPrivateDirections(e.target.value)}/><br/>
              </div>
            </div>
            <Button variant="outline-info" type="submit">Submit</Button>
          </Form>
      </div>

    );
  

}

const mapStateToProps = state => {
  return {
    token: state.token,
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentGame: (gameId) => dispatch(action.setCurrentGame(gameId)),
    addGame: (game) => dispatch(action.addGame(game)),
    setShowUser: (id) => dispatch(action.setShowUser(id)),
    addScheduledGame: (game) => dispatch(action.addScheduledGame(game))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScheduleGameForm));


