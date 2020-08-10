import React from 'react';


const SearchBarGames= props => {
    //  :min_num_players, :max_num_players, :min_age
    //  Later add filter above also add reviews Total rating 
    //  based on ratings in reviews
    return (
        <div>
            <label>Search By</label>
            <select name="searchType" value={props.searchType} onChange={(e) => props.setSearchType(e.target.value)}>
                <option selected value="gameTitle">Game Title:</option>
                <option value="gameCategory">Game Category:</option>
                <option value="username">Game Creator:</option>
            </select>
                <input name="search" value={props.search} onChange={(e) => props.setSearch(e.target.value)} />
        </div>
    )

}
  
  export default SearchBarGames;
  