import React, { useState } from 'react';
import * as action from '../../modules/actionCreators/actionCreators'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'

const CreateGameForm = props => {
    const {token, currentUser, setCurrentGame} = props
    let [title, setTitle] = useState('')
    let [minNumPlayers, setMinNumPlayers] = useState('');
    let [maxNumPlayers, setMaxNumPlayers] = useState('');
    let [minAge, setMinAge] = useState('');
    let [description, setDescription] = useState('');
    let [instructionsAndRules, setInstructionsAndRules] = useState('');
    let [imageUrl, setImageUrl] = useState('')
    let [linkToGameWebsite, setLinkToGameWebsite] = useState('')
    let [gameCategory, setGameCategory] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title === ''
        || minNumPlayers === ''
        || maxNumPlayers === ''
        || minAge === ''
        || description === ''
        || instructionsAndRules === ''
        || imageUrl === ''
        || linkToGameWebsite === ''
        || gameCategory === ''
    ) {
        alert('You must fill out all input fields to post a game')
    } else {
        handleCreateGameFetch()
    }
  }
  
    const handleCreateGameFetch = () => {
      fetch("http://localhost:3001/api/v1/games", {
          method: "POST",
          headers: {
          "content-type": "application/json",
          "Authorization": token
          },
          body: JSON.stringify({
          title,
          min_num_players: parseInt(minNumPlayers),
          max_num_players: parseInt(maxNumPlayers),
          min_age: parseInt(minAge),
          description,
          instructions_and_rules: instructionsAndRules,
          image_url: imageUrl,
          link_to_game_website: linkToGameWebsite,
          game_category: gameCategory
          })
      })
      .then(r => r.json())
      .then(resp => handleResponse(resp))
    }

    const handleResponse = (resp) => {
      if (resp.message) {
        alert(resp.message)
      } else {
        setTitle('')
        setMinNumPlayers('')
        setMaxNumPlayers('')
        setMinAge('')
        setDescription('');
        setInstructionsAndRules('');
        setImageUrl('')
        setLinkToGameWebsite('')
        setGameCategory('')
        alert(`Thank you for posting your Game!`)
        props.addGame(resp)
        props.setCurrentGame(resp.id)
        localStorage.gameId = resp.id
        props.history.push(`/games/${resp.id}`)
      }
    }
  

    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input type="text" autoComplete="off" name="title" value={title} onChange={(e) => setTitle(e.target.value)}/><br/>
        <label htmlFor="gameCategory">Category:</label>
        <input type="textarea" autoComplete="off" name="gameCategory" value={gameCategory} onChange={(e) => setGameCategory(e.target.value)}/><br/>
        <label htmlFor="description">Description:</label>
        <input type="textarea" autoComplete="off" name="description" value={description} onChange={(e) => setDescription(e.target.value)}/><br/>
        <label htmlFor="minNumPlayers">Minimum Number of Players:</label>
        <input type="number" autoComplete="off" name="minNumPlayers" value={minNumPlayers} onChange={(e) => setMinNumPlayers(e.target.value)}/><br/>
        <label htmlFor="maxNumPlayers">Maximum Number of Players:</label>
        <input type="number" autoComplete="off" name="maxNumPlayers" value={maxNumPlayers} onChange={(e) => setMaxNumPlayers(e.target.value)}/><br/>
        <label htmlFor="minAge">Minimum Age:</label>
        <input type="number" autoComplete="off" name="minAge" value={minAge} onChange={(e) => setMinAge(e.target.value)}/><br/>
        <label htmlFor="linkToGameWebsite">Link to Game Website, Application Download, or Further Instructions:</label>
        <input type="textarea" autoComplete="off" name="linkToGameWebsite" value={linkToGameWebsite} onChange={(e) => setLinkToGameWebsite(e.target.value)}/><br/>
        <label htmlFor="imageUrl">Link to Photo of Game:</label>
        <input type="textarea" autoComplete="off" name="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}/><br/>
        <label htmlFor="instructionsAndRules">Game Instructions and Rules:</label>
       <input type="textarea" autoComplete="off" name="instructionsAndRules" value={instructionsAndRules} onChange={(e) => setInstructionsAndRules(e.target.value)}/><br/>
        <button type="Submit">Submit</button>
      </form>
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
    addGame: (game) => dispatch(action.addGame(game))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateGameForm));


