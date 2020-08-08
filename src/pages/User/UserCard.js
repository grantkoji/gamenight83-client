import React from 'react';

const UserCard= props => {

    const redirectToUserPage = () => {
        props.history.push(`users/${props.id}`)
        // props.history.push(`users/${props.username.replace(/\s+/g, '')}`)
    }



    return (
        <div onClick={redirectToUserPage}>
            { props["profile_url"] === "" 
            ? <img src="https://banner2.cleanpng.com/20180403/dje/kisspng-question-mark-computer-icons-clip-art-question-mark-5ac3de9116dec4.9390654415227859370937.jpg" alt="Question Mark" />
            : <img src={props["profile_url"]} alt={props.username} />
            }
            <div>{props.username}</div>
           
        </div>
    )

}

export default UserCard