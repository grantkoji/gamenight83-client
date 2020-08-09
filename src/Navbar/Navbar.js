import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import * as action from '../modules/actionCreators/actionCreators'
import {connect} from 'react-redux'
{/* <Route exact path='/users/:id' render={(routerprops) => <UserPage {...routerprops}  />}/> 
<Route exact path='/users' render={(routerprops) => <UsersIndex {...routerprops}  />}/> 
<Route exact path='/reviews' render={(routerprops) => <ReviewsIndex {...routerprops} />}/>
<Route exact path='/gamegram' render={(routerprops) => <GameGramIndex {...routerprops} />} /> 
<Route exact path='/login' render={(routerprops) => <Auth {...routerprops} />}/>
<Route exact path='/games/new' render={(routerprops) => <CreateNewGame {...routerprops} />}/>
<Route exact path='/:id' render={(routerprops) => <GamePage {...routerprops} />}/>
<Route exact path='/' render={(routerprops) => <HomeGames {...routerprops} />}/> */}

 
 const Navbar = props => {

    const logoutAction = () => {
      props.logoutUser()
      props.removeCurrentToken()
      localStorage.removeItem("token")
      props.history.push(`/login`)
    }

    const toUserPage = () => {
      props.setShowUser(props.currentUser.id)
      props.history.push(`users/${props.currentUser.id}`)
      // props.history.push(`users/${props.currentUser.username.replace(/\s+/g, '')}`)
    }

  


     return (
       <>
        <div className="navbar">
          <Link to='/'>Games</Link>
          <Link to='/games/new'>Create Game</Link>
          <Link to='/reviews'>Reviews</Link>
          <Link to='/gamegram'>GameGram</Link>
          <Link to='/users'>Users</Link>
          <Link to='/signup'>Sign Up</Link>
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

