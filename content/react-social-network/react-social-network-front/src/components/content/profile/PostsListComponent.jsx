import styles from './ProfileComponent.module.scss'
import { useSelector } from 'react-redux';
import PostItemComponent from './PostItemComponent';
import { useState } from 'react';

const PostsListComponent = () => {
  const [currentTape, setCurrentTape] = useState(1)
  const itemsPerTape = 10
  const { myPosts } = useSelector(state => state.posts)
  const lastCollectionIndex = currentTape * itemsPerTape
  let currentCollection = []
  if (myPosts !== null) {
    currentCollection = (myPosts.slice(0, lastCollectionIndex)).reverse()
  }

  return (
    <div className={`${styles.profilePostsList}`}>
      {currentCollection.length > 0 ?
        <>
          {currentCollection.map(post => <PostItemComponent key={post._id} data={post} />)}
          <div className='text-center my-2'>Number of posts: {myPosts.length} </div>
        </>
        : <h2 className='text-center'>Posts are missing</h2>
      }
      {myPosts !== null &&
        myPosts.length > currentTape * itemsPerTape &&
        <div onClick={() => setCurrentTape(currentTape + 1)} className='hrefItem text-center my-2'>Load more</div>
      }
    </div>
  );
}

export default PostsListComponent;
