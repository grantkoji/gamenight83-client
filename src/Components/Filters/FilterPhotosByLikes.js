

import React from 'react';
import { Dropdown, Menu, Input } from 'semantic-ui-react'

const FilterPhotosByLikes = props => {
    const options = [
        { key: 1, text: 'No Likes Count Filter  ', value: "noLikesFilter" },
        { key: 2, text: 'By Minimum Likes Count', value: "minLikes" },
        { key: 3, text: 'By Maximum Likes Count', value: "maxLikes" },
      ]

    return (
        <div>
              <Menu compact>
                <Dropdown 
                    placeholder=' Filter by Num of Likes?'
                    options={options} 
                    simple item 
                    onChange={(e, data) => props.setTypeLikesFilter(data.value)}/>
            </Menu>
            <div class="ui input">
                <Input name="numLikes" value={props.numLikes} onChange={(e) => props.setNumLikes(e.target.value)} />
            </div>
        </div>
    )

}
  
  export default FilterPhotosByLikes;
  