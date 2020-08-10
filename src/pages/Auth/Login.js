
import React, { useState, Component } from 'react';
import * as action from '../../modules/actionCreators/actionCreators'
import {connect} from 'react-redux'

const Login = props => {
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    handleLoginSubmit()
  }


  const handleLoginSubmit = () => {
    console.log("Login form has been submitted")
    fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
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
      props.setCurrentToken(resp.token)
      props.setCurrentUser(resp.user)
      props.setShowUser(resp.user.id)
      // props.history.push(`users/${resp.user.id}`)
      props.history.push(`/users/${resp.user.username.replace(/\s+/g, '')}`)
    }
  }
  

    return (
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label htmlFor="username">Username:</label>
        <input type="text" autoComplete="off" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        <label htmlFor="password">Password:</label>
        <input type="password" autoComplete="off" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button type="Submit">Submit</button>
      </form>
    );
  

}

const mapStateToProps = state => {
  return {
    token: state.token,
    games: state.games  
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: (user) => dispatch(action.setCurrentUser(user)),
    setCurrentToken: (token) => dispatch(action.setCurrentToken(token)),
    setShowUser: (userId) => dispatch(action.setShowUser(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);


