import React from 'react'
import { Link } from 'react-router-dom'
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
          {props.token && <Link to='/profile'>{props.currentUser.username} Page</Link>}
          {
            props.token
            ? <Link to='/login' onClick={logoutAction}>Logout</Link>
            : <Link to='/login'>Login</Link>
          } 
       </div>
       </>
     )
   
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
    setCurrentUser: (user) => dispatch(action.setCurrentUser(user)),
    setCurrentToken: (token) => dispatch(action.setCurrentToken(token)),
    logoutUser: () => dispatch(action.logoutUser()),
    removeCurrentToken: () => dispatch(action.removeCurrentToken())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)

