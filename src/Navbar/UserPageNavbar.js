import React from 'react'
import {connect} from 'react-redux'
import {Nav} from 'react-bootstrap'
 
 const UserPageNavbar = props => {

    const {currentUser, showUser, handleView} = props
    const requestFriendship = () => {

    }
     return (
       <>
        <Nav className='col-md-12 d-none d-md-block bg-light sidebar'>
          {currentUser.id !== showUser && 
          <Nav.Item> 
                <Nav.Link name="requestFriendship" onClick={requestFriendship}>Request Friendship</Nav.Link>
            </Nav.Item>
          }
            <Nav.Item> 
              <Nav.Link name="photos" onClick={handleView}>Photos</Nav.Link>
            </Nav.Item>
            <Nav.Item >
              <Nav.Link name="reviews" onClick={handleView}>Reviews</Nav.Link>
            </Nav.Item>
            <Nav.Item> 
              <Nav.Link name="gamesCreated" onClick={handleView}>Games Created</Nav.Link>
            </Nav.Item>
            <Nav.Item> 
              <Nav.Link name="friends" onClick={handleView}>Friends</Nav.Link>
            </Nav.Item>
            {
            currentUser.id === showUser 
            ? <Nav.Item> 
                <Nav.Link name="games" onClick={handleView}>Post a Photo or Review</Nav.Link>
              </Nav.Item>
           
            : <Nav.Item> 
                <Nav.Link name='mutualFriends' onClick={handleView}>Mutual Friends</Nav.Link>
              </Nav.Item>
            }
          </Nav>
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

