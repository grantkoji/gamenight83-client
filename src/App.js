import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import * as requests from './requests'
import * as action from './modules/actionCreators/actionCreators'
import {connect} from 'react-redux'
import Login from './Auth/Login'
import SignUp from './Auth/SignUp'
import Navbar from './Navbar/Navbar'

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
    console.log(props.games, props.users)
    requests.fetchAllGames()
    .then(gameData => props.fetchGames(gameData))

    requests.fetchAllUsers()
    .then(userData => props.fetchUsers(userData))

    requests.fetchAllReviews()
    .then(reviewData => props.fetchReviews(reviewData))

    requests.fetchAllGamePhotos()
    .then(gamePhotoData => props.fetchGamePhotos(gamePhotoData))
    
    if (localStorage.token) {

      fetch("http://localhost:3001/users/stay_logged_in", {
        headers: {
          "Authorization": localStorage.token
        }
      })
      .then(r => r.json())
      .then(resp => handleResponse(resp))

    }
  },[])

  // state = {
  //   user: {
  //     id: 0,
  //     username: "",
  //     snacks: []
  //   },
  //   token: ""
  // }

  const handleResponse = (resp) => {
    if (resp.message) {
      alert(resp.message)
    } else {
      localStorage.token = resp.token
      props.setCurrentUser(resp.user)
      this.setState(resp, () => {
        this.props.history.push(`users/${resp.user.username}`)
      })
    }
  }


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


  state = {
    user: {
      id: 0,
      username: "",
      snacks: []
    },
    token: ""
  }




  // <Navbar class="container" />
  // <Switch>
  //   <Route exact path='/users/:username' render={(routerprops) => <UserPage {...routerprops}  />}/> 
  //   <Route exact path='/users' render={(routerprops) => <UsersIndex {...routerprops}  />}/> 
  //   <Route exact path='/reviews' render={(routerprops) => <ReviewsIndex {...routerprops} />}/>
  //   <Route exact path='/gamegram' render={(routerprops) => <GameGramIndex {...routerprops} />} /> 
  
  //   <Route exact path='/games/new' render={(routerprops) => <CreateNewGame {...routerprops} />}/>
  //   <Route exact path='/:id' render={(routerprops) => <GamePage {...routerprops} />}/>
  //   <Route exact path='/' render={(routerprops) => <HomeGames {...routerprops} />}/>
  // </Switch>
  // <ul>
  //       {props.games
  //       ?
  //       props.games.map(game => <li>{game.title}</li>)
  //       : <div>Loading...</div>
  //       }
  //     </ul>

  //  this.props.history.push(`/users/${userData.id}`) 
  return (
    <div className="App">
      <h1>This is where we're at.</h1>
      <Navbar />
      <Switch>
        <Route exact path='/login' render={(routerprops) => <Login {...routerprops} handleResponse={handleResponse} />}/>
        <Route exact path='/signup' render={(routerprops) => <SignUp {...routerprops} handleResponse={handleResponse}/>}/>
      </Switch>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    fetchReviews: (reviews) => dispatch(action.fetchReviews(reviews)),
    fetchUsers: (users) => dispatch(action.fetchUsers(users)),
    fetchGames: (games) => dispatch(action.fetchGames(games)),
    fetchGamePhotos: (gamePhotos) => dispatch(action.fetchGamePhotos(gamePhotos)),
    setCurrentUser = (user) => dispatch(action.setCurrentUser(user))

  }
}

const mapStateToProps = state => {
  return {
    games: state.games,
    currentUser: state.currentUser
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(App);
