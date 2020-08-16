

import React, {useState} from 'react';
import { Dropdown, Menu, Input } from 'semantic-ui-react'

{/* <div>
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
</div> */}

     {/* <div className="ui compact menu"> */}
                {/* <div className="ui simple dropdown item"> */}
{/* <div className="ui selection dropdown" >
                    {/* Number of Players */}
                //     <i className="dropdown icon"></i>
                //     <div className="menu" name="typeNumPlayers" value={props.typeNumPlayers} onChange={(e) => props.setTypeNumPlayers(e.target.value)}>
                //         <a className="item" selected value="noNumPlayers">No Target Number of Players</a>
                //         <a className="item" value="withNumPlayers">Set Target Number of Players</a>
                //     </div>
                // </div> */}

const FilterGamesByNum= props => {
    // let [dropdownText, setDropdownText] = useState('No Target Number of Players')
    const options = [
        { key: 1, text: 'No Target Number of Players', value: "noNumPlayers" },
        { key: 2, text: 'Set Target Number of Players', value: "withNumPlayers" },
      ]
    //   text={dropdownText} 
    //   onChange={(e, data) => setDropdownText(data.text)}
    const ageOptions = [
        { key: 1, text: 'No Player Age Minimum', value: "noMinAge" },
        { key: 2, text: 'Set Player Age Minimum', value: "withMinAge" }
    ]
    return (
        <div>
            <Menu compact>
                <Dropdown 
                    placeholder='Target Number of Players?'
                    options={options} 
                    simple item 
                    onChange={(e, data) => props.setTypeNumPlayers(data.value)}/>
            </Menu>
            <div class="ui input">
                <Input name="numPlayers" value={props.numPlayers} onChange={(e) => props.setNumPlayers(e.target.value)} />
            </div><br/>
            <Menu compact>
                <Dropdown 
                    placeholder='Minimum Age of Players?'
                    options={ageOptions} 
                    simple item 
                    onChange={(e, data) => props.setTypeMinAge(data.value)}/>
            </Menu>
            <div class="ui input">
                <Input name="minAge" value={props.minAge} onChange={(e) => props.setMinAge(e.target.value)} />
            </div>
        </div>
    )

}
  
  export default FilterGamesByNum;
  