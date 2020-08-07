
import React, { Component } from 'react';

class Login extends Component {

  state = {
    username: "",
    password: ""
  }

  state = {
    user: {
      id: 0,
      username: "",
      snacks: []
    }

  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.handleSubmit(this.state)
  }


  handleLoginSubmit = (userInfo) => {
    console.log("Login form has been submitted")
    fetch("http://localhost:4000/users/login", {
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
      props.setCurrentUser(resp.user)
      props.history.push(`users/${resp.user.username}`)
    }
  }
  
  

  






  render() {
    let {username, password} = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Login</h1>
        <label htmlFor="username">Username:</label>
        <input type="text" autoComplete="off" name="username" value={username} onChange={this.handleChange}/>
        <label htmlFor="password">Password:</label>
        <input type="password" autoComplete="off" name="password" value={password} onChange={this.handleChange}/>
        <input type="submit" value="Submit"/>
      </form>
    );
  }

}

export default Login;


