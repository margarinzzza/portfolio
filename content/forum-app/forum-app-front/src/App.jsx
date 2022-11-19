import HeaderComponent from "./components/header/HeaderComponent";
import "bootstrap-icons/font/bootstrap-icons.css"
import { Routes, Route } from 'react-router-dom'
import NotFoundComponent from "./components/NotFoundComponent";
import IndexComponent from "./components/index/IndexComponent";
import BoardComponent from "./components/board/BoardComponent";
import { useSelector } from 'react-redux'
import ProfileComponent from "./components/profile/ProfileComponent";
import AuthComponent from "./components/auth/AuthComponent";

function App() {

  const { isAuth } = useSelector((state) => state.auth)

  return (
    <div className="app">
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<IndexComponent />} />
        <Route path="/boards/:boardName" element={<BoardComponent />} />
        {isAuth ?
          <Route path="/profile" element={<ProfileComponent />} />
          :
          <Route path="/auth" element={<AuthComponent />} />
        }
        <Route path="*" element={<NotFoundComponent />} />
      </Routes>
    </div>
  );
}

export default App;
