import { useEffect, useState } from 'react';
import styles from './AuthComponent.module.css'
import LoginComponent from './LoginComponent';
import RegisterComponent from './RegisterComponent';
import { useSelector } from 'react-redux/es/exports';
import { useNavigate } from "react-router-dom";

const AuthComponent = () => {
  
  const [authType, setAuthType] = useState('login')
  
  

  return (
    <div className={`${styles.auth}`}>
      {authType === 'login' ? <LoginComponent setAuthType={setAuthType} /> : <RegisterComponent setAuthType={setAuthType} />}
    </div>
  );
}

export default AuthComponent;
