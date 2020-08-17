import React, {useState} from 'react';
import {connect} from 'react-redux'

import SearchBarScheduledGames from '../../Components/SearchBars/SearchBarScheduledGames'
import { Divider, Header, Icon, Table } from 'semantic-ui-react'
import ScheduledGC from './ScheduledGC'


const ScheduledGamesIndex = props => {
    const {scheduledGames} = props
    let [search, setSearch] = useState('')
    let [searchType, setSearchType] = useState('gameTitle')
    let [typeNumPlayers, setTypeNumPlayers] = useState('noNumPlayers')
    let [numPlayers, setNumPlayers] = useState('')
    let [typeMinAge, setTypeMinAge] = useState('noMinAge')
    let [minAge, setMinAge] = useState('')

    

    let filteredGames = () => {
        // if (games) {
        //     let gamesFiltered = [...scheduledGames]
        //     gamesFilter
        //     if (searchType === 'username') {
        //         gamesFiltered = gamesFiltered.filter(game => game.creator_username.toLowerCase().includes(search.toLowerCase()))
        //     } else if (searchType === 'gameCategory') {
        //         gamesFiltered = gamesFiltered.filter(game => game.game_category.toLowerCase().includes(search.toLowerCase()))
        //     } else if (searchType === 'gameTitle') {
        //         gamesFiltered = gamesFiltered.filter(game => game.title.toLowerCase().includes(search.toLowerCase()))
        //     }
        //     if (typeNumPlayers === "withNumPlayers" && numPlayers !== '') {
        //         gamesFiltered = gamesFiltered.filter(game => game.max_num_players >= parseInt(numPlayers) && 
        //             game.min_num_players <= parseInt(numPlayers))
        //     } 
        //     if (typeMinAge === 'withMinAge' && minAge !== '') {
        //         gamesFiltered = gamesFiltered.filter(game => game.min_age >= parseInt(minAge))
        //     }
        //     return gamesFiltered
        // } 
        return [...scheduledGames]
    
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
                     {  
                    scheduledGames && scheduledGames.length
                    ? 
                    <Table definition>
                        <Table.Body>
                            {filteredGames().map(scheduledGame => {
                                return (
                                    <div>
                                        <ScheduledGC key={scheduledGame.id} {...scheduledGame} />
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
      scheduledGames: state.scheduledGames
    }
  }
  
  
  
  export default connect(mapStateToProps)(ScheduledGamesIndex);
  