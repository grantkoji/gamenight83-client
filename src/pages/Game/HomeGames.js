import React, {useState} from 'react';
import {connect} from 'react-redux'
import GameCard from './GameCard'
import SearchBarGames from '../../Components/SearchBars/SearchBarGames'
import FilterGamesByNum from '../../Components/Filters/FilterGamesByNum'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const HomeGames = props => {
    const {games} = props
    let [search, setSearch] = useState('')
    let [searchType, setSearchType] = useState('gameTitle')
    let [typeNumPlayers, setTypeNumPlayers] = useState('noNumPlayers')
    let [numPlayers, setNumPlayers] = useState(0)
    let [typeMinAge, setTypeMinAge] = useState('noMinAge')
    let [minAge, setMinAge] = useState(0)

    

    let filteredGames = () => {
        if (games) {
            let gamesFiltered = [...games]
            if (searchType === 'username') {
                gamesFiltered = gamesFiltered.filter(game => game.creator_username.toLowerCase().includes(search.toLowerCase()))
            } else if (searchType === 'gameCategory') {
                gamesFiltered = gamesFiltered.filter(game => game.game_category.toLowerCase().includes(search.toLowerCase()))
            } else if (searchType === 'gameTitle') {
                gamesFiltered = gamesFiltered.filter(game => game.title.toLowerCase().includes(search.toLowerCase()))
            }
            if (typeNumPlayers === "withNumPlayers") {
                gamesFiltered = gamesFiltered.filter(game => game.max_num_players >= parseInt(numPlayers) && 
                    game.min_num_players <= parseInt(numPlayers))
            } 
            if (typeMinAge === 'withMinAge') {
                gamesFiltered = gamesFiltered.filter(game => game.min_age >= parseInt(minAge))
            }
            return gamesFiltered
        } 
    }
  
 
        
        return (
            <>
                <h1>Welcome</h1>
                <div>
                    <SearchBarGames search={search} searchType={searchType} setSearch={setSearch} setSearchType={setSearchType}/>
                </div>
                <div>
                    <FilterGamesByNum 
                        typeNumPlayers={typeNumPlayers} 
                        setTypeNumPlayers={setTypeNumPlayers}
                        numPlayers={numPlayers}
                        setNumPlayers={setNumPlayers} 
                        typeMinAge={typeMinAge} 
                        setTypeMinAge={setTypeMinAge}
                        minAge={minAge}
                        setMinAge={setMinAge}  
                    />
                </div>
                <div className="index">
                    <Container fluid>
                        <Row>
                            {  
                            games && games.length
                            ? filteredGames().map(game => {
                                return (
                                
                                        <GameCard key={game.id} {...game} />
                                
                                )
                            })
                            : "Loading..."}
                        </Row>
                    </Container>
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
  