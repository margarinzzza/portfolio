import { useState } from 'react';
import styles from './AdminPanelComponent.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { createCategory, filtersActions } from '../../features/auth/filtersSlice';

const AddTypeComponent = () => {
  const { addCategoryErrors, categoryNameValue } = useSelector(store => store.filters)
  const dispatch = useDispatch()

  const addTypeHandler = () => {
    const namePattern = /[A-Za-zА-Яа-яЁё]/
    if (categoryNameValue === '') {
      dispatch(filtersActions.addCategoryErrors('Fill in the required fields'))
    } else if (!categoryNameValue.match(namePattern)) {
      dispatch(filtersActions.addCategoryErrors('Enter the correct name format'))
    }
    else {
      dispatch(createCategory({name: categoryNameValue}))
    }
  }

  return (
    <div className={`${styles.createForm}`}>
      <h2>Add category</h2>
      <input value={categoryNameValue} onChange={(e)=>dispatch(filtersActions.setCategoryNameValue(e.target.value))} type="text" placeholder='category name...' />
      <div onClick={() => addTypeHandler()} className='link_item text-right'>
        Create
      </div>
      <div className={`errorMessage ${addCategoryErrors !== '' && 'showErrorMessage'} `}>
        {addCategoryErrors}
      </div>
    </div>
  );
}

export default AddTypeComponent;