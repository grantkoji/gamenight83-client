import React from 'react'
import { Link } from 'react-router-dom'
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

    // {props.currentUser &&
    //     <Link to='/users/:id'>Username Page</Link>
    //     }
    //     {props.userInfo.userId 
    //     ? <Link to='/login' onClick={props.logoutUser}>Logout</Link>
    //     : <Link to='/login'>Login</Link>}
     return (
       <div className="navbar">
         <Link to='/'>Games</Link>
         <Link to='/games/new'>Create Game</Link>
         <Link to='/reviews'>Reviews</Link>
         <Link to='/gamegram'>GameGram</Link>
         <Link to='/users'>Users</Link>
         <Link to='/signup'>Sign Up</Link>
         {props.currentUser && <Link to='/profile'>{props.currentUser.username} Page</Link>}
         {props.currentToken
         ? <Link to='/logout'>Logout</Link>
         : <Link to='/login'>Login</Link>} 
       </div>
     )
   
 }
 

 const mapStateToProps = state => {
  return {
    token: state.token,
    games: state.games,
    currentUser: state.currentUser
  }
}


export default connect(mapStateToProps)(Navbar);

