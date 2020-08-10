

import React from 'react';


const FilterPhotosByLikes = props => {

    return (
        <div>
            <label>Likes Count:</label>
            <div>      
                <select name="typeLikesFilter" value={props.typeLikesFilter} onChange={(e) => props.setTypeLikesFilter(e.target.value)}>
                    <option selected value="noLikesFilter">No Likes Filter</option>
                    <option value="minLikes">Minimum Likes</option>
                    <option value="maxLikes">Maximum Likes</option>
                </select>
                <input name="numLikes" value={props.numLikes} onChange={(e) => props.setNumLikes(e.target.value)} />
            </div>
        </div>
    )

}
  
  export default FilterPhotosByLikes;
  