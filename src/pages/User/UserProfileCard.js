import React from 'react';

const UserProfileCard = props => {
    // const {username, name, fav_games, age} = props.user

    return (
    <div>
        <div>
            {
                props.user["profile_url"] === "" 
                ? <img src="https://banner2.cleanpng.com/20180403/dje/kisspng-question-mark-computer-icons-clip-art-question-mark-5ac3de9116dec4.9390654415227859370937.jpg" alt="Question Mark" />
                : <img src={props.user["profile_url"]} alt={props.user.username} />
            }
        </div>
        <div>{props.user.username}</div>
        <div>{props.user.name}</div>
        <div>{props.user.fav_games}</div>
        <div>{props.user.age}</div>
    </div>
    )
}

export default UserProfileCard