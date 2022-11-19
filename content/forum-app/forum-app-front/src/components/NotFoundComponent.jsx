import { Link } from 'react-router-dom'

function NotFoundComponent() {

  return (
    <div className='text-center mt-8'>
      <h1>Not Found</h1>
      <Link className='linkItem' to={'/'}>Назад</Link>
    </div>
  );
}

export default NotFoundComponent;
