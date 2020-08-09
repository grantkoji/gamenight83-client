import React, { useState } from 'react';
import * as action from '../../modules/actionCreators/actionCreators'
import {connect} from 'react-redux'

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
        props.history.push(`/`)
        }
    }

   
    return (
      <div>
        <div>
          <h1>Sign Up</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input type="text" autoComplete="off" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
          <label htmlFor="password">Password:</label>
          <input type="password" autoComplete="off" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" autoComplete="off" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
          <label htmlFor="name">Name:</label>
          <input type="text" autoComplete="off" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
          <label htmlFor="favGames">Favorite Games:</label>
          <input type="text" autoComplete="off" name="favGames" value={favGames} onChange={(e) => setFavGames(e.target.value)}/>
          <label htmlFor="age">Age:</label>
          <input type="number" autoComplete="off" name="age" value={age} onChange={(e) => setAge(e.target.value)}/>
          <button type="Submit">Submit</button>
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
    setCurrentToken: (token) => dispatch(action.setCurrentToken(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
