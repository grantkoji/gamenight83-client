

import React from 'react';


const FilterGamesByNum= props => {

    return (
        <div>
            <label>Player Limits</label>
            <div>      
                <select name="typeNumPlayers" value={props.typeNumPlayers} onChange={(e) => props.setTypeNumPlayers(e.target.value)}>
                    <option selected value="noNumPlayers">No Target Number of Players</option>
                    <option value="withNumPlayers">Set Target Number of Players</option>
                </select>
                <input name="numPlayers" value={props.numPlayers} onChange={(e) => props.setNumPlayers(e.target.value)} />
            </div>
            <div>
                <select name="typeMinAge" value={props.typeMinAge} onChange={(e) => props.setTypeMinAge(e.target.value)}>
                    <option selected value="noMinAge">No Minimum Age of Players:</option>
                    <option value="withMinAge">Set Minimum Age of Players</option>
                </select>
                <input name="minAge" value={props.minAge} onChange={(e) => props.setMinAge(e.target.value)} />
            </div>
        </div>
    )

}
  
  export default FilterGamesByNum;
  