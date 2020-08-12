import React, {useState} from 'react';
import {connect} from 'react-redux'
import GamePhotoCard from './GamePhotoCard'
import SearchBarPhotos from '../../Components/SearchBars/SearchBarPhotos'
import FilterPhotosByLikes from '../../Components/Filters/FilterPhotosByLikes';
import SortPhotos from '../../Components/Sort/SortPhotos';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const GamePhotosIndex = props => {

  
    const {gamePhotos} = props
    let [search, setSearch] = useState('')
    let [searchType, setSearchType] = useState('gameTitle')
    let [typeLikesFilter, setTypeLikesFilter] = useState('noLikesFilter')
    let [numLikes, setNumLikes] = useState(0)
    let [typeSortPhotos, setTypeSortPhotos] = useState('noSortPhotos')
//add time stamp to the gamesFilter and seeds so can have most recently posted photos
    let gamePhotosFiltered = () => {
        if (gamePhotos) {
            let filteredGamePhotos = [...gamePhotos]
            if (searchType === 'username') {
                filteredGamePhotos = filteredGamePhotos.filter(photo => photo.user_name.toLowerCase().includes(search.toLowerCase()))
            } else if (searchType === 'gameTitle') {
                filteredGamePhotos = filteredGamePhotos.filter(photo => photo.game_title.toLowerCase().includes(search.toLowerCase()))
            } else if (searchType === 'caption') {
                filteredGamePhotos = filteredGamePhotos.filter(photo => photo.caption.toLowerCase().includes(search.toLowerCase()))
            } else if (searchType === 'gameCategory') {
                filteredGamePhotos = filteredGamePhotos.filter(photo => photo.game_category.toLowerCase().includes(search.toLowerCase()))
            }
            if (typeLikesFilter === 'minLikes') {
                filteredGamePhotos = filteredGamePhotos.filter(photo => photo.likes >= parseInt(numLikes))
            } else if (typeLikesFilter === 'maxLikes') {
                filteredGamePhotos = filteredGamePhotos.filter(photo => photo.likes <= parseInt(numLikes))
            }
            if (typeSortPhotos === 'mostLikes') {
                filteredGamePhotos = filteredGamePhotos.sort((photo1, photo2) => photo1.likes > photo2.likes ? -1 : 1)
            } else if (typeSortPhotos ==='leastLikes') {
                filteredGamePhotos = filteredGamePhotos.sort((photo1, photo2) => photo1.likes > photo2.likes ? 1 : -1)
            } else if (typeSortPhotos === 'gameTitle') {
                filteredGamePhotos = filteredGamePhotos.sort((photo1, photo2) => photo1.game_title.localeCompare(photo2.game_title))
            } else if (typeSortPhotos === 'gameCategory') {
                filteredGamePhotos = filteredGamePhotos.sort((photo1, photo2) => photo1.game_category.localeCompare(photo2.game_category))
            }
            return filteredGamePhotos
        }  
    }
  
        return (
            <>
                <h1>Welcome To Photos</h1>
                <div>
                    <SearchBarPhotos search={search} searchType={searchType} setSearch={setSearch} setSearchType={setSearchType}/>
                </div>
                <div>
                    <FilterPhotosByLikes
                        typeLikesFilter={typeLikesFilter}
                        setTypeLikesFilter={setTypeLikesFilter}
                        numLikes={numLikes}
                        setNumLikes={setNumLikes}
                    />
                </div>
                <div>
                    <SortPhotos typeSortPhotos={typeSortPhotos} setTypeSortPhotos={setTypeSortPhotos}/>
                </div>
                <div>
                    <Container fluid>
                        <Row>
                            {  
                            gamePhotos && gamePhotos.length
                            ? gamePhotosFiltered().map(photo => {
                                return (
                                    <div>
                                        <GamePhotoCard key={photo.id} {...photo} />
                                    </div>
                                )
                            })
                            : "Loading..."}
                        </Row>
                    </Container>
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
  