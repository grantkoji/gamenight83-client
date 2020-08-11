import React from 'react'
import {connect} from 'react-redux'
 
 const UserPageNavbar = props => {

    const {currentUser, showUser, handleView} = props

     return (
       <>
        <div>
            <button name="photos" onClick={handleView}>Photos</button>
            <button name="reviews" onClick={handleView}>Reviews</button>
            <button name="friends" onClick={handleView}>Friends</button>
            {
            currentUser.id === showUser 
            ? <button name="games" onClick={handleView}>Games</button>
            : <button name='mutualFriends' onClick={handleView}>Mutual Friends</button>
            }
            <button name="gamesCreated" onClick={handleView}>Games Created</button>
       </div>
       </>
     )
   
 }
 
 const mapStateToProps = state => {
    return {
      currentUser: state.currentUser,
      showUser: state.showUser
    }
  }

export default connect(mapStateToProps)(UserPageNavbar)

