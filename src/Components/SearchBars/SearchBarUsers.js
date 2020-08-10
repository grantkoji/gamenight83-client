import React from 'react';


const SearchBarUsers= props => {

    return (
        <div>
            <label>Search By</label>
            <select name="searchType" value={props.searchType} onChange={(e) => props.setSearchType(e.target.value)}>        
                <option selected value="username">Username:</option>
                <option value="favGames">Favorite Games:</option>
            </select>
                <input name="search" value={props.search} onChange={(e) => props.setSearch(e.target.value)} />
        </div>
    )

}
  
  export default SearchBarUsers;
  