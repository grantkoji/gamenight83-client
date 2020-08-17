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
import {connect} from 'react-redux'
import UserProfileCard from '../UserProfileCard'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


const ProfileDisplayPhotos = props => {
    const {
        thisPageUser,
        thisUserReviews,
        thisUserGamePhotos,
        thisUserCreatedGames,
        currentUser
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

    return (
    <div>
        {thisPageUser && <UserProfileCard user={thisPageUser}/>} 
        <div className='photos-search-bar'>
            <div>
                <SearchBarPhotos search={search} searchType={searchType} setSearch={setSearch} setSearchType={setSearchType}/>
            </div>
            <div className='photos-sort-and-filter'>
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
                <Col md={3}>
                    <div>
                        {
                            thisUserCreatedGames && thisUserCreatedGames.length
                            ?<div>
                                <div>Created Games:</div>
                                <div>
                                    {thisUserCreatedGames.map(game => 
                                        <div>
                                                <GameCard key={game.id} {...game} />
                                        </div>
                                    )}
                                </div>
                            </div>
                            : <div>No Games Posted</div>
                        }
                    </div>
                </Col>
                <Col md={6}>
                    <div className='featured-on-user-page'>
                        {
                            thisUserGamePhotos && thisUserGamePhotos.length
                            ?<div>
                                <div>Game Photos:</div>
                                <div>
                                {gamePhotosFiltered().map(photo => 
                                    <div>
                                        <GamePhotoCard key={photo.id} {...photo} />
                                    </div>
                                )}
                                </div>
                            </div>
                            : <div>No Game Photos Listed</div>
                        }
                    </div>
                </Col>
                <Col md={3}>
                    <div>
                        {
                            currentUser && currentUser.total_friends && currentUser.total_friends.length
                            ?<div>
                                <div>Friends:</div>
                                <div>
                                {currentUser.total_friends.map(friend => 
                                    <div>
                                        <UserCard key={friend.id} {...friend} status="profile"/>
                                    </div>
                                )}
                                </div>
                            </div>
                            : <div>No Friends Listed</div>
                        }
                    </div>
                    <div>
                    {
                        thisUserReviews && thisUserReviews.length
                        ?<div>
                            <div>Game Reviews:</div>
                            <div>
                            {thisUserReviews.map(review => 
                                <div>
                                <ReviewCard key={review.id} {...review} />
                                </div>
                            )}
                            </div>
                        </div>
                        : <div>No Reviews Listed</div>
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
  
  export default withRouter(connect(msp, mdp)(ProfileDisplayPhotos));



//   <div className='profile-page'>
//             <div className="profile-left-cards">
//                 <div>
//                     {
//                         thisUserCreatedGames && thisUserCreatedGames.length
//                         ?<div>
//                             <div>Created Games:</div>
//                             <div>
//                                 {thisUserCreatedGames.map(game => 
//                                     <div>
//                                             <GameCard key={game.id} {...game} />
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                         : <div>No Games Posted</div>
//                     }
//                 </div>
//             </div>
//             <div className="profile-center-cards">
//                 <div>
//                     {
//                         thisUserGamePhotos && thisUserGamePhotos.length
//                         ?<div>
//                             <div>Game Photos:</div>
//                             <div>
//                             {gamePhotosFiltered().map(photo => 
//                                 <div>
//                                     <GamePhotoCard key={photo.id} {...photo} />
//                                 </div>
//                             )}
//                             </div>
//                         </div>
//                         : <div>No Game Photos Listed</div>
//                     }
//                 </div>
//             </div>
//             <div className="profile-right-cards">
//                 <div>
//                     {
//                         currentUser && currentUser.total_friends && currentUser.total_friends.length
//                         ?<div>
//                             <div>Friends:</div>
//                             <div>
//                             {currentUser.total_friends.map(friend => 
//                                 <div>
//                                     <UserCard key={friend.id} {...friend} status="profile"/>
//                                 </div>
//                             )}
//                             </div>
//                         </div>
//                         : <div>No Friends Listed</div>
//                     }
//                 </div>
//                 <div>
//                 {
//                     thisUserReviews && thisUserReviews.length
//                     ?<div>
//                         <div>Game Reviews:</div>
//                         <div>
//                         {thisUserReviews.map(review => 
//                             <div>
//                             <ReviewCard key={review.id} {...review} />
//                             </div>
//                         )}
//                         </div>
//                     </div>
//                     : <div>No Reviews Listed</div>
//                 }
//                 </div>
//             </div>
            // </div>