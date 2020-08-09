import React from 'react';


const SearchBarPhotos= props => {

    return (
        <div>
            <label>Search By</label>
            <select name="searchType" value={props.searchType} onChange={props.handleSearchType}>
                <option selected value="gameTitle">Game Title:</option>
                <option value="username">User:</option>
                <option value="caption">Caption:</option>
            </select>
                <input name="search" value={props.search} onChange={props.handleSearch} />
        </div>
    )

}
  
  export default SearchBarPhotos;
  