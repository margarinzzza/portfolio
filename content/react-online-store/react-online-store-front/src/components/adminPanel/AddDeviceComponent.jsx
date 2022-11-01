import { useEffect, useState } from 'react';
import styles from './AdminPanelComponent.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { getBrands, getCategories } from '../../features/auth/filtersSlice';
import { createDevice, deviceActions } from '../../features/auth/deviceSlice';

const AddDeviceComponent = () => {
  useEffect(() => {
    dispatch(getCategories())
  }, [])

  useEffect(() => {
    dispatch(getBrands())
  }, [])

  const { addDeviceErrors, deviceNameValue, deviceDecriptionValue, devicePriceValue, deviceTypeValue, deviceBrandValue } = useSelector(store => store.device)
  const { categoriesData, brandsData } = useSelector(store => store.filters)
  const dispatch = useDispatch()
  const [categorySelector, setCategorySelector] = useState(false)
  const [brandSelector, setBrandSelector] = useState(false)

  const addSpecificHandler = () => {
    const specificObj = {
      id: Date.now(),
      property: '',
      value: ''
    }
    dispatch(deviceActions.setDeviceDecriptionValue(specificObj))
  }

  const fillPropertyHandler = (id, value) => {
    dispatch(deviceActions.fillDecriptionProperty(id, value))
  }

  const fillValueHandler = (id, value) => {
    dispatch(deviceActions.fillDecriptionValue(id, value))
  }

  const deleteSpecificHandler = (id) => {
    dispatch(deviceActions.deleteDeviceDecriptionValue(id))
  }

  const addDeviceHandler = () => {
    const namePattern = /[A-Za-zА-Яа-яЁё]/
    if (deviceNameValue === '' || devicePriceValue === 0 || deviceBrandValue === null || deviceTypeValue === null || deviceDecriptionValue.length === 0) {
      dispatch(deviceActions.setAddDeviceErrors('Fill in the required fields'))
    } else if (!deviceNameValue.match(namePattern)) {
      dispatch(deviceActions.setAddDeviceErrors('Enter the correct name format'))
    }
    else {
      const diviceObj = {
        name: deviceNameValue, 
        price: devicePriceValue, 
        brandId: deviceBrandValue.id, 
        typeId: deviceTypeValue.id,
        deviceInfo: deviceDecriptionValue
      }
      dispatch(createDevice(diviceObj))
    }
  }

  return (
    <div className={`${styles.createForm}`}>
      <h2>Add device</h2>
      <input value={deviceNameValue} onChange={(e) => dispatch(deviceActions.setDeviceNameValue(e.target.value))} type="text" placeholder='device name...' />
      <input value={devicePriceValue} min={0} onChange={(e) => dispatch(deviceActions.setDevicePriceValue(e.target.value))} type="number" placeholder='price' />

      <div onClick={() => setCategorySelector(!categorySelector)} className={`${styles.selector} ${styles.category}`}>
        <div className='flex justify-between py-2'>
          {deviceTypeValue !== null ? deviceTypeValue.name : 'Select category'}
          <i className={`${categorySelector && 'rotate-180'} transition-all bi bi-caret-down-fill`}></i>
        </div>

        <div className={`${styles.list} ${categorySelector && styles.listActive}`}>
          {categoriesData.length > 0 ?
            categoriesData.map(el => {
              return (
                <div onClick={() => { setCategorySelector(false); dispatch(deviceActions.setDeviceTypeValue(el)) }} className='link_item' key={el.id}>
                  {el.name}
                </div>
              )
            }) : <div>Categories data is empty</div>
          }
        </div>
      </div>

      <div onClick={() => setBrandSelector(!brandSelector)} className={`${styles.selector} ${styles.brand}`}>
        <div className='flex justify-between py-2'>
          <div>{deviceBrandValue !== null ? deviceBrandValue.name : 'Select brand'}</div>
          <i className={`${brandSelector && 'rotate-180'} transition-all bi bi-caret-down-fill`}></i>
        </div>

        <div className={`${styles.list} ${brandSelector && styles.listActive}`}>
          {brandsData.length > 0 ?
            brandsData.map(el => {
              return (
                <div onClick={() => { setBrandSelector(false); dispatch(deviceActions.setDeviceBrandValue(el)) }} className='link_item' key={el.id}>
                  {el.name}
                </div>
              )
            }) : <div>Categories data is empty</div>
          }
        </div>
      </div>

      <div className={`${styles.addSpecific}`}>
        <h3>Add specific</h3>
        <i onClick={() => addSpecificHandler()} className="bi bi-plus"></i>
      </div>
      <div className={`${styles.specificList}`}>
        {deviceDecriptionValue.length > 0 ?
          deviceDecriptionValue.map((el, idx) => {
            return (
              <div key={idx} className={`${styles.specificItem}`}>
                <input value={el.property}
                  onChange={(e) => fillPropertyHandler({id: el.id, value: e.target.value})}
                  type="text" placeholder='property' />
                <input value={el.value}
                  onChange={(e) => fillValueHandler({id: el.id, value: e.target.value})}
                  type="text" placeholder='value' />
                <i onClick={() => deleteSpecificHandler(el.id)} className={`${styles.deleteSpecific} bi bi-trash3`}></i>
                <span onClick={() => deleteSpecificHandler(el.id)} className={`${styles.deleteSpecificText} link_item`}>Delete specific</span>
              </div>
            )
          })
          : <div className='text-center text-gray-500'>Specific list is empty</div>
        }

      </div>

      <div onClick={() => addDeviceHandler()} className='mt-4 link_item text-right'>
        Create
      </div>
      <div className={`errorMessage ${addDeviceErrors !== '' && 'showErrorMessage'} `}>
        {addDeviceErrors}
      </div>
    </div>
  );
}

export default AddDeviceComponent;