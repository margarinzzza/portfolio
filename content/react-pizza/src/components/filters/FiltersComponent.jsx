import styles from './FiltersComponent.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { categoryList, sortList } from '../../store/store';
import { setCategory, setSort } from '../../redux/slices/filterSlice';
import { useState } from 'react';

const FiltersComponent = () => {
  const dispatch = useDispatch()
  const { selectedCategory, selectedSort } = useSelector(state => state.filters)
  const [sortListPopup, setSortListPopup] = useState(false)

  return (
    <div className={`${styles.filters}`}>
      <div className={`${styles.categories}`}>
        {categoryList.map(item => {
          return <div key={item.id} onClick={() => dispatch(setCategory(item))} className={`${styles.category} ${selectedCategory.id === item.id && styles.categoryActive}`}>{item.value}</div>
        })}
      </div>

      <div onClick={() => setSortListPopup(!sortListPopup)} className={`${styles.sorts}`}>
        <svg className={`transition-all ${sortListPopup && 'rotate-180'}`} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z" fill="#2C2C2C" />
        </svg>
        <span className='font-bold ml-1'>Сортировка по:
          <span className='transition-all text-amber-500 hover:text-amber-600 underline decoration-dashed underline-offset-2 ml-1'>{selectedSort.name}</span>
          <div className={`pointer-events-none opacity-0 ${styles.sortsList} ${sortListPopup && 'opacity-100 pointer-events-auto'}`}>
            {sortList.map(item => {
              return <div onClick={() => dispatch(setSort(item))} key={item.id}>{item.name}</div>
            })}
          </div>
        </span>
      </div>
    </div>
  );
}

export default FiltersComponent;
