
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

 
    return (
        <div>
            <div>
                <img src={props.thisPageGame["image_url"]} alt={title}/>
            </div>
            <div>
              <div>{title}</div>
              <div>{description}</div>
              <div>Game Category: {game_category}</div>
              <div>Minimum Players: {min_num_players} - Maximum Players: {max_num_players} - Age: {min_age}+</div>
              <button onClick={redirectToUser}>Created by: {creator_username}</button>
            </div>
            <div>
                <a href={link_to_game_website}>Link to {title} website</a>
            </div>
            <div>
                <div>Instructions and Rules:</div>
                <div>{instructions_and_rules}</div>
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
