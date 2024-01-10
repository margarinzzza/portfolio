import { Link } from "react-router-dom";

const NotFoundComponent = () => {
  return (
    <div className="notFound flex items-center flex-col">
      <h1 className="text-[65px]">#404</h1>
      <h2>Not Found!</h2>
      <Link className="mt-4 text-slate-500" to={'/'}>Назад</Link>
    </div>
  );
}

export default NotFoundComponent;
