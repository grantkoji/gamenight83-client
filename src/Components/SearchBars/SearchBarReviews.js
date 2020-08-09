import React from 'react';


const SearchBarReviews= props => {
average_rating
    return (
        <div>
            <label>Search By</label>
            <select name="searchType" value={props.searchType} onChange={props.handleSearchType}>
                <option selected value="gameTitle">Game Title:</option>
                <option value="username">User:</option>
                <option value="content">Review Content:</option>
            </select>
                <input name="search" value={props.search} onChange={props.handleSearch} />
        </div>
    )

}
  
  export default SearchBarReviews;
  