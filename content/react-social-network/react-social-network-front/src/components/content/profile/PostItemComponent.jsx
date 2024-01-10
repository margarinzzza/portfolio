import styles from './ProfileComponent.module.css'
import { deletePost } from '../../../features/profile/postsSlice';
import { useDispatch } from 'react-redux';


const PostItemComponent = ({data}) => {
  
  const {timeStamps} = data
  let Ymd = timeStamps.slice(0, 10)
  let Hms = timeStamps.slice(11, 19)
  const dispatch = useDispatch()
  const deletePostHandler = (postId) => {
    dispatch(deletePost({postId}))
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
