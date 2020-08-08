import React from 'react';
import {connect} from 'react-redux'
import GamePhotoCard from './GamePhotoCard'

const GamePhotosIndex = props => {

 
        const {gamePhotos} = props
        return (
            <>
                <h1>Welcome To Photos</h1>
                
                <div>
                    {  
                    gamePhotos 
                    ? gamePhotos.map(photo => {
                        return (
                            <div>
                                <GamePhotoCard key={photo.id} {...photo} />
                            </div>
                        )
                    })
                    : "Loading..."}
                </div>
            </>
        )
    

}

const mapStateToProps = state => {
    return {    
      gamePhotos: state.gamePhotos
    }
  }
  
  
  
  export default connect(mapStateToProps)(GamePhotosIndex);
  