import React, { Component } from 'react';
import * as action from '../../modules/actionCreators/actionCreators'
import {connect} from 'react-redux'
class HomeGames extends Component {

    render() {
        const {games} = this.props
        return (
            <>
                <h1>Welcome</h1>
                
                <div>
                    {  
                    games 
                    ? games.map(game => {
                        return (
                            <div>
                            <img src={game["image_url"]} alt={game.title} />
                            <div>{game.title}</div>
                            </div>
                        )
                    })
                    : "Loading..."}
                </div>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {    
      games: state.games
    }
  }
  
  
  
  export default connect(mapStateToProps)(HomeGames);
  