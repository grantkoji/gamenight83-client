import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'

import SearchBarScheduledGames from '../../Components/SearchBars/SearchBarScheduledGames'
import FilterScheduledGames from '../../Components/Filters/FilterScheduledGames'
import { Divider, Header, Icon } from 'semantic-ui-react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import ScheduledGCIndex from './ScheduledGCIndex'
import moment from 'moment'



const ScheduledGamesIndex = props => {
    const {scheduledGames} = props
    let [search, setSearch] = useState('')
    let [searchType, setSearchType] = useState('gameTitle')
    let [currentUnix, setCurrentUnix] = useState(0)
    let [activeGamesType, setActiveGamesType] = useState('scheduledAndPending')
    let [scheduledGamesFiltered, setScheduledGamesFiltered] = useState([])
    useEffect(() => {
        setActiveGamesType('scheduledAndPending')
        setCurrentUnix(moment().unix())
        setScheduledGamesFiltered(scheduledGames)
        const interval = setInterval(() => {
            setCurrentUnix(moment().unix())
          }, 60000)
          return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        setScheduledGamesFiltered(scheduledGames)
    }, [scheduledGames])


    
    // {
    //     "id": 1,
    //     "host_id": 60,
    //     "game_id": 60,
    //     "unix": 15993933,
    //     "num_vacancies": 5,
    //     "status": "Scheduled",
    //     "public_description": "try it",
    //     "private_directions": "zoom like ",
    //     "privacy": "Public",
    //     "host": {
    //     "id": 60,
    //     "name": "Aurea Schneider",
    //     "username": "Jimmy Valmer",
       
    //     },
    //     "game": {
    //     "id": 60,
    //     "title": "Monopoly",
    //     "game_category": "Zoom online or indoors"
    //     }

    

    let filteredGames = () => {
        let gamesFiltered = [...scheduledGamesFiltered]
        gamesFiltered = gamesFiltered.filter(gs => gs.num_vacancies > 0 && gs.privacy !=="Friends")
        if (activeGamesType === 'scheduledAndPending') {
            gamesFiltered = gamesFiltered.filter(sg => sg.unix >= parseInt(currentUnix))
        } else if (activeGamesType === 'scheduledAndAnHourAgo') {
            gamesFiltered = gamesFiltered.filter(sg => (sg.unix + 3600) >= parseInt(currentUnix))
        } else if (activeGamesType === 'scheduledAnd4HoursAgo') {
            gamesFiltered = gamesFiltered.filter(sg => (sg.unix + 14400) >= parseInt(currentUnix))
        } else if (activeGamesType === 'scheduledAndADayAgo') {
            gamesFiltered = gamesFiltered.filter(sg => (sg.unix + 86400) >= parseInt(currentUnix))
        } else if (activeGamesType === 'scheduledAndAWeekAgo') {
            gamesFiltered = gamesFiltered.filter(sg => (sg.unix + 604800) >= parseInt(currentUnix))
        } 
        if (searchType === 'username') {
            gamesFiltered = gamesFiltered.filter(sg => sg.host.username.toLowerCase().includes(search.toLowerCase()))
        } else if (searchType === 'gameCategory') {
            gamesFiltered = gamesFiltered.filter(sg => sg.game.game_category.toLowerCase().includes(search.toLowerCase()))
        } else if (searchType === 'gameTitle') {
            gamesFiltered = gamesFiltered.filter(sg => sg.game.title.toLowerCase().includes(search.toLowerCase()))
        }
        gamesFiltered.sort((a, b) => a.unix - b.unix)
        return gamesFiltered
    }
  
        
        return (
            <> 
                 <div className="index">     
                        <h1 className='try-it'>Scheduled Games</h1>
                        <div className='relocate-search-bars'>
                            <div>
                                <SearchBarScheduledGames 
                                    search={search} 
                                    searchType={searchType} 
                                    setSearch={setSearch} 
                                    setSearchType={setSearchType}
                                />
                            </div>
                            <div>
                                <FilterScheduledGames setActiveGamesType={setActiveGamesType}/>
                            </div>
                        </div>                  
                     {  
                    scheduledGames && scheduledGames.length && scheduledGamesFiltered && scheduledGamesFiltered.length
                    ? 
                    <Container fluid>
                        <Row className='justify-content-center'>
                            {filteredGames().map(scheduledGame => {
                                return (
                                    <div className='index-review-divider'>
                                        <ScheduledGCIndex key={scheduledGame.id} {...scheduledGame} />
                                    </div>
                                )
                            })}
                        </Row>
                    </Container>
                    : <div>No Scheduled Games Loaded</div>} 
                </div>
            </>
        )
    

}

const mapStateToProps = state => {
    return {    
      games: state.games,
      scheduledGames: state.scheduledGames,
      scheduleGamePlayers: state.scheduleGamePlayers
    }
  }
  
  
  
  export default connect(mapStateToProps)(ScheduledGamesIndex);
  