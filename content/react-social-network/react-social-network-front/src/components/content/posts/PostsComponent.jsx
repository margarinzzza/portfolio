import styles from './PostsComponent.module.css'
import { useDispatch, useSelector } from 'react-redux';
import PostItemComponent from './PostItemComponent';
import { useState } from 'react';
import { getAllPosts, postsSliceActions } from '../../../features/profile/postsSlice';
import { useEffect } from 'react';

const PostsComponent = () => {
  const dispatch = useDispatch()
  const { allPosts, searchQueryByName, searchQueryByText, searchData } = useSelector(state => state.posts)
  const [currentTape, setCurrentTape] = useState(1)
  const itemsPerTape = 10
  const lastCollectionIndex = currentTape * itemsPerTape
  let currentCollection = []
  if (allPosts !== null) {
    currentCollection = (allPosts.slice(0, lastCollectionIndex)).reverse()
  }
  useEffect(() => {
    dispatch(getAllPosts())
  }, [])
  useEffect(() => {
    dispatch(postsSliceActions.searchPost())
  }, [searchQueryByName, searchQueryByText])

  return (
    <div className={`${styles.posts}`}>
      <h1>Last posts:</h1>
      <div className='mb-4 mt-2'>
        <input onChange={(e) => dispatch(postsSliceActions.setSearchQueryByName(e.target.value))} value={searchQueryByName} type="text" placeholder='find by name' />
        <input onChange={(e) => dispatch(postsSliceActions.setSearchQueryByText(e.target.value))} value={searchQueryByText} type="text" placeholder='find by text' />
      </div>
      <div>
        {searchData !== null ?
          searchData.map((el) => {
            return <PostItemComponent key={el._id} data={el} />
          })
          :
          currentCollection !== null &&
          currentCollection.map((el) => {
            return <PostItemComponent key={el._id} data={el} />
          })
        }
      </div>

      {allPosts !== null && allPosts.length > currentTape * itemsPerTape &&
        <div onClick={() => setCurrentTape(currentTape + 1)} className='hrefItem text-center my-2'>Load more</div>
      }
      {allPosts !== null && allPosts.length > 0 &&
        <div className='text-center my-2'>Number of posts: {allPosts.length} </div>
      }

    </div>
  );
}

export default PostsComponent;
