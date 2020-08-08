import React from 'react';
import {connect} from 'react-redux'
import UserCard from './UserCard'
import UserPage from './UserPage'

const UsersIndex = props => {


        const {users} = props
        return (
            <>
                <h1>User Profiles:</h1>
                <div>
                    {  
                    users && users.length
                    ? users.map(user => {
                        <UserPage key={user.id} {...user}/>
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
  