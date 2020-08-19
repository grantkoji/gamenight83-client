
import React, { useState } from 'react';
import * as action from '../../modules/actionCreators/actionCreators'
import {connect} from 'react-redux'
import { Button, Checkbox, Form } from 'semantic-ui-react'

const AddGamePhotoForm = props => {
    const {token, thisGame} = props
    let [imageUrl, setImageUrl] = useState('');
    let [caption, setCaption] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    handleGamePhotoPostFetch()
  }


    const handleGamePhotoPostFetch = () => {
      fetch("http://localhost:3001/api/v1/game_photos", {
          method: "POST",
          headers: {
          "content-type": "application/json",
          "Authorization": token
          },
          body: JSON.stringify({
          game_id: thisGame,
          caption: caption,
          image_url: imageUrl,
          likes: 0
          })
      })
      .then(r => r.json())
      .then(resp => handleResponse(resp))
    }

    const handleResponse = (resp) => {
      if (resp.message) {
        alert(resp.message)
      } else {
        props.addGamePhoto(resp)
        setImageUrl('')
        setCaption('')
        alert(`Thank you for posting your Photo!`)
      }
    }

  
  

    return (
      <div className='photo-form-container'>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
          <Form.Field label='Link to Photo' control="textarea" rows='1' name="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}/><br />
          </Form.Group>
          <Form.Group>    
          <Form.Field label='Caption' control="textarea" rows='3' name="caption" value={caption} onChange={(e) => setCaption(e.target.value)}/><br />
          </Form.Group>
          <Button type="Submit" basic color='blue' size='tiny'>Submit</Button>
        </Form>
      </div>
    );
  

}

const mapStateToProps = state => {
  return {
    token: state.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addGamePhoto: (photo) => dispatch(action.addGamePhoto(photo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGamePhotoForm);


// className='create-input-field'