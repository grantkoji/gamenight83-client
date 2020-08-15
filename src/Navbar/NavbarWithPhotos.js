import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import * as action from '../modules/actionCreators/actionCreators'
import {connect} from 'react-redux'



 
 const NavbarWithPhotos = props => {
    const {currentUser} = props
    
    const logoutAction = () => {
      props.logoutUser()
      props.removeCurrentToken()
      localStorage.removeItem("token")
      localStorage.removeItem("gameId")
      props.history.push(`/login`)
    }

    const toUserPage = () => {
      props.setShowUser(currentUser.id)
      // props.history.push(`users/${props.currentUser.id}`)
      props.history.push(`/users/${currentUser.username.replace(/\s+/g, '')}`)
    }

//     <div className="navbar">
//     <Link to='/'>Games</Link>
//     <Link to='/games/new'>Create Game</Link>
//     <Link to='/reviews'>Reviews</Link>
//     <Link to='/gamegram'>GameGram</Link>
//     <Link to='/users'>Users</Link>
//     {!props.token && <Link to='/signup'>Sign Up</Link>}
//     {props.token && props.currentUser ? <Link onClick={toUserPage}>{props.currentUser.username} Page</Link> : null}
//     {
//       props.token
//       ? <Link to='/login' onClick={logoutAction}>Logout</Link>
//       : <Link to='/login'>Login</Link>
//     } 
//  </div>
    const redirectToReviews = () => {
        props.history.push('/reviews')
    }

    const redirectToUsers = () => {
        props.history.push('/users')
    }

    const redirectToPhotos = () => {
        props.history.push('/gamegram')
    }

    const redirectToGames = () => {
        props.history.push('/')
    }

    const redirectToSignUp = () => {
        props.history.push('/signup')
    }

    const redirectToLogin = () => {
        props.history.push('/login')
    }



     return (
       <>
        <div className='photo-navbar'>
            <img className='navbar-button'src="./reviewsIndex.png" alt="Reviews Index Button" onClick={redirectToReviews}/>
            <img className='navbar-button'src="./usersIndex.png" alt="Users Index Button" onClick={redirectToUsers}/>
            <img className='navbar-button'src="./photosIndex.png" alt="Photos Index Button" onClick={redirectToPhotos}/>
            <img className='navbar-button'src="./gamesIndex.png" alt="Games Index Button" onClick={redirectToGames}/>
            { currentUser ? <img className='navbar-button'src="./userShowPage.png" alt="User Show Page Button" onClick={toUserPage}/>
            : <img className='navbar-button'src="./signup.png" alt="Sign Up Button" onClick={redirectToSignUp}/>}
            { currentUser ? <img className='navbar-button'src="./logout.png" alt="Logout Button" onClick={logoutAction}/>
            : <img className='navbar-button'src="./login.png" alt="Login Button" onClick={redirectToLogin}/>}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavbarWithPhotos))




    //   <div className='photo-navbar'>
    //   <img className='navbar-button'src="./reviewsIndex.png" alt="Reviews Index Button" />
    //   <img className='navbar-button'src="./usersIndex.png" alt="Users Index Button" />
    //   <img className='navbar-button'src="./photosIndex.png" alt="Photos Index Button" />
    //   <img className='navbar-button'src="./gamesIndex.png" alt="Games Index Button" />
    //   { currentUser ? <img className='navbar-button'src="./userShowPage.png" alt="User Show Page Button" />
    //   : <img className='navbar-button'src="./signup.png" alt="Sign Up Button" />}
    //   { currentUser ? <img className='navbar-button'src="./logout.png" alt="Logout Button" />
    //     : <img className='navbar-button'src="./login.png" alt="Login Button" />}
    // </div>