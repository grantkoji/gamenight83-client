import React, {useState} from 'react';
import {connect} from 'react-redux'
import UserCard from './UserCard'
import SearchBarUsers from '../../Components/SearchBars/SearchBarUsers'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'


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
                <div className='users-search-bar'>
                    <SearchBarUsers search={search} searchType={searchType} setSearch={setSearch} setSearchType={setSearchType}/>
                </div>
                <div>
                <Container fluid>
                    <Row>
                        {  
                        users && users.length
                        ? filteredUsers().map(user => {
                            return (
                                <div>
                                    <UserCard key={user.id} {...user} status="index"/>
                                </div>
                            )       
                        })
                        : "Loading..."}
                    </Row>
                </Container>
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
  