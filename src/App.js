import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, withRouter } from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import * as requests from './requests'
import * as action from './modules/actionCreators/actionCreators'
import {connect} from 'react-redux'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
// import UserPage from './pages/User/UserPage'
import HomeGames from './pages/Game/HomeGames'
import GamePhotosIndex from './pages/GamePhoto/GamePhotosIndex'
import ReviewsIndex from './pages/Review/ReviewsIndex'
import UsersIndex from './pages/User/UsersIndex'
import UserPage from './pages/User/UserPage'
// import UsersProfileIndex from '/pages/User/UsersProfileIndex'

//  / => games
// /reviews => reviews page
// users => users page 
//gamegram => game_photos page
//users/:username
// /games/new
//Navbar



// Inside create Game 
// create GameRound Template 

// Inside User Page . 
// Create post photo 
// Create post review 

// Reviews index => single game review

// User page => edit user page 

// Single game page -> Play game button -> Game round page if created 
// -> Game results page and change to add images or reviews for game.  

function App(props) {

  useEffect(() => {
    requests.fetchAllGames()
    .then(gameData => props.fetchGames(gameData))

    requests.fetchAllUsers()
    .then(userData => props.fetchUsers(userData))

    requests.fetchAllReviews()
    .then(reviewData => props.fetchReviews(reviewData))

    requests.fetchAllGamePhotos()
    .then(gamePhotoData => props.fetchGamePhotos(gamePhotoData))
    
    if (localStorage.token) {

      fetch("http://localhost:3001/api/v1/users/stay_logged_in", {
        headers: {
          "Authorization": localStorage.token
        }
      })
      .then(r => r.json())
      .then(resp => handleResponse(resp))
    }
  },[])



  const handleResponse = (resp) => {
    if (resp.message) {
      alert(resp.message)
    } else {
      localStorage.token = resp.token
      props.setCurrentUser(resp.user)
      props.setCurrentToken(resp.token)
      props.history.push(`/users/${resp.user.id}`)
      // props.history.push(`users/${resp.user.username}`)
    }
  }

  // state = {
  //   user: {
  //     id: 0,
  //     username: "",
  //     snacks: []
  //   },
  //   token: ""
  // }




  // renderForm = (routerProps) => {
  //   if(routerProps.location.pathname === "/login"){
  //     return <Login
  //      handleResponse={this.handleResponse}
  //     />
  //   } else if (routerProps.location.pathname === "/register") {
  //     return <SignUp
  //        handleResponse={this.handleResponse}
  //     />
  //   }
  // }



  // const renderProfile = (routerProps) => {
  //   if (this.state.token) {
  //     return <UserPage user={this.state.user} token={this.state.token} addNewSnack={this.addNewSnack}/>
  //   } else {
  //     this.props.history.push("/login")
  //   }
  // }

  // <Navbar class="container" />
  // <Switch>
 
  //   <Route exact path='/users' render={(routerprops) => <UsersIndex {...routerprops}  />}/> 
  //   <Route exact path='/reviews' render={(routerprops) => <ReviewsIndex {...routerprops} />}/>
  
  
  //   <Route exact path='/games/new' render={(routerprops) => <CreateNewGame {...routerprops} />}/>
  //   <Route exact path='/:id' render={(routerprops) => <GamePage {...routerprops} />}/>
  
  // </Switch>
  // <ul>
  //       {props.games

  //       props.games.map(game => <li>{game.title}</li>)
  //       : <div>Loading...</div>
  //       }
  //     </ul>
  // '/profile'>
  //  this.props.history.push(`/users/${userData.id}`) 
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path='/users/:id' render={(routerprops) => <UserPage {...routerprops}  />}/> 
        <Route exact path='/users' render={(routerprops) => <UsersIndex {...routerprops}  />}/> 
        <Route exact path='/gamegram' render={(routerprops) => <GamePhotosIndex {...routerprops} />} /> 
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
