import React, {useState} from 'react';
import {connect} from 'react-redux'
import UserCard from './UserCard'
import SearchBarUsers from '../../Components/SearchBars/SearchBarUsers'

const UsersIndex = props => {
    const {users} = props
    let [search, setSearch] = useState('')
    let [searchType, setSearchType] = useState('username')

    let filteredUsers = () => {
        if (users) {
            if (searchType === 'username') {
                return users.filter(user => user.username.toLowerCase().includes(search.toLowerCase()))
            } else if (searchType === 'favGames') {
                return users.filter(user => user.fav_games.toLowerCase().includes(search.toLowerCase()))
            }
        } 
    }
       
        return (
            <>
                <h1>User Profiles:</h1>
                <div>
                    <SearchBarUsers search={search} searchType={searchType} setSearch={setSearch} setSearchType={setSearchType}/>
                </div>
                <div>
                    {  
                    users && users.length
                    ? filteredUsers().map(user => {
                        return (
                            <div>
                                <UserCard key={user.id} {...user}/>
                            </div>
                        )       
                    })
                    : "Loading..."}
                </div>
            </>
        )
    

}

const mapStateToProps = state => {
    return {    
      users: state.users
    }
  }
  
  
  
  export default connect(mapStateToProps)(UsersIndex);
  