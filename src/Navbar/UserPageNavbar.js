import React from 'react'
import {connect} from 'react-redux'
import {Nav} from 'react-bootstrap'
import * as requests from '../requests'
 
 const UserPageNavbar = props => {

    const {currentUser, showUser, handleView, token} = props
 
    
     return (
       <>
        <Nav className='col-md-12 d-none d-md-block bg-light sidebar'>
          {currentUser.id === showUser &&
            <Nav.Item> 
                <Nav.Link className='user-page-navbar-font' name="seeFriendRequests" onClick={handleView}>Friendship Requests</Nav.Link>
            </Nav.Item>
          }
            <Nav.Item> 
              <Nav.Link className='user-page-navbar-font' name="photos" onClick={handleView}>Photos</Nav.Link>
            </Nav.Item>
            <Nav.Item >
              <Nav.Link className='user-page-navbar-font' name="reviews" onClick={handleView}>Reviews</Nav.Link>
            </Nav.Item>
            <Nav.Item> 
              <Nav.Link className='user-page-navbar-font' name="gamesCreated" onClick={handleView}>Games Created</Nav.Link>
            </Nav.Item>
            <Nav.Item> 
              <Nav.Link className='user-page-navbar-font' name="friends" onClick={handleView}>Friends</Nav.Link>
            </Nav.Item>
            {
            currentUser.id === showUser 
            ? <Nav.Item> 
                <Nav.Link className='user-page-navbar-font' name="games" onClick={handleView}>Schedule a Game, Write a Review, or Post a Photo </Nav.Link>
              </Nav.Item>
           
            : <Nav.Item> 
                <Nav.Link className='user-page-navbar-font' name='mutualFriends' onClick={handleView}>Mutual Friends</Nav.Link>
              </Nav.Item>
            }
            {
              currentUser.id === showUser && 
              <>
                <Nav.Item> 
                  <Nav.Link className='user-page-navbar-font' name="seeMySGAsHost" onClick={handleView}>Your Hosted Games</Nav.Link>
                </Nav.Item>
                <Nav.Item> 
                  <Nav.Link className='user-page-navbar-font' name="seeMySGAsPlayer" onClick={handleView}>Your Played Games</Nav.Link>
                </Nav.Item>
                <Nav.Item> 
                  <Nav.Link className='user-page-navbar-font' name="seeFriendSGAsHost" onClick={handleView}>Friends' Hosted Games</Nav.Link>
                </Nav.Item>
                <Nav.Item> 
                  <Nav.Link className='user-page-navbar-font' name="seeFriendSGAsPlayer" onClick={handleView}>Friends' Played Games</Nav.Link>
                </Nav.Item>
              </>
            }
          </Nav>
       </>
     )
   
 }
 
 const mapStateToProps = state => {
    return {
      currentUser: state.currentUser,
      showUser: state.showUser,
      token: state.token
    }
  }


export default connect(mapStateToProps)(UserPageNavbar)

