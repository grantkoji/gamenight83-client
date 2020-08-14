import React from 'react';
import { Dropdown, Menu, Input } from 'semantic-ui-react'

const SearchBarPhotos= props => {

    const options = [
        { key: 1, text: 'Title', value: "gameTitle" },
        { key: 2, text: 'Category', value: "gameCategory" },
        { key: 3, text: 'Username', value: "username" },
        { key: 4, text: 'Caption', value: "caption" }
    ]


    return (
        <div>
            <Menu compact>
                <Dropdown 
                    placeholder='Search By'
                    options={options} 
                    simple item 
                    onChange={(e, data) => props.setSearchType(data.value)}/>
            </Menu>
             <div class="ui input">
                <Input name="search" value={props.search} onChange={(e) => props.setSearch(e.target.value)} />
            </div>
        </div>
    )

}
  
  export default SearchBarPhotos;
  