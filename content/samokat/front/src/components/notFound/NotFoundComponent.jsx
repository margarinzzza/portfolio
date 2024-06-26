import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NotFoundComponent = () => {

  const { isAuth } = useSelector(state => state.authSlice)

  return (
    <div className="notFound flex items-center flex-col">
      <h1 className="text-[65px]">#404</h1>
      <h2>Not Found!</h2>
      <Link className="mt-4 text-slate-500" to={`${isAuth ? '/' : '/login'}`}>Назад</Link>
    </div>
  );
}

export default NotFoundComponent;
