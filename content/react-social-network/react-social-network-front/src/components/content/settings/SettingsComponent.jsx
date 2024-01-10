import { useState } from 'react';
import styles from './SettingsComponent.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { deleteProfile } from '../../../features/profile/authSlice';
import UpdateProfileComponent from './UpdateProfileComponent';

const SettingsComponent = () => {
  const [deleteProfileConfirm, setDeleteProfileConfirm] = useState(false)
  const [updateProfile, setUpdateProfile] = useState(false)
  const deleteProfileHandler = () => {
    window.localStorage.removeItem('token')
    dispatch(deleteProfile(userData._id))
  }
  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.auth)

  return (
    <div className={`${styles.settings}`}>
      <div className={`${styles.settingsOptions}`}>
        {!updateProfile?<h1 onClick={()=>setUpdateProfile(true)}>Update profile</h1>:<h1 onClick={()=>setUpdateProfile(false)}>Cancel update</h1> }
      
        {deleteProfileConfirm ?
          <>
            <h1 onClick={()=>deleteProfileHandler()}>Confirm </h1>
            <h1 onClick={() => setDeleteProfileConfirm(false)}>Cancel</h1> 
          </>
          : <h1 onClick={() => setDeleteProfileConfirm(true)}>Delete profile</h1>
        }
      </div>
      {updateProfile&&<UpdateProfileComponent/>}
    </div>
  );
}

export default SettingsComponent;
