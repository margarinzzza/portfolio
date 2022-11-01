import { useState } from 'react';
import styles from './AdminPanelComponent.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { createBrand, filtersActions } from '../../features/auth/filtersSlice';

const AddBrandComponent = () => {
  const { addBrandErrors, brandNameValue } = useSelector(store => store.filters)
  const dispatch = useDispatch()

  const addBrandHandler = () => {
    const namePattern = /[A-Za-zА-Яа-яЁё]/
    if (brandNameValue === '') {
      dispatch(filtersActions.addBrandErrors('Fill in the required fields'))
    } else if (!brandNameValue.match(namePattern)) {
      dispatch(filtersActions.addBrandErrors('Enter the correct name format'))
    }
    else {
      dispatch(createBrand({name: brandNameValue}))
    }
  }

  return (
    <div className={`${styles.createForm}`}>
      <h2>Add brand</h2>
      <input value={brandNameValue} onChange={(e)=>dispatch(filtersActions.setBrandNameValue(e.target.value))} type="text" placeholder='brand name...' />
      <div onClick={() => addBrandHandler()} className='link_item text-right'>
      Create
      </div>
      <div className={`errorMessage ${addBrandErrors !== '' && 'showErrorMessage'} `}>
        {addBrandErrors}
      </div>
    </div>
  );
}

export default AddBrandComponent;