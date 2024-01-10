import styles from './ProfileComponent.module.css'
import { deletePost, getMyPosts } from '../../../features/profile/postsSlice';
import { useDispatch, useSelector } from 'react-redux';


const PostItemComponent = ({data}) => {
  
  const { userData } = useSelector(state => state.auth)
  const {timeStamps} = data
  let Ymd = timeStamps.slice(0, 10)
  let Hms = timeStamps.slice(11, 19)
  const dispatch = useDispatch()
  const deletePostHandler = async (postId) => {
    await dispatch(deletePost({postId})).unwrap().then(()=>{
      dispatch(getMyPosts({userId: userData._id}))
    }).catch()
  }
  
  return (
    <div className={`${styles.profilePostsListItem}`}>
      <div className={`${styles.profilePostsListItemData}`}>
        <span>{Ymd} {Hms}</span>
        <p>{data.text}</p>
      </div>
      <span className={`default-underline hrefItem ${styles.deletePost}`} onClick={()=>deletePostHandler(data._id)}>delete</span>
    </div>
  );
}

export default PostItemComponent;
