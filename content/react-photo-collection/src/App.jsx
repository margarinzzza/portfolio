import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import './App.css';
import { setCollectionsState, filterCollections, setSearchRequest, setSelectedCategory, setCurrentPage } from './redux/slices/photoCollectionsSlice';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

const App = () => {
  const dispatch = useDispatch()
  const { collectionsState, photoCategories, selectedCategory, inputedText, currentPage, itemsPerPage } = useSelector((state) => state.photoCollections)

  // const [currentItems, setCurrentItems] = useState([]);
  // useEffect(() => {
  //   const endOffset = itemOffset + itemsPerPage;
  //   //console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  //   dispatch(setCollectionsState(collections.slice(itemOffset, endOffset))) 
  //   dispatch(setPageCount(Math.ceil(collections.length / itemsPerPage)));
  // }, [itemOffset, itemsPerPage]);

  // const handlePageClick = (event) => {
  //   const newOffset = (event.selected * itemsPerPage) % collections.length;
  //   console.log(
  //     `User requested page number ${event.selected}, which is offset ${newOffset}`
  //   );
  //   dispatch(setItemOffset(newOffset));
  // };

  const pages = Math.ceil(collectionsState.length / itemsPerPage)
  const lastCollectionIndex = currentPage * itemsPerPage
  const firstCollectionIndex = lastCollectionIndex - itemsPerPage
  const currentCollection = collectionsState.slice(firstCollectionIndex, lastCollectionIndex)

  const setCategory = (value) => {
    dispatch(setSelectedCategory(value))
    dispatch(filterCollections())
  }

  const setSearch = (value) => {
    dispatch(setSearchRequest(value))
    dispatch(filterCollections())
  }

  return (
    <div className={`app container-fluid g-0`}>
      <div className='content'>
        <div className='photo-collection w-100'>
          <h3 className='fw-bold text-3xl font-bold underline'>Моя коллекция фотографий</h3>
          <div className='photo-collection-filters d-flex align-items-center flex-wrap'>
            <div className='photo-collection-categories d-flex flex-wrap'>
              {photoCategories.map((category) => {
                return (
                  <div onClick={() => setCategory(category.id)} className={`photo-collection-category button  ${selectedCategory === category.id && 'active-button'}`} key={category.id}>
                    {category.category}
                  </div>
                )
              })}
            </div>
            <div className='photo-collection-find'>
              <input value={inputedText} onChange={(e) => setSearch(e.target.value)} type="text" name="" placeholder='Поиск по названию' />
            </div>
          </div>

          <div className='photo-collection-list d-flex flex-wrap'>
            {currentCollection.length !== 0 ?
              currentCollection.map((collection) => {
                return (
                  <div className='photo-collection-item d-flex flex-column justify-content-between'>
                    <div className='photos justify-content-center'>
                      {collection.photoUrl.map((photo, index) => {
                        return (
                          <img src={photo} className={`photo ${index === 0 ? 'w-100' : 'sub-photo'} ${index > 3 && 'd-none'}`} alt="photo" />
                        )
                      })}
                    </div>
                    <span className='photo-collection-name fw-bold'>{collection.collectionName}</span>
                  </div>
                )
              })
              :
              <span className='text-secondary w-100 text-center'>Ничего не найдено</span>
            }
          </div>

          {/* <ReactPaginate
          activeLinkClassName='active-button'
          pageLinkClassName='button'
            className='pagination d-flex flex-wrap align-items-center justify-content-center'
            breakLabel="..."
            nextLabel={
              <svg onClick={() => dispatch(setCurrentPage(currentPage + 1))} xmlns="http://www.w3.org/2000/svg" width="2vh" height="2vh" fill="currentColor" className="bi bi-caret-right c-pointer" viewBox="0 0 16 16">
                <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
              </svg>
            }
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel={
              <svg onClick={() => dispatch(setCurrentPage(currentPage - 1))} xmlns="http://www.w3.org/2000/svg" width="2vh" height="2vh" fill="currentColor" className="bi bi-caret-left c-pointer" viewBox="0 0 16 16">
                <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z" />
              </svg>
            }
            renderOnZeroPageCount={null}
          /> */}

          <div className='pagination d-flex flex-wrap align-items-center justify-content-center'>
            {currentPage > 1 &&
              <svg onClick={() => dispatch(setCurrentPage(currentPage - 1))} xmlns="http://www.w3.org/2000/svg" width="2vh" height="2vh" fill="currentColor" className="bi bi-caret-left c-pointer" viewBox="0 0 16 16">
                <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z" />
              </svg>
            }
            <div className='d-flex'>
              {pages > 1 &&
                [...Array(pages)].map((el, index) => {
                  return (
                    <div onClick={() => dispatch(setCurrentPage(index + 1))} className={`pagination-item button ${currentPage === index + 1 && 'active-button'}`}>{index + 1}</div>
                  )
                })
              }
            </div>

            {currentPage < pages &&
              <svg onClick={() => dispatch(setCurrentPage(currentPage + 1))} xmlns="http://www.w3.org/2000/svg" width="2vh" height="2vh" fill="currentColor" className="bi bi-caret-right c-pointer" viewBox="0 0 16 16">
                <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
              </svg>
            }
          </div>

        </div>
      </div>
    </div >
  );
}

export default App;
