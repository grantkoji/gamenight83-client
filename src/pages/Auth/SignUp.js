import React, { useState } from 'react';
import * as action from '../../modules/actionCreators/actionCreators'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'

const SignUp = props => {

    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    let [confirmPassword, setConfirmPassword] = useState('');
    let [name, setName] = useState('');
    let [favGames, setFavGames] = useState('');
    let [age, setAge] = useState('');


    const handleSubmit = (e) => {
      e.preventDefault()
      if (password !== confirmPassword) {
        alert("Passwords must match")
      } else if (username === "" && password === "") {
        alert("Must enter a username and password")
      } else if (name === "") {
        alert("Must enter a name")
      }  else if (favGames === "") {
        alert("Must enter a Favorite Game")
      } else if (age === "") {
        alert("Must enter an age")
      } else {
        handleRegisterSubmit()
      }
    }

    const handleRegisterSubmit = () => {
    fetch("http://localhost:3001/api/v1/users", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        username,
        password,
        name,
        age: parseInt(age),
        fav_games: favGames
      })
    })
      .then(r => r.json())
      .then(resp => handleResponse(resp))
    }
  
    const handleResponse = (resp) => {
      if (resp.message) {
        alert(resp.message)
      } else {
        localStorage.token = resp.token
        props.setCurrentUser(resp.user)
        props.setShowUser(resp.user.id)
        props.addUser(resp.user)
        // props.history.push(`users/${resp.user.id}`)
        props.history.push(`/users/${resp.user.username.replace(/\s+/g, '')}`)
        }
    }

   
    return (
      <div>
        <form className="ui form" onSubmit={handleSubmit}>
        <h3 class="ui dividing header">Sign Up</h3>
          <div className="fields">
            <div className="eight wide field">
              <label htmlFor="username">Username:</label>
              <input className='create-input-field' type="text" autoComplete="off" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className="eight wide field">
              <label htmlFor="name">Name:</label>
              <input className='create-input-field' type="text" autoComplete="off" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
           </div>
          </div>
          <div className="fields">
            <div className="eight wide field">
              <label htmlFor="password">Password:</label>
              <input className='create-input-field' type="password" autoComplete="off" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="eight wide field">
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input className='create-input-field' type="password" autoComplete="off" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            </div>
          </div>
            <div className="fields">
              <div className="ten wide field">
                <label htmlFor="favGames">Favorite Games:</label>
                <input className='create-input-field' type="text" autoComplete="off" name="favGames" value={favGames} onChange={(e) => setFavGames(e.target.value)}/>
              </div>
              <div className="six wide field">
                <label htmlFor="age">Age:</label>
                <input className='create-input-field' type="number" autoComplete="off" name="age" value={age} onChange={(e) => setAge(e.target.value)}/>
              </div>
            </div>
          <Button variant="outline-info" type="submit">Submit</Button>
        </form>
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
    setCurrentUser: (user) => dispatch(action.setCurrentUser(user)),
    setCurrentToken: (token) => dispatch(action.setCurrentToken(token)),
    setShowUser: (userId) => dispatch(action.setShowUser(userId)),
    addUser: (user) => dispatch(action.addUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
