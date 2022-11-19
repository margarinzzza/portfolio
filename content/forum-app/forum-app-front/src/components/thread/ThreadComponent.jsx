import styles from './ThreadComponent.module.scss'
import { useSelector } from 'react-redux'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { useParams } from 'react-router';

function ThreadComponent() {

  const { isAuth } = useSelector((state) => state.auth)
  const [authSettings, setAuthSettings] = useState(false)
  const { threadId } = useParams();

  return (

    <div className={`${styles.thread}`}>
      <div className={`${styles.threadHeader}`}>
        <img src="https://2ch.hk/b/thumb/277841343/16688724491410s.jpg" alt="^" />
        <div className={`${styles.threadHeaderData}`}>
          <div className={`${styles.threadCreatorInfo}`}>
            <span>Аноним</span>
            <span>19/09/2022</span>
            <span>№2414244</span>
          </div>
          <h2 className='my-2'>Заголовок</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, molestias iure quam aperiam tenetur voluptas aut similique sequi obcaecati impedit ut cum, consequatur, quaerat officia reprehenderit dolores incidunt aspernatur quis.</p>
        </div>
      </div>
      <div className={`${styles.postList}`}>
        <div className={`${styles.postListItem}`}>
          <div className={`${styles.postCreatorInfo}`}>
            <span>Аноним</span>
            <span>19/09/2022</span>
            <span>№2414244</span>
          </div>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit, sint. Voluptate laudantium accusantium quidem corporis quaerat aliquam. Fugit, eum perspiciatis delectus id consequatur tenetur quod quidem deleniti tempora vel unde?</p>
        </div>
        <div className={`${styles.postListItem}`}>
          <div className={`${styles.postCreatorInfo}`}>
            <span>Аноним</span>
            <span>19/09/2022</span>
            <span>№2414244</span>
          </div>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit, sint. Voluptate laudantium accusantium quidem corporis quaerat aliquam. Fugit, eum perspiciatis delectus id consequatur tenetur quod quidem deleniti tempora vel unde?</p>
        </div>
        <div className={`${styles.postListItem}`}>
          <div className={`${styles.postCreatorInfo}`}>
            <span>Аноним</span>
            <span>19/09/2022</span>
            <span>№2414244</span>
          </div>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit, sint. Voluptate laudantium accusantium quidem corporis quaerat aliquam. Fugit, eum perspiciatis delectus id consequatur tenetur quod quidem deleniti tempora vel unde?</p>
        </div>
      </div>
      <div className='text-center linkItem my-8'>
        Загрузить больше
      </div>
      <div className={`${styles.navArrows}`}>
        <i className="bi bi-arrow-up"></i>
        <i className="bi bi-arrow-down"></i>
      </div>

    </div>
  );
}

export default ThreadComponent;
