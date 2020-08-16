
import React, {useState} from 'react';
import { withRouter, Link } from 'react-router-dom'
import {connect} from 'react-redux'
import * as action from '../../modules/actionCreators/actionCreators'

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
    
    return (
        <div>
            <div>
                <img src={props.thisPageGame["image_url"]} alt={title}/>
            </div>
            <div>
              <div>{title}</div>
              <div>{description}</div>
              <div>Category: {game_category}</div>
              <div>Minimum Players: {min_num_players} - Maximum Players: {max_num_players} - Age: {min_age}+</div>
            </div>
            <div>
                Created by: <span onClick={redirectToUser} onMouseOver={changePointer}>{creator_username}</span>  -<nbsp /> <nbsp /> 
                <a href={link_to_game_website}>Link to {title} website</a>
            </div>
            <div>
                <h4>Instructions and Rules:</h4>
                <div className='instructions-paragraph'>{instructions_and_rules}</div>
          </div>
        </div>
    )

 }

 const mapDispatchToProps = dispatch => {
    return {
      setShowUser: (userId) => dispatch(action.setShowUser(userId))
    }
  }
  
export default withRouter(connect(null, mapDispatchToProps)(GameProfileCard));


