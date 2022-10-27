import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";

const NotFoundComponent = () => {
  const { isAuth } = useSelector(state => state.auth)

  return (
    <div className='text-center'>
      <h1>404. Nothing Found</h1>
      <Link to={`${isAuth?'/profile':'/'}`}>
        <span className='underline underline-offset-2'>Go back</span>
      </Link>
    </div>
  );
}

export default NotFoundComponent;
