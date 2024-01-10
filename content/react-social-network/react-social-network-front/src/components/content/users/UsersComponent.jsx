import styles from './UsersComponent.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getUsers, searchUser, setSearchQuery } from '../../../features/profile/usersSlice'
import UserComponent from './UserComponent'
import { getMyChats } from '../../../features/profile/chatSlice'

const UsersComponent = () => {
  const dispatch = useDispatch()
  const { myChats } = useSelector(state => state.chat)
  const { userData } = useSelector(state => state.auth)
  const { users, status, search } = useSelector(state => state.users)
  const [currentTape, setCurrentTape] = useState(1)
  const itemsPerTape = 15
  const lastCollectionIndex = currentTape * itemsPerTape
  let currentCollection = []
  if (users !== null) {
    if (search.searchQuery !== '') {
      if (search.searchData !== null) {
        currentCollection = (search.searchData.slice(0, lastCollectionIndex))
      }
    } else {
      currentCollection = (users.slice(0, lastCollectionIndex))
    }
  }

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  useEffect(() => {
    dispatch(searchUser())
  }, [search.searchQuery])

  useEffect(() => {
    dispatch(getMyChats({ userId: userData._id }))
  }, [])

  return (
    <>
      <div className={`my-2 ${styles.searchUser}`}>
        <input onChange={(e) => dispatch(setSearchQuery(e.target.value))} type="text" value={search.searchQuery} placeholder='search user...' />
      </div>
      <div className={`${styles.users}`}>
        {status === 'loaded' ?
          currentCollection.length > 0 ?
            currentCollection.map(user => {
              if (userData.userName !== user.userName) {
                return <UserComponent key={user._id} data={user} />
              }
            })
            : <h2 className='w-full text-center'>Users are missing</h2>
          : <h1>Loading users...</h1>
        }
      </div>
      {users !== null &&
        users.length > currentTape * itemsPerTape &&
        <div onClick={() => setCurrentTape(currentTape + 1)} className='hrefItem text-center my-2'>Load more</div>
      }
      {search.searchQuery !== '' ?
        search.searchData !== null && search.searchData.length > 0 && <div className='text-center my-2'>Number of users: {search.searchData.length} </div>
        : users !== null && users.length > 0 && <div className='text-center my-2'>Number of users: {users.length} </div>
      }
    </>

  );
}

export default UsersComponent;
