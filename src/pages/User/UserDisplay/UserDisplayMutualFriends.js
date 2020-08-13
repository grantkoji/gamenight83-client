import React, {useState} from 'react';
import { withRouter } from 'react-router-dom'
import UserCard from '../UserCard'
import ReviewCard from '../../Review/ReviewCard'
import GamePhotoCard from '../../GamePhoto/GamePhotoCard'
import GameCard from '../../Game/GameCard'
import SearchBarUsers from '../../../Components/SearchBars/SearchBarUsers'
import UserProfileCard from '../UserProfileCard'


const UserDisplayMutualFriends = props => {
    const {
        mutualFriends,
        thisPageUser,
        thisUserReviews,
        thisUserGamePhotos,
        thisUserCreatedGames,
    } = props

    let [searchType, setSearchType] = useState('username')
    let [search, setSearch] = useState('')

    let mutualFriendsList = () => {
        if(mutualFriends) {
            let searchedMutualFriends
            if (searchType === 'username') {
                searchedMutualFriends = mutualFriends.filter(user => user.username.toLowerCase().includes(search.toLowerCase()))
            } else if (searchType === 'favGames') {
                searchedMutualFriends = mutualFriends.filter(user => user.fav_games.toLowerCase().includes(search.toLowerCase()))
            }
            return (
                <>
                    <div> 
                        <div>Mutual Friends:</div>
                        <div>
                            {searchedMutualFriends.map(friend => 
                                <div>
                                    <UserCard key={friend.id} {...friend}/>
                                </div>
                            )}
                        </div>
                    </div>
                    </>
            )
        } else {
            return (
                <div>No Mutual Friends Listed</div>
            )
        }
    }

    return (
        <div>
            {thisPageUser && <UserProfileCard user={thisPageUser}/>} 
            <div className="container6">
                <div>
                    <SearchBarUsers 
                        searchType={searchType} 
                        setSearchType={setSearchType}
                        search={search}
                        setSearch={setSearch}
                    />
                </div>
                <div>
                    {thisPageUser && mutualFriendsList()}  
                </div>  
            </div>
            <div className="container3">
                <div>
                {thisUserGamePhotos && thisUserGamePhotos.length
                    ?<div>
                        <div>Game Photos:</div>
                        <div>
                        {thisUserGamePhotos.map(photo => 
                            <div>
                                <GamePhotoCard key={photo.id} {...photo} />
                            </div>
                        )}
                        </div>
                    </div>
                    : <div>No Game Photos Listed</div>
                }
                </div>
                <div>
                    {thisUserCreatedGames && thisUserCreatedGames.length
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
            </div>
            <div className="container3">
                <div>
                    {thisPageUser && thisPageUser.total_friends && thisPageUser.total_friends.length
                        ?<div>
                            <div>Friends:</div>
                            <div>
                            {thisPageUser.total_friends.map(friend => 
                                <div>
                                    <UserCard key={friend.id} {...friend}/>
                                </div>
                            )}
                            </div>
                        </div>
                            : <div>No Friends Listed</div>
                        }
                </div>
                <div>
                {thisUserReviews && thisUserReviews.length
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
            </div>
        </div>
        )

}

export default withRouter(UserDisplayMutualFriends)

