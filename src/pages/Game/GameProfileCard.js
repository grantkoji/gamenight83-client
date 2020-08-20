
import React, {useState} from 'react';
import { withRouter, Link } from 'react-router-dom'
import {connect} from 'react-redux'
import * as action from '../../modules/actionCreators/actionCreators'
import { Divider, Header, Card } from 'semantic-ui-react'

const GameProfileCard = props => {
    const {
            title, 
            description, 
            creator_id, 
            min_num_players, 
            max_num_players, 
            min_age, id,
            instructions_and_rules, 
            link_to_game_website, 
            game_category, 
            creator_username  } = props.thisPageGame
 
    const redirectToUser = () => {
        props.setShowUser(creator_id)
        // props.history.push(`/users/${creator_id}`)
        props.history.push(`/users/${creator_username.replace(/\s+/g, '')}`)
    }

    const changePointer = (e) => {  
      e.target.style.cursor = 'pointer'
    }

    // <div class="ui cards">
    // <div class="card">
    //   <div class="content">
    //     <div class="header">Elliot Fu</div>
    //     <div class="meta">Friend</div>
    //     <div class="description">
    //       Elliot Fu is a film-maker from New York.
    //     </div>
    //   </div>
    // </div>
    // 
    // <Card image={props.thisPageGame["image_url"]}  alt={title}/>
    
    return (
      <>
        <div className='game-profile-container'>
            <div>   
              <img className='game-show-photo' src={props.thisPageGame["image_url"]} alt={title}/>
            </div>
            <div className='game-profile-info'>
                <div className='game-title-paragraph'>{title}</div>
                <div className='description-paragraph'>{description}</div>
                <div className='description-paragraph'>Category: {game_category}</div>
                <div className='description-paragraph'>Minimum Players: {min_num_players} - Maximum Players: {max_num_players} - Age: {min_age}+</div>
                <div className='description-paragraph'>Created by: <span className='username-on-game-page' onClick={redirectToUser} onMouseOver={changePointer}>{creator_username}</span></div>
                <div className='description-paragraph'><a href={link_to_game_website}>Link to {title} website</a></div>
            </div>
        </div>
            <div>
                <h4 className='instructions-header'>Instructions and Rules:</h4>
                <div className='instructions-paragraph'>{instructions_and_rules}</div>
          </div>
      </>
    )

 }

 const mapDispatchToProps = dispatch => {
    return {
      setShowUser: (userId) => dispatch(action.setShowUser(userId))
    }
  }
  
export default withRouter(connect(null, mapDispatchToProps)(GameProfileCard));


