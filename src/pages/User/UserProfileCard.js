import React from 'react';

const UserProfileCard = props => {
    const {username, name, fav_games, age} = props.user

    return (
    <div class="ui card">
        <div className="image">
            { props["profile_url"] === "" 
            ? <img src="https://banner2.cleanpng.com/20180403/dje/kisspng-question-mark-computer-icons-clip-art-question-mark-5ac3de9116dec4.9390654415227859370937.jpg" alt="Question Mark" />
            : <img src={props.user["profile_url"]} alt={username} />
            }
        </div>
        <div className="content">
            <a className="header">{username}</a>
            <div class="meta">
                <span class="date">{name}</span>
            </div>
        </div>  
        <div className="description">
            <div>Favorite Games: {fav_games}</div>
            <div>Age: {age}</div>
        </div>
    </div>   
    )
}

export default UserProfileCard