import React, { useState } from 'react';
import * as action from '../../modules/actionCreators/actionCreators'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import moment from 'moment'

const ScheduleGameForm = props => {
    //pass down selectedGame...which has all attributes of instance
    const {token, currentUser, selectedGame, addScheduledGame, setShowUser} = props
    let [numVacancies, setNumVacancies] = useState(1)
    let [hours, setHours] = useState(0)
    let [AMPM, setAMPM] = useState('AM')
    let [minutes, setMinutes] = useState(0)
    let [date, setDate] = useState('')
    let [unix, setUnix] = useState(0)
    let [publicDescription, setPublicDescription] = useState('')
    let [privateDirections, setPrivateDirections] = useState('')
    let [privacy, setPrivacy] = useState('Public')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (date === '') {
        alert('You must set a date to schedule a game')
    } else if (publicDescription === '') {
        alert('Please enter notes for players interested in playing')
    } else if (privateDescription === '') {
        alert('Please enter notes/directions/zoom links to pass along to players who sign up.')
    } else {
        let createUnix = moment()
        setUnix(createUnix)
        handleFetchCreatePlayedGame()
    }
  }
  
    const handleFetchCreatePlayedGame = () => {
      fetch("http://localhost:3001/api/v1/scheduled_games", {
          method: "POST",
          headers: {
          "content-type": "application/json",
          "Authorization": token
          },
          body: JSON.stringify({
          game_id: selectedGame.id,
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
        setHours(0)
        setAMPM('AM')
        setMinutes(0)
        setDate('')
        setUnix(0)
        setPublicDescription('')
        setPrivateDirections('')
        setPrivacy('Public')
        alert(`Thank you for Scheduling your Game!`)
        addScheduledGame(resp)
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

    // <select class="ui dropdown">
    //     <option value="0">:00</option>
    //     <option value="15">:15</option>
    //     <option value="30">:30</option>
    //     <option value="45">:45</option>
    // </select>

    //  <select class="ui dropdown">
    //     <option value="AM">AM</option>
    //     <option value="PM">PM</option>
    // </select>



    return (
        <div className="new-game-form">
          <Form className="ui form" onSubmit={handleSubmit}>
            <h3 class="ui dividing header">Schedule a Game for {selectedGame.title}</h3>
            <div className="fields">
              <div className="eight wide field">
                <label htmlFor="title">Title: {selectedGame.title}</label>
                <input className='create-input-field' type="text" autoComplete="off" name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
              </div>
              <div className="eight wide field">
                <label htmlFor="gameCategory">Category:</label>
                <input className='create-input-field' type="text" autoComplete="off" name="gameCategory" value={gameCategory} onChange={(e) => setGameCategory(e.target.value)}/>
            </div>
            </div>
            <div className="fields">
              <div className="sixteen wide field">
                <label htmlFor="description">Description:</label>
                <input className='overflow-auto' type="text" autoComplete="off" name="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
              </div>
            </div>
            <div className="fields">
                <div className="six wide field">
                  <label htmlFor="minNumPlayers">Minimum Number of Players:</label>
                  <input className='create-input-field' type="number" autoComplete="off" name="minNumPlayers" value={minNumPlayers} onChange={(e) => setMinNumPlayers(e.target.value)}/>
                </div>
                <div className="six wide field">
                  <label htmlFor="maxNumPlayers">Maximum Number of Players:</label>
                  <input className='create-input-field' type="number" autoComplete="off" name="maxNumPlayers" value={maxNumPlayers} onChange={(e) => setMaxNumPlayers(e.target.value)}/>
                </div>
                <div className="five wide field">
                  <label htmlFor="minAge">Minimum Age:</label>
                  <input className='create-input-field' type="number" autoComplete="off" name="minAge" value={minAge} onChange={(e) => setMinAge(e.target.value)}/>
                </div>
            </div>
            <div className="fields">
                <div className="eight wide field">
                  <label htmlFor="linkToGameWebsite">Link to Game Website or More Instructions:</label>
                  <input type="text" autoComplete="off" name="linkToGameWebsite" value={linkToGameWebsite} onChange={(e) => setLinkToGameWebsite(e.target.value)}/>
                </div>
                <div className="eight wide field">
                  <label htmlFor="imageUrl">Link to Photo of Game:</label>
                  <input type="text" autoComplete="off" name="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}/>
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
                <label htmlFor="privateDirections">Public Description of Game</label>
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


