import React, {useState} from 'react';
import { withRouter } from 'react-router-dom'
import UserCard from '../UserCard'
import ReviewCard from '../../Review/ReviewCard'
import GamePhotoCard from '../../GamePhoto/GamePhotoCard'
import GameCard from '../../Game/GameCard'
import SearchBarUsers from '../../../Components/SearchBars/SearchBarUsers'
import UserProfileCard from '../UserProfileCard'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Divider, Header, Card } from 'semantic-ui-react'

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
                     <Divider horizontal>
                            <Header as='h4'>
                            <span className='search-bar-font'>Mutual Friends</span>
                            </Header>
                        </Divider>
                        {searchedMutualFriends && searchedMutualFriends.length > 1 
                            ? <Card.Group itemsPerRow={2}>
                                {searchedMutualFriends.map(friend => 
                                    <UserCard key={friend.id} {...friend}/>
                            )}
                                </Card.Group>
                            : <Card.Group centered>
                                {searchedMutualFriends.map(friend => 
                                        <UserCard key={friend.id} {...friend}/>
                                )}
                            </Card.Group>
                        }    
                </>
            )

        } else {
            return (
                <Divider horizontal>
                    <Header as='h4'>
                    <span className='search-bar-font'>No Mutual Friends Listed</span>
                    </Header>
                </Divider>
            )
        }
    }
    // .profile-page {
    //   .left-side-cards {
    
    //   .profile-center-cards {
  
    //   .profile-right-cards {


    return (
        <div>
            <div className='user-profile-container'>
                <div className='user-profile-card'>
                    {thisPageUser && <UserProfileCard user={thisPageUser}/>} 
                </div>
                <div className='profile-users-search-bar'>  
                    <Divider horizontal>
                            <Header as='h4'>
                            <span className='search-bar-font'>Search Mutual Friends</span>
                            </Header>
                        </Divider>
                    <SearchBarUsers 
                        searchType={searchType} 
                        setSearchType={setSearchType}
                        search={search}
                        setSearch={setSearch}
                    />
                </div>
            </div>
            <Container fluid>
                <Row className='justify-content-center'>
                    <Col md={2}>
                        <div>
                        {
                            thisUserGamePhotos && thisUserGamePhotos.length
                            ?<> 
                                <Divider horizontal>
                                    <Header as='h4'>
                                    <span className='search-bar-font'>Game Photos</span>
                                    </Header>
                                </Divider>
                                {thisUserGamePhotos.map(photo => 
                                        <GamePhotoCard key={photo.id} {...photo} />
                                )}
                            </>
                            : 
                                <Divider horizontal>
                                    <Header as='h4'>
                                    <span className='search-bar-font'>No Photos Listed</span>
                                    </Header>
                                </Divider>
                        }
                            {
                                thisUserCreatedGames && thisUserCreatedGames.length
                                ?<>
                                    <Divider horizontal>
                                        <Header as='h4'>
                                        <span className='search-bar-font'>Created Games</span>
                                        </Header>
                                    </Divider>
                                        {thisUserCreatedGames.map(game => 
                                                    <GameCard key={game.id} {...game} />
                                        )}
                                </>
                                :  <Divider horizontal>
                                        <Header as='h4'>
                                        <span className='search-bar-font'>No Games Created</span>
                                        </Header>
                                    </Divider>
                            }
                        </div>
                    </Col>
                    <Col md={8}>
                        <div>
                            {thisPageUser && mutualFriendsList()}  
                        </div>  
                    </Col>
                    <Col md={2}>
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
                                            <UserCard key={friend.id} {...friend} status="visitor"/>
                                    )}
                                </>
                                  :  <Divider horizontal>
                                        <Header as='h4'>
                                        <span className='search-bar-font'>No Friends Listed</span>
                                        </Header>
                                    </Divider>
                            }
                        {
                            thisUserReviews && thisUserReviews.length
                            ?<> 
                                <Divider horizontal>
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
                        </div>
                    </Col>
                </Row>
            </Container> 
        </div>
    )

}

export default withRouter(UserDisplayMutualFriends)

