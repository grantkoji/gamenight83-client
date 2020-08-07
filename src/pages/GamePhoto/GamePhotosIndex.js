import React, { Component } from 'react';
import * as action from '../../modules/actionCreators/actionCreators'
import {connect} from 'react-redux'
class GamePhotosIndex extends Component {

    render() {
        const {gamePhotos} = this.props
        return (
            <>
                <h1>Welcome</h1>
                
                <div>
                    {  
                    gamePhotos 
                    ? gamePhotos.map(photo => {
                        return (
                            <div>
                            <img src={photo["image_url"]} alt={photo.game_title} />
                            <div>{photo.caption}</div>
                            </div>
                        )
                    })
                    : "Loading..."}
                </div>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {    
      gamePhotos: state.gamePhotos
    }
  }
  
  
  
  export default connect(mapStateToProps)(GamePhotosIndex);
  