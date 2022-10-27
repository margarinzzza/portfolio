import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, getMyPosts } from '../../../features/profile/postsSlice';
import PostsListComponent from './PostsListComponent';
import styles from './ProfileComponent.module.scss'

const ProfileComponent = () => {
  const { userData } = useSelector(state => state.auth)
  const { myPosts } = useSelector(state => state.posts)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getMyPosts({userId: userData._id}))
  }, [myPosts])
  
  const [postText, setPostText] = useState('')
  const [isEmptyPostText, setIsEmptyPostText] = useState(false)
  const addPostHandler = (postText) => {
    setIsEmptyPostText(false)
    if (postText !== '') {
      const newPost = {
        userId: userData._id,
        name: userData.name,
        text: postText
      }
      dispatch(createPost(newPost))
      setPostText('')
    } else setIsEmptyPostText(true)

  }


  return (
    <div className={`${styles.profile}`}>
      <div className={`${styles.profileData}`}>
        <div className={`${styles.profileDataImg}`}>
          <img src='https://bazametrov.ru/uploads/new-agency/default_logo_user.jpg' alt="me" />
        </div>
        <div className={`${styles.profileDataInfo}`}>
          <h1>{userData.name}</h1>
          <span>Date of Birth: {userData.dateOfBirth ? ` ${userData.dateOfBirth[0]}${userData.dateOfBirth[1]}${userData.dateOfBirth[2]}${userData.dateOfBirth[3]}.${userData.dateOfBirth[5]}${userData.dateOfBirth[6]}.${userData.dateOfBirth[8]}${userData.dateOfBirth[9]}`
            : ' -' }
          </span>
          <span>City: {userData.city?userData.city:' -'}</span>
          <span>Status: {userData.status?userData.status:' -'}</span>
        </div>
      </div>
      <div className={`${styles.profilePosts}`}>
        <h1>My posts</h1>
        <div className='relative'>
          <textarea onChange={(e) => setPostText(e.target.value)} value={postText} rows="5" placeholder='about me...'></textarea>
          <div className={`text-center hide-error ${isEmptyPostText && 'show-error'}`}>enter the text</div>
          <div className='formButton'>
            <span onClick={() => dispatch(addPostHandler(postText))}>Send</span>
          </div>
        </div>
        <PostsListComponent />
      </div>
    </div>
  );
}

export default ProfileComponent;
