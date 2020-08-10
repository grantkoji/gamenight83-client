

import React from 'react';


const SortPhotos = props => {
//add time stamp and have most recently made
    return (
        <div>
            <label>Sort Photos:</label>
            <div>      
                <select name="typeSortPhotos" value={props.typeSortPhotos} onChange={(e) => props.setTypeSortPhotos(e.target.value)}>
                    <option selected value="noSortPhotos">No Photo Sort</option>
                    <option value="mostLikes">Most Likes</option>
                    <option value="leastLikes">Least Likes</option>
                    <option value="gameTitle">Game Title</option>
                    <option value="gameCategory">Game Category</option>
                </select>
            </div>
        </div>
    )

}
  
  export default SortPhotos;
  