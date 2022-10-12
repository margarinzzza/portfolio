import 'bootstrap/dist/css/bootstrap.min.css';
import { users } from './store/store';
import './App.css';
import { } from './redux/slices/userListSlice';
import { useState } from 'react';
import UserComponent from './components/UserComponent';
import InvitePopupComponent from './components/InvitePopupComponent';

const App = () => {
  const [loupe, setLoupe] = useState(false)
  const [invitePopup, setInvitePopup] = useState(false)
  const [usersState, setUsersState] = useState(users)
  const [invitedUsers, setInvitedUsers] = useState([])
  const inviteUser = (id) => {
    if (invitedUsers.includes(id)) {
      setInvitedUsers(
        invitedUsers.filter(user => {
          return user !== id
        })
      )
    } else {
      setInvitedUsers([...invitedUsers, id])
    }
  }

  const searchUsers = (value) => {
    const filteredUsers = users.filter((user) => {
      if (user.name.toLowerCase().includes(value.target.value.toLowerCase()) || user.email.toLowerCase().includes(value.target.value.toLowerCase())) {
        return user
      }
    })
    setUsersState(filteredUsers)
  }

  return (
    <div className={`app container-fluid g-0`}>
      <div className='content'>
        <div className='main-card'>
          {invitePopup ?
            <InvitePopupComponent setInvitedUsers={setInvitedUsers} setInvitePopup={setInvitePopup} />
            :
            <>
              <div className='search-user'>
                <svg style={{ 'width': `${loupe ? '2.2vh' : '0'}` }} xmlns="http://www.w3.org/2000/svg" width="2vh" height="2vh" fill="gray" className="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
                <input onChange={searchUsers} onBlur={() => setLoupe(false)} onFocus={() => { setLoupe(true) }} type="search" placeholder='Найти пользователя...' />
              </div>
              <div className='user-list'>
                {usersState.length ?
                  usersState.map((user) => {
                    return <UserComponent inviteUser={inviteUser} id={user.id} key={user.id} name={user.name} email={user.email} userImg={user.userImg} />
                  })
                  :
                  <div className='text-center text-secondary mt-3'>
                    <span>Пользователи отсутствуют</span>
                  </div>
                }

              </div>
              <div onClick={() => setInvitePopup(true)} className={`button ${!invitedUsers.length && 'disabled-button'}`}>Отправить приглашение</div>
            </>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
