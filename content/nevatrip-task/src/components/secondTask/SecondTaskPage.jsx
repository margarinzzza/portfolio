import { Link } from 'react-router-dom';
import SecondTaskAtoB from './SecondTaskAtoB';
import SecondTaskTable from './SecondTaskTable';

const SecondTaskPage = () => {
  return (
    <div className="second-task">
      <Link className='back-button' to={'../'}>Назад</Link>
      <SecondTaskTable/>
      <SecondTaskAtoB/>
    </div>
  );
}

export default SecondTaskPage;
