

import React from 'react';
import { Dropdown, Menu, Input } from 'semantic-ui-react'

const SortPhotos = (props) => {
const options = [
    { key: 0, text: 'No Photo Sort', value: "noSortPhotos" },
    { key: 1, text: 'Most Likes', value: 'mostLikes' },
    { key: 2, text: 'Least Likes', value: "leastLikes" },
    { key: 3, text: 'Game Title', value: "gameTitle" },
    { key: 4, text: 'Category', value: "gameCategory" }
  ]

    return (
    <div>
        <nbsp /><nbsp />
        <label>Sort Photos</label><nbsp /><nbsp />
        <Menu compact>
            <Dropdown 
                placeholder='Sort by'
                options={options} 
                simple item 
                onChange={(e, data) => props.setTypeSortPhotos(data.value)}/>
        </Menu>
    </div>
    )
}
  
  export default SortPhotos;
  