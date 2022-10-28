import styles from './UsersComponent.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { createChat } from '../../../features/profile/chatSlice'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const UserComponent = ({ data }) => {
  const navigate = useNavigate()
  const { myChats } = useSelector(state => state.chat)
  const { userData } = useSelector(state => state.auth)
  const [chatMatch, setChatMatch] = useState([])
  const dispatch = useDispatch()
  const createChatHandler = () => {
    const newChat = {
      creatorId: userData._id,
      participantId: data._id,
      creatorName: userData.name,
      participantName: data.name,
    }
    dispatch(createChat(newChat))
    navigate('../messages')
  }

  useEffect(() => {
    if (myChats !== null) {
      let chatsMatchArr = myChats.filter(el => {
        if(el.participantId === data._id || el.creatorId === data._id) {
          return true
        } else return false
      })
      setChatMatch(chatsMatchArr)
      }
  }, [myChats])

  return (
    <div className={`${styles.user}`}>
      <div className={`${styles.userImg}`}>
        <img src="https://bazametrov.ru/uploads/new-agency/default_logo_user.jpg" alt="post-img" />
      </div>
      <div className={`${styles.userDesc}`}>
        <h2>{data.name}</h2>
        <span>{data.status}</span>
      </div>
      {chatMatch.length>0 ?
        <Link to={`../messages`} className={`hrefItem ${styles.userAdd}`}>
          go to dialog
        </Link>
        :
        <div onClick={() => createChatHandler()} className={`hrefItem ${styles.userAdd}`}>
          write
        </div>
      }

    </div>
  );
}

export default UserComponent;
