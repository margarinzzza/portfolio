import styles from './BoardComponent.module.scss'
import { useSelector } from 'react-redux'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { boards } from '../../states';
import { useParams } from 'react-router';

function BoardComponent() {

  const { isAuth } = useSelector((state) => state.auth)
  const [authSettings, setAuthSettings] = useState(false)
  const { boardName } = useParams();

  return (

    <div>
      {boardName}
    </div>
  );
}

export default BoardComponent;
