import React from 'react';


const SearchBarPhotos= props => {

    return (
        <div>
            <label>Search By</label>
            <select name="searchType" value={props.searchType} onChange={(e) => props.setSearchType(e.target.value)}>
                <option selected value="gameTitle">Game Title:</option>
                <option value="gameCategory">Game Category:</option>
                <option value="username">User:</option>
                <option value="caption">Caption:</option>
            </select>
                <input name="search" value={props.search} onChange={(e) => props.setSearch(e.target.value)} />
        </div>
    )

}
  
  export default SearchBarPhotos;
  