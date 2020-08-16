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
    let [numPlayers, setNumPlayers] = useState('')
    let [typeMinAge, setTypeMinAge] = useState('noMinAge')
    let [minAge, setMinAge] = useState('')

    

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
            if (typeNumPlayers === "withNumPlayers" && numPlayers !== '') {
                gamesFiltered = gamesFiltered.filter(game => game.max_num_players >= parseInt(numPlayers) && 
                    game.min_num_players <= parseInt(numPlayers))
            } 
            if (typeMinAge === 'withMinAge' && minAge !== '') {
                gamesFiltered = gamesFiltered.filter(game => game.min_age >= parseInt(minAge))
            }
            return gamesFiltered
        } 
    }
  
 
        
        return (
            <>
                <h1 className='try-it'>Welcome</h1>
                <div className="games-search-bar">
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
                </div>
                <div className="index">
                    <Container fluid>
                        <Row className='justify-content-center'>
                            {  
                            games && games.length
                            ? filteredGames().map(game => {
                                return (
                                    <div className='index-photo-divider'>
                                        <GameCard key={game.id} {...game} />
                                    </div>
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
  