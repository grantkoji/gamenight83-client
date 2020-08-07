import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import * as requests from './requests'
import * as action from './modules/actionCreators/actionCreators'
import {connect} from 'react-redux'

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
    
  },[])


  // <Navbar class="container" />
  // <Switch>
  //   <Route exact path='/users/:id' render={(routerprops) => <UserPage {...routerprops}  />}/> 
  //   <Route exact path='/users' render={(routerprops) => <UsersIndex {...routerprops}  />}/> 
  //   <Route exact path='/reviews' render={(routerprops) => <ReviewsIndex {...routerprops} />}/>
  //   <Route exact path='/gamegram' render={(routerprops) => <GameGramIndex {...routerprops} />} /> 
  //   <Route exact path='/login' render={(routerprops) => <Auth {...routerprops} />}/>
  //   <Route exact path='/games/new' render={(routerprops) => <CreateNewGame {...routerprops} />}/>
  //   <Route exact path='/:id' render={(routerprops) => <GamePage {...routerprops} />}/>
  //   <Route exact path='/' render={(routerprops) => <HomeGames {...routerprops} />}/>
  // </Switch>


  //  this.props.history.push(`/users/${userData.id}`) 
  return (
    <div className="App">
      <h1>This is where we're at.</h1>
      <ul>
        {props.games
        ?
        props.games.map(game => <li>{game.title}</li>)
        : <div>Loading...</div>
        }
      </ul>
    
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    fetchReviews: (reviews) => dispatch(action.fetchReviews(reviews)),
    fetchUsers: (users) => dispatch(action.fetchUsers(users)),
    fetchGames: (games) => dispatch(action.fetchGames(games)),
    fetchGamePhotos: (gamePhotos) => dispatch(action.fetchGamePhotos(gamePhotos)),
  }
}

const mapStateToProps = state => {
  return {
    games: state.games
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(App);
