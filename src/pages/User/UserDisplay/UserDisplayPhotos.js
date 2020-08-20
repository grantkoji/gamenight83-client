import React, {useState} from 'react';
import { withRouter } from 'react-router-dom'
import * as action from '../../../modules/actionCreators/actionCreators'
import UserCard from '../UserCard'
import ReviewCard from '../../Review/ReviewCard'
import GamePhotoCard from '../../GamePhoto/GamePhotoCard'
import GameCard from '../../Game/GameCard'
import SearchBarPhotos from '../../../Components/SearchBars/SearchBarPhotos'
import FilterPhotosByLikes from '../../../Components/Filters/FilterPhotosByLikes';
import SortPhotos from '../../../Components/Sort/SortPhotos';
import UserProfileCard from '../UserProfileCard'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {connect} from 'react-redux'
import { Divider, Header, Card } from 'semantic-ui-react'


const UserDisplayPhotos = props => {
    const {
        mutualFriends,
        thisPageUser,
        thisUserReviews,
        thisUserGamePhotos,
        thisUserCreatedGames,
        games, 
        token
    } = props

    let [search, setSearch] = useState('')
    let [searchType, setSearchType] = useState('gameTitle')
    let [typeLikesFilter, setTypeLikesFilter] = useState('noLikesFilter')
    let [numLikes, setNumLikes] = useState(0)
    let [typeSortPhotos, setTypeSortPhotos] = useState('noSortPhotos')
//add time stamp to the gamesFilter and seeds so can have most recently posted photos
    let gamePhotosFiltered = () => {
        if (thisUserGamePhotos && thisUserGamePhotos.length) {
            let filteredGamePhotos = thisUserGamePhotos
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
    let mutualFriendsList = () => {
        if(mutualFriends) {
            return (
                <>
                     <Divider horizontal>
                        <Header as='h4'>
                        <span className='search-bar-font'>Mutual Friends</span>
                        </Header>
                    </Divider>
                            {mutualFriends.map(friend => 
                                    <UserCard key={friend.id} {...friend}/>
                            )}
                </>
            )
        } else {
            return (
                <Divider horizontal>
                    <Header as='h4'>
                    <span className='search-bar-font'>No Mutual Friends</span>
                    </Header>
                </Divider>
            )
        }
    }

    return (
        <div>
             <div className='user-profile-container'>
                <div className='user-profile-card'>
                    {thisPageUser && <UserProfileCard user={thisPageUser}/>} 
                </div>
                <div className='current-user-photo-search'> 
                    <Divider horizontal>
                        <Header as='h4'>
                        <span className='search-bar-font'>Search Photos</span>
                        </Header>
                    </Divider>
                    <SearchBarPhotos search={search} searchType={searchType} setSearch={setSearch} setSearchType={setSearchType}/>
                    <FilterPhotosByLikes
                        typeLikesFilter={typeLikesFilter}
                        setTypeLikesFilter={setTypeLikesFilter}
                        numLikes={numLikes}
                        setNumLikes={setNumLikes}
                    />
                    <SortPhotos typeSortPhotos={typeSortPhotos} setTypeSortPhotos={setTypeSortPhotos}/>
                </div>
            </div>
            <Container fluid>
                <Row className='justify-content-center'>
                    <Col md={2}>
                        {
                            thisUserCreatedGames && thisUserCreatedGames.length
                            ?<>
                                <Divider horizontal>
                                    <Header as='h4'>
                                    <span className='search-bar-font'>Created Games</span>
                                    </Header>
                                </Divider>
                                    {thisUserCreatedGames.map(game => 
                                                <GameCard key={game.id} {...game} status="visitor"/>
                                    )}
                            </>
                            :   <Divider horizontal>
                                    <Header as='h4'>
                                    <span className='search-bar-font'>No Games Created</span>
                                    </Header>
                                </Divider>
                        }
                        {
                            thisUserReviews && thisUserReviews.length
                            ?<> <Divider horizontal>
                                    <Header as='h4'>
                                    <span className='search-bar-font'>Reviews</span>
                                    </Header>
                                </Divider>
                                {thisUserReviews.map(review => 
                                    <ReviewCard key={review.id} {...review} />
                                )}
                            </>
                            :  <Divider horizontal>
                                <Header as='h4'>
                                <span className='search-bar-font'>No Reviews Listed</span>
                                </Header>
                            </Divider>
                        }
                    </Col>
                    <Col md={8}>
                        <div>
                            {
                                thisUserGamePhotos && thisUserGamePhotos.length
                                ?<>
                                <Divider horizontal>
                                    <Header as='h4'>
                                    <span className='search-bar-font'>Game Photos</span>
                                    </Header>
                                </Divider>
                                {gamePhotosFiltered() && gamePhotosFiltered().length > 1 
                                    ? <Card.Group itemsPerRow={2}>
                                        {gamePhotosFiltered().map(photo => 
                                            <GamePhotoCard key={photo.id} {...photo} />
                                        )}
                                        </Card.Group>
                                    : <Card.Group centered>
                                        {gamePhotosFiltered().map(photo => 
                                            <GamePhotoCard key={photo.id} {...photo} />
                                        )}
                                    </Card.Group>
                                }
                                </>
                                :<Divider horizontal>
                                     <Header as='h4'>
                                     <span className='search-bar-font'>No Photos Listed</span>
                                    </Header>
                                </Divider>                            }
                        </div>
                    </Col>
                    <Col md={2}>
                        <div>
                            {thisPageUser && mutualFriendsList()}  
                        </div>  
                        <div>
                            {
                                thisPageUser && thisPageUser.total_friends && thisPageUser.total_friends.length
                                ?<>
                                    <Divider horizontal>
                                        <Header as='h4'>
                                        <span className='search-bar-font'>Friends</span>
                                        </Header>
                                    </Divider>
                                    {thisPageUser.total_friends.map(friend => 
                                        <UserCard key={friend.id} {...friend}/>
                                    )}
                                </>
                                :  <Divider horizontal>
                                        <Header as='h4'>
                                        <span className='search-bar-font'>No Friends Listed</span>
                                        </Header>
                                    </Divider>
                            }
                        </div>
                    </Col>
                </Row>
            </Container> 
        </div>
  )

}


const msp = state => {
    return {
      token: state.token,
      games: state.games,
      users: state.users,
      reviews: state.reviews,
      gamePhotos: state.gamePhotos,
      currentUser: state.currentUser,
      showUser: state.showUser
    }
  }
  
  const mdp = dispatch => {
    return {
      setCurrentUser: (user) => dispatch(action.setCurrentUser(user)),
      setCurrentToken: (token) => dispatch(action.setCurrentToken(token)),
      setShowUser: (userId) => dispatch(action.setShowUser(userId))
    }
  }

export default withRouter(connect(msp, mdp)(UserDisplayPhotos))


