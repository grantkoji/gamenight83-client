
import React, { useState } from 'react';
import * as action from '../../modules/actionCreators/actionCreators'
import {connect} from 'react-redux'

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
      <form onSubmit={handleSubmit}>
        <label htmlFor="imageUrl">Photo Url:</label><br/>
        <input className='create-input-field' type="text" autoComplete="off" name="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}/><br />
        <label htmlFor="caption">Photo Caption:</label><br />
        <input className='create-input-field' type="textarea" autoComplete="off" name="caption" value={caption} onChange={(e) => setCaption(e.target.value)}/><br />
        <button type="Submit">Submit</button>
      </form>
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


