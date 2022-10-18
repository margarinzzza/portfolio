import { Link } from 'react-router-dom';
import style from './MainPage.module.css'

const MainPage = () => {
  return (
    <div className={`${style.main}`}>
      <div className='flex justify-center'>
        
        <Link to={'/first-task'}>
          <div className={`${style.button}`}>
            Верстка
          </div>
        </Link>

        <Link to={'/second-task'}>
          <div className={`${style.button}`}>
            JS
          </div>
        </Link>

      </div>
    </div>
  );
}

export default MainPage;
