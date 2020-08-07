import React from 'react';

const UserPage = props => {


    const mutualFriends = () => {
        if (props.total_friends && props.currentUser.total_friends) {
            let matchingArray = []
            for (let i = 0; i < props.total_friends; i++) {           
                if (props.currentUser.total_friends.includes(props.total_friends[i])) {
                    matchingArray.push(props.total_friends[i])
                }
            }  
            return matchingArray  
        }
        else {
            return []
        }
    }

    return (
        <div>
            <h1>{props.username}</h1>
            {
            props["profile_url"] === "" 
            ? <img src="https://banner2.cleanpng.com/20180403/dje/kisspng-question-mark-computer-icons-clip-art-question-mark-5ac3de9116dec4.9390654415227859370937.jpg" alt="Question Mark" />
            : <img src={props["profile_url"]} alt={props.username} />
            }
            <h3>{props.name}</h3>
            {props.total_friends 
                ?<>
                    <h4>Friends:</h4>
                    <div>
                    {props.total_friends.map(friend => 
                        <div>{friend.username}</div>
                    )}
                    </div>
                </>
                : <h3>No Friends Listed</h3>
            }
            {
            mutualFriends() === []
            ? <h3>No Mutual Friends Listed</h3>
            :<> 
                <h3>Mutual Friends:</h3>
                <div>
                    {mutualFriends().map(friend => 
                        <div>{friend.username}</div>
                    )}
                </div>
            </>
            }
            {props.reviews
                ?<>
                    <h4>Game Reviews:</h4>
                    <div>
                    {props.reviews.map(review => 
                        <div>
                            <img src={review.game_photo} alt={review.game_title}/>
                            <div>Game: {review.game_title}</div>
                            <div>by {review.user_name}</div>
                            <div>{review.num_stars}</div>
                            <div>{review.content}</div>
                        </div>
                    )}
                    </div>
                </>
                : <h3>No Reviews Listed</h3>
            }
            {props.game_photos
                ?<>
                    <h4>Game Photos:</h4>
                    <div>
                    {props.game_photos.map(photo => 
                        <div>
                            <img src={photo["image_url"]} alt={photo.game_title} />
                            <div>{photo.caption}</div>
                            </div>
                    )}
                    </div>
                </>
                : <h3>No Game Photos Listed</h3>
            }
            {props.games
                ?<>
                    <h4>Posted Games:</h4>
                    <div>
                    {props.games.map(game => 
                        <div>
                            <img src={game["image_url"]} alt={game.title} />
                            <div>{game.title}</div>
                        </div>
                    )}
                    </div>
                </>
                : <h3>No Games Posted</h3>
            }


        </div>
    )


}


export default UserPage