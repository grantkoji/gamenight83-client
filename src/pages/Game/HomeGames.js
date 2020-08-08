import React from 'react';
import {connect} from 'react-redux'
import GameCard from './GameCard'

const HomeGames = props => {
    
  
    
        const {games} = props
        return (
            <>
                <h1>Welcome</h1>
                
                <div>
                    {  
                    games && games.length
                    ? games.map(game => {
                        return (
                            <div>
                                <GameCard key={game.id} {...game} />
                            </div>
                        )
                    })
                    : "Loading..."}
                </div>
            </>
        )
    

}

const mapStateToProps = state => {
    return {    
      games: state.games
    }
  }
  
  
  
  export default connect(mapStateToProps)(HomeGames);
  