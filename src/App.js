import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, withRouter } from 'react-router-dom'
import NavbarWithPhotos from './Navbar/NavbarWithPhotos'
import Navbar from './Navbar/Navbar'
import * as requests from './requests'
import * as action from './modules/actionCreators/actionCreators'
import {connect} from 'react-redux'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import GamePage from './pages/Game/GamePage'
import HomeGames from './pages/Game/HomeGames'
import GamePhotosIndex from './pages/GamePhoto/GamePhotosIndex'
import ScheduledGamesIndex from './pages/ScheduledGame/ScheduledGamesIndex'

import ReviewsIndex from './pages/Review/ReviewsIndex'
import UsersIndex from './pages/User/UsersIndex'
import UserPage from './pages/User/UserPage'
// import CreateNewGame from './pages/Game/CreateNewGame'
import CreateGameForm from './Components/Forms/CreateGameForm'
// import gameBanner from './public/gameBanner.png'
// import moment from 'moment'
// import * as moment from 'Moment'
import Moment from 'react-moment';
import moment from 'moment'
{/* <Moment format="Do MMMM YYYY - HH:mm">{utcDate}</Moment> */}
// Inside create Game 
// create GameRound Template 


// Single game page -> Play game button -> Game round page if created 
// -> Game results page and change to add images or reviews for game.  
// To get the current date and time, just call moment() with no parameters.

// var now = moment();
// This is essentially the same as calling moment(new Date())
// 0816 16th 2020, 12:23:34 k

// You can create a moment with an array of numbers that mirror the parameters passed to new Date()

// [year, month, day, hour, minute, second, millisecond]

// moment([2010, 1, 14, 15, 25, 0, 0])
// moment([year, month, day, hour, minute, 0, 0])

function App(props) {
  const {currentUser} = props

  useEffect(() => {
    requests.fetchAllGames()
    .then(gameData => props.fetchGames(gameData))

    requests.fetchAllUsers()
    .then(userData => props.fetchUsers(userData))

    requests.fetchAllReviews()
    .then(reviewData => props.fetchReviews(reviewData))

    requests.fetchAllGamePhotos()
    .then(gamePhotoData => props.fetchGamePhotos(gamePhotoData))

    requests.fetchAllFriendships()
    .then(friendshipData => props.fetchFriendships(friendshipData))

    requests.fetchAllScheduledGames()
    .then(scheduledGameData => props.fetchScheduledGames(scheduledGameData))
    
    requests.fetchAllScheduledGamePlayers()
    .then(scheduleGPData => props.fetchScheduledGamePlayers(scheduleGPData))
     
    // requests.fetchAllFriendshipRequests()
    // .then(frData => props.fetchFriendshipRequests(frData))

    // console.log(moment().format('0816 Do 2020, 12:23:34 '))
   
    
    if (localStorage.token) {

      fetch("http://localhost:3001/api/v1/users/stay_logged_in", {
        headers: {
          "Authorization": localStorage.token
        }
      })
      .then(r => r.json())
      .then(resp => handleResponse(resp))
    }

    if (localStorage.gameId) {
      props.setCurrentGame(parseInt(localStorage.gameId))
    }
    // console.log('moment', moment()._d)

    // console.log('moment',+++++++++)
    // winner above

    // console.log('test time', moment([2020, 8, 17, 0, 2, 0, 0]).unix())
    // console.log('test time', moment([2020, 7, 17, 0, 2, 0, 0]).unix())

    // console.log('test time', moment([2020, 7, 17, 0, 23, 0, 0]))
    // var dateObject = moment(dateText,'MM-DD-YYYY');
  //     moment#valueOf simply outputs the number of milliseconds since the Unix Epoch, just like Date#valueOf.

// moment(1318874398806).valueOf(); // 1318874398806
// +moment(1318874398806); // 1318874398806

  },[])


  const handleResponse = (resp) => {
    if (resp.message) {
      alert(resp.message)
    } else {
      localStorage.token = resp.token
      props.setCurrentUser(resp.user)
      props.setCurrentToken(resp.token)
      props.setShowUser(resp.user.id)
      // props.history.push(`users/${resp.user.id}`)
      props.history.push(`/users/${resp.user.username.replace(/\s+/g, '')}`)
    }
  }

  
 
  // <NavbarWithPhotos />
{/* <Navbar /> */}
  return (
    <div className="App">
      <img src={require('./images/gameBannerText.png')} className="imageBanner" alt="Home banner" />
        <NavbarWithPhotos />
      <Switch>
        <Route exact path='/users/:username' render={(routerprops) => <UserPage {...routerprops}  />}/> 
        <Route exact path='/users' render={(routerprops) => <UsersIndex {...routerprops}  />}/> 
        <Route exact path='/games/new' render={(routerprops) => <CreateGameForm  {...routerprops}  />}/> 
        <Route exact path='/games/:id' render={(routerprops) => <GamePage {...routerprops}  />}/>  
        <Route exact path='/gamegram' render={(routerprops) => <GamePhotosIndex {...routerprops} />} /> 
        <Route exact path='/scheduledgames' render={(routerprops) => <ScheduledGamesIndex {...routerprops} />} /> 
        <Route exact path='/reviews' render={(routerprops) => <ReviewsIndex  {...routerprops} />} /> 
        <Route exact path='/login' render={(routerprops) => <Login {...routerprops}  />}/>
        <Route exact path='/signup' render={(routerprops) => <SignUp {...routerprops} />}/>
        <Route exact path='/' render={(routerprops) => <HomeGames {...routerprops} />}/>
      </Switch>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    token: state.token,
    games: state.games,
    users: state.users,
    reviews: state.reviews,
    gamePhotos: state.gamePhotos,
    currentUser: state.currentUser,
    friendships: state.friendships,
    friendshipRequests: state.friendshipRequests
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchReviews: (reviews) => dispatch(action.fetchReviews(reviews)),
    fetchUsers: (users) => dispatch(action.fetchUsers(users)),
    fetchGames: (games) => dispatch(action.fetchGames(games)),
    fetchGamePhotos: (gamePhotos) => dispatch(action.fetchGamePhotos(gamePhotos)),
    setCurrentUser: (user) => dispatch(action.setCurrentUser(user)),
    setCurrentToken: (token) => dispatch(action.setCurrentToken(token)),
    setShowUser: (userId) => dispatch(action.setShowUser(userId)),
    setCurrentGame: (gameId) => dispatch(action.setCurrentGame(gameId)),
    fetchFriendships: (friendships) => dispatch(action.fetchFriendships(friendships)),
    fetchFriendshipRequests: (fRequests) => dispatch(action.fetchFriendshipRequests(fRequests)),
    fetchScheduledGames: (scheduledGames) => dispatch(action.fetchScheduledGames(scheduledGames)),
    fetchScheduledGamePlayers: (scheduledGamePlayers) => dispatch(action.fetchScheduledGamePlayers(scheduledGamePlayers))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
