import { useState } from 'react';
import styles from './AuthComponent.module.scss'
import LoginComponent from './LoginComponent';
import RegisterComponent from './RegisterComponent';

const AuthComponent = () => {
  const [authType, setAuthType] = useState('login')

  return (
    <div className={`${styles.auth}`}>
      {authType === 'login' ?
        <LoginComponent setAuthType={setAuthType} /> : <RegisterComponent setAuthType={setAuthType} />}
    </div>
  );
}

export default AuthComponent;