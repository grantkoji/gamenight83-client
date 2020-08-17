import React, {useState, useReducer, useEffect} from 'react';
import {connect} from 'react-redux'

import { Icon, Table } from 'semantic-ui-react'
import moment from 'moment'
import {Button} from 'react-bootstrap'

const ScheduledGC = props => { 

    const {token, id, game, game_id, host_id, host, unix, num_vacancies, status, public_description, private_directions, privacy} = props

    // game.title 
    // game.category 
    // game['image_url']
    // host.username
    // host["profile_url"]

    // const showDetails = () => {
    //   return (


    //   )
    // }
    // 
    useEffect(() => {
    
    }, [])
  
   const joinScheduledGame = () => {
      console.log(game_id)

    }

    return (
      <Table.Row >
        <Table.Cell >{moment.unix(unix).format('llll')}</Table.Cell>
        <Table.Cell>{game.title}</Table.Cell>
        <Table.Cell>Host: {host.username}</Table.Cell>
        <Table.Cell>Spots: {num_vacancies}</Table.Cell>
        <Table.Cell>Description: {public_description}</Table.Cell>
        <Button variant='outline-info' onClick={joinScheduledGame}>Join This Game</Button>
      </Table.Row>
   
    )
}




const mapStateToProps = state => {
    return {
      token: state.token,
      currentUser: state.currentUser
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
     
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ScheduledGC)