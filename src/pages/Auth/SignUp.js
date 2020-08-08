import React, { Component } from 'react';
import * as action from '../../modules/actionCreators/actionCreators'
import {connect} from 'react-redux'
class SignUp extends Component {

  state = {
    username: "",
    password: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.handleSubmit(this.state)
  }
  handleRegisterSubmit = (userInfo) => {

    fetch("http://localhost:3001/api/v1/users", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(userInfo)
    })
      .then(r => r.json())
      .then(resp => this.handleResponse(resp))
    }
  
    handleResponse = (resp) => {
      if (resp.message) {
        alert(resp.message)
      } else {
        localStorage.token = resp.token
        this.props.setCurrentUser(resp.user)
        this.props.history.push(`users/${resp.user.username}`)
        }
    }
    

  render() {
    console.log(this.state)

    let {username, password} = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Sign Up</h1>
        <label htmlFor="username">Username:</label>
        <input type="text" autoComplete="off" name="username" value={username} onChange={this.handleChange}/>
        <label htmlFor="password">Password:</label>
        <input type="password" autoComplete="off" name="password" value={password} onChange={this.handleChange}/>
        <input type="submit" value="Submit"/>
      </form>
    );
  }

}

const mapStateToProps = state => {
  return {
    token: state.token,
    games: state.games,
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchReviews: (reviews) => dispatch(action.fetchReviews(reviews)),
    fetchUsers: (users) => dispatch(action.fetchUsers(users)),
    fetchGames: (games) => dispatch(action.fetchGames(games)),
    fetchGamePhotos: (gamePhotos) => dispatch(action.fetchGamePhotos(gamePhotos)),
    setCurrentUser: (user) => dispatch(action.setCurrentUser(user)),
    setCurrentToken: (token) => dispatch(action.setCurrentToken(token))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);