import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'

import SearchBarScheduledGames from '../../Components/SearchBars/SearchBarScheduledGames'
import { Divider, Header, Icon, Table } from 'semantic-ui-react'
import ScheduledGCIndex from './ScheduledGCIndex'
import moment from 'moment'
import scheduledGamePlayers from '../../modules/reducers/scheduledGamePlayers';


const ScheduledGamesIndex = props => {
    const {scheduledGames, scheduleGamePlayers} = props
    let [search, setSearch] = useState('')
    let [searchType, setSearchType] = useState('gameTitle')
    let [typeNumPlayers, setTypeNumPlayers] = useState('noNumPlayers')
    let [numPlayers, setNumPlayers] = useState('')
    let [typeMinAge, setTypeMinAge] = useState('noMinAge')
    let [minAge, setMinAge] = useState('')
    let [currentUnix, setCurrentUnix] = useState(0)
    let [activeGamesType, setActiveGamesType] = useState('scheduledAndPending')
    let [scheduledGamesFiltered, setScheduledGamesFiltered] = useState([])
    useEffect(() => {
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
    'scheduledAnd4HoursAgo'

    let filteredGames = () => {
        let gamesFiltered = scheduledGamesFiltered
        gamesFiltered = gamesFiltered.filter(gs => gs.num_vacancies > 0)
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
        return gamesFiltered
    }
  
//

//   
//       <Table.Row>
//         <Table.Cell width={2}>Size</Table.Cell>
//         <Table.Cell>1" x 2"</Table.Cell>
//       </Table.Row>
//       <Table.Row>
//         <Table.Cell>Weight</Table.Cell>
//         <Table.Cell>6 ounces</Table.Cell>
//       </Table.Row>
//       <Table.Row>
//         <Table.Cell>Color</Table.Cell>
//         <Table.Cell>Yellowish</Table.Cell>
//       </Table.Row>
//       <Table.Row>
//         <Table.Cell>Odor</Table.Cell>
//         <Table.Cell>Not Much Usually</Table.Cell>
//       </Table.Row>
//     </Table.Body>
//   </Table>
// </>
{/* <h1 className='try-it'>Welcome</h1>
<div className="games-search-bar">
    <div>
        <SearchBarScheduledGames search={search} searchType={searchType} setSearch={setSearch} setSearchType={setSearchType}/>
    </div>
</div> */}
        
        return (
            <> 
                 <div className="index">     
                    <Divider horizontal>
                        <Header as='h4'>
                            <Icon name='schedule' />
                            Scheduled Games
                        </Header>
                    </Divider>
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
                     {  
                    scheduledGames && scheduledGames.length && scheduledGamesFiltered && scheduledGamesFiltered.length
                    ? 
                    <Table definition>
                        <Table.Body>
                            {filteredGames().map(scheduledGame => {
                                return (
                                    <div>
                                        <ScheduledGCIndex key={scheduledGame.id} {...scheduledGame} />
                                    </div>
                                )
                            })}
                        </Table.Body>
                    </Table>
                    : "Loading..."} 
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
  