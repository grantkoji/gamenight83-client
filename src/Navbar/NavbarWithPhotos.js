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

    const redirectToNewGame = () => {
      props.history.push('/games/new')
    }

    const redirectToScheduledGames = () => {
      props.history.push('/scheduledgames')
    }


    const changePointer = (e) => {  
      e.target.style.cursor = 'pointer'
    }

            
     return (
       <>
       <div className='top-left-navbar'>
       <img src={require('../images/createNewGame600.png')} className='top-left-nav-button' alt="Create New Game Button" onClick={redirectToNewGame} onMouseOver={changePointer} />
       </div>
       <div className='top-right-navbar'>
            <img src={require('../images/schedule.png')} className='top-right-nav-button' alt="Game Schedule Button" onClick={redirectToScheduledGames} onMouseOver={changePointer} />
       </div>
        <div className='photo-navbar'>
            <img src={require('../images/reviewsIndex.png')} className='navbar-button' alt="Reviews Index Button" onClick={redirectToReviews} onMouseOver={changePointer} />
            <img src={require('../images/usersIndex3.png')} className='navbar-button' alt="Users Index Button" onClick={redirectToUsers} onMouseOver={changePointer}/>
            <img src={require('../images/photosIndex.png')} className='navbar-button' alt="Photos Index Button" onClick={redirectToPhotos} onMouseOver={changePointer}/>
            <img src={require('../images/gamesIndex.png')} className='navbar-button' alt="Games Index Button" onClick={redirectToGames} onMouseOver={changePointer} />
            { currentUser ? 
            <img src={require('../images/userShowPg.png')} className='navbar-button' alt="User Show Page Button" onClick={toUserPage} onMouseOver={changePointer} />
            :<img src={require('../images/signup.png')} className='navbar-button' alt="Sign Up Button" onClick={redirectToSignUp} onMouseOver={changePointer} />}    
            { currentUser ? <img src={require('../images/logoutButton.png')} className='navbar-button' alt="Logout Button" onClick={logoutAction} onMouseOver={changePointer} />
            : <img src={require('../images/login300.png')} className='navbar-button' alt="Login Button" onClick={redirectToLogin} onMouseOver={changePointer}/>}
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