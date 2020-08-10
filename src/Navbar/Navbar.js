import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import * as action from '../modules/actionCreators/actionCreators'
import {connect} from 'react-redux'


 
 const Navbar = props => {

    const logoutAction = () => {
      props.logoutUser()
      props.removeCurrentToken()
      localStorage.removeItem("token")
      localStorage.removeItem("gameId")
      props.history.push(`/login`)
    }

    const toUserPage = () => {
      props.setShowUser(props.currentUser.id)
      // props.history.push(`users/${props.currentUser.id}`)
      props.history.push(`users/${props.currentUser.username.replace(/\s+/g, '')}`)
    }

  


     return (
       <>
        <div className="navbar">
          <Link to='/'>Games</Link>
          <Link to='/games/new'>Create Game</Link>
          <Link to='/reviews'>Reviews</Link>
          <Link to='/gamegram'>GameGram</Link>
          <Link to='/users'>Users</Link>
          {!props.token && <Link to='/signup'>Sign Up</Link>}
          {props.token && <button onClick={toUserPage}>{props.currentUser.username} Page</button>}
          {
            props.token
            ? <button onClick={logoutAction}>Logout</button>
            : <Link to='/login'>Login</Link>
          } 
       </div>
       </>
     )
   
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
    logoutUser: () => dispatch(action.logoutUser()),
    removeCurrentToken: () => dispatch(action.removeCurrentToken()),
    setShowUser: (userId) => dispatch(action.setShowUser(userId))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar))

