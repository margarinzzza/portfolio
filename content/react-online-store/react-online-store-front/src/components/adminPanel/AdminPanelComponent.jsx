import { useState } from 'react';
import AddBrandComponent from './AddBrandComponent';
import AddDeviceComponent from './AddDeviceComponent';
import AddTypeComponent from './AddTypeComponent';
import styles from './AdminPanelComponent.module.scss'
import GetOrdersComponent from './GetOrdersComponent';

const AdminPanelComponent = () => {
  const [actionType, setActionType] = useState('')
  const selectedAction = () => {
    if (actionType === 'addType') {
      return <AddTypeComponent />
    } else if (actionType === 'addBrand'){
      return <AddBrandComponent />
    } else if (actionType === 'addDevice'){
      return <AddDeviceComponent/>
    } else if (actionType === 'getOrders'){
      return <GetOrdersComponent/>
    }
  }

  return (
    <div className={`${styles.adminPanel}`}>
      <h1 onClick={() => setActionType('addType')} className='link_item'>Add a new type</h1>
      <h1 onClick={() => setActionType('addBrand')} className='link_item'>Add a new brand</h1>
      <h1 onClick={() => setActionType('addDevice')} className='link_item'>Add a new device</h1>
      <h1 onClick={() => setActionType('getOrders')} className='link_item'>Get all orders</h1>
      {selectedAction()}
    </div>
  );
}

export default AdminPanelComponent;