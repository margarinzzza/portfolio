import { useState } from 'react';

const UserComponent = ({ name, userImg, email, inviteUser, id }) => {
  const [invite, setInvite] = useState(false)

  return (
    <div className='user'>
      <div className='user-img'>
        <img src={userImg} alt="user" />
      </div>
      <div className='user-info'>
        <h5 className='user-name'>{name}</h5>
        <span className='user-status'>{email}</span>
      </div>
      <div className='user-invite'>
        {invite?
          <svg onClick={() => {inviteUser(id); setInvite(false)}} xmlns="http://www.w3.org/2000/svg" width="5vh" height="5vh" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
          </svg>
          :
          <svg onClick={() => {inviteUser(id); setInvite(true)}} xmlns="http://www.w3.org/2000/svg" width="5vh" height="5vh" fill="gray" className="bi bi-plus" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
        }

      </div>
    </div>
  );
}

export default UserComponent;
