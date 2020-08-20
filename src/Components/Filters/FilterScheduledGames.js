import React from 'react';
import { Dropdown, Menu } from 'semantic-ui-react'
import ReactStars from 'react-rating-stars-component'

const FilterScheduledGames = props => {
  
      const optionsMax = [
        { key: 0, text: 'Pending Games Only', value: 'scheduledAndPending'},
        { key: 1, text: 'Pending + Started an Hour Ago', value: 'scheduledAndAnHourAgo'},
        { key: 2, text: 'Pending + Started Four Hours Ago', value: 'scheduledAnd4HoursAgo'},
        { key: 3, text: 'Pending + Started a Day Ago', value: 'scheduledAndADayAgo'},
        { key: 4, text: 'Pending + Started a Week Ago', value: 'scheduledAndAWeekAgo'},
        { key: 5, text: 'All Games Past and Future', value: 'All'},
        
      ]
    
    return (
        <div className='filter-sg-container'>
            <div>
            <label className='search-bar-font'>Set Game Schedule Visibility</label>
            </div>
              <Menu compact>
                <Dropdown 
                    placeholder='Default: Pending Games Only'
                    options={optionsMax} 
                    simple item 
                    onChange={(e, data) => props.setActiveGamesType(data.value)}/>
            </Menu>        
        </div>
    )

    

}
  
  export default FilterScheduledGames;